import { View, ViewProps } from '@components'
import {
  Alert,
  FlatList,
  Image,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
} from 'react-native'
import { WINDOW_WIDTH } from '@constants/metrics.ts'
import { useCallback, useState } from 'react'
import useTheme from '@hooks/useTheme.ts'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import Icon from '@react-native-vector-icons/ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PERMISSIONS } from 'react-native-permissions'
import { requestPermission } from '@utils/permissions.ts'
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { getBase64Uri } from '@utils/media.ts'
import { useAppDispatch } from '@hooks/redux.ts'
import { addPhoto } from '@state/slices/placesSlice.ts'

export type PhotoGalleryProps = Omit<ViewProps, 'children'> & {
  photos: string[]
  placeId: string
}

const ITEM_SIZE = 100
const SEPARATOR_WIDTH = 12
const PHOTO_MAX_WIDTH = 1000
const PHOTO_MAX_HEIGHT = 1000

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  placeId,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { top: topInset } = useSafeAreaInsets()
  const dispatch = useAppDispatch()

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      const isSelected = selectedIndex === index

      return (
        <StyledTouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedIndex(index)}
          style={[
            styles.item,
            {
              borderColor: isSelected ? colors.primary : colors.cardBackground,
              opacity: isSelected ? 1 : 0.8,
            },
          ]}>
          <Image source={{ uri: item }} style={styles.itemImage} />
        </StyledTouchableOpacity>
      )
    },
    [colors.cardBackground, colors.primary, selectedIndex],
  )

  const renderItemSeparator = useCallback(() => {
    return <View width={SEPARATOR_WIDTH} />
  }, [])

  const handleImagePickerResponse = (res: ImagePickerResponse) => {
    if (!res.assets) {
      return
    }

    const base64Uri = getBase64Uri(res.assets)
    if (!base64Uri) {
      return
    }

    dispatch(
      addPhoto({
        placeId,
        photoUri: base64Uri,
      }),
    )
  }

  const pickPhotoFromLibrary = async () => {
    if (Platform.OS === 'ios') {
      await requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY)
    }

    const res = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: PHOTO_MAX_WIDTH,
      maxHeight: PHOTO_MAX_HEIGHT,
    })
    handleImagePickerResponse(res)
  }

  const openCamera = async () => {
    const res = await launchCamera({
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
      includeBase64: true,
      maxWidth: PHOTO_MAX_WIDTH,
      maxHeight: PHOTO_MAX_HEIGHT,
    })
    handleImagePickerResponse(res)
  }

  const onPressAddPhoto = () => {
    Alert.alert('Add photo', 'Select a method to add new photo', [
      {
        text: 'Photo Library',
        style: 'default',
        onPress: pickPhotoFromLibrary,
      },
      {
        text: 'Open Camera',
        style: 'default',
        onPress: openCamera,
      },
      {
        text: 'Cancel',
        style: 'destructive',
      },
    ])
  }

  return (
    <View {...rest}>
      <Image style={styles.banner} source={{ uri: photos[selectedIndex] }} />
      <FlatList<string>
        data={photos}
        extraData={selectedIndex}
        renderItem={renderItem}
        horizontal={true}
        ItemSeparatorComponent={renderItemSeparator}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
      <StyledTouchableOpacity
        activeOpacity={0.7}
        width={40}
        height={40}
        borderRadius={'circle'}
        backgroundColor={'cardBackground'}
        justifyContent={'center'}
        alignItems={'center'}
        position={'absolute'}
        top={topInset}
        right={20}
        onPress={onPressAddPhoto}>
        <Icon name={'camera'} size={26} color={colors.primary} />
      </StyledTouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    width: WINDOW_WIDTH,
    aspectRatio: 1.3,
    resizeMode: 'cover',
  },
  item: {
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  itemImage: {
    width: ITEM_SIZE,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  list: {
    marginTop: -ITEM_SIZE / 2,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
})

export default PhotoGallery
