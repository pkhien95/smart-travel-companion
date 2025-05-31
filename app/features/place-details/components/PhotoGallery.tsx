import { View, ViewProps } from '@components'
import { FlatList, Image, ListRenderItemInfo, StyleSheet } from 'react-native'
import { WINDOW_WIDTH } from '@constants/metrics.ts'
import { useCallback, useState } from 'react'
import useTheme from '@hooks/useTheme.ts'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import Icon from '@react-native-vector-icons/ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type PhotoGalleryProps = Omit<ViewProps, 'children'> & {
  photos: string[]
}

const ITEM_SIZE = 100
const SEPARATOR_WIDTH = 12

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, ...rest }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { colors } = useTheme()
  const { top: topInset } = useSafeAreaInsets()

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      return (
        <StyledTouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedIndex(index)}
          style={[
            styles.item,
            {
              borderColor: colors.cardBackground,
              opacity: index === selectedIndex ? 1 : 0.7,
            },
          ]}>
          <Image source={{ uri: item }} style={styles.itemImage} />
        </StyledTouchableOpacity>
      )
    },
    [colors.cardBackground, selectedIndex],
  )

  const renderItemSeparator = useCallback(() => {
    return <View width={SEPARATOR_WIDTH} />
  }, [])

  return (
    <View {...rest}>
      <Image style={styles.banner} source={{ uri: photos[selectedIndex] }} />
      <FlatList<string>
        data={photos}
        extraData={selectedIndex}
        renderItem={renderItem}
        horizontal={true}
        ItemSeparatorComponent={renderItemSeparator}
        style={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        bounces={false}
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
        right={20}>
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
  listContainer: {
    paddingHorizontal: 20,
    marginTop: -ITEM_SIZE / 2,
  },
})

export default PhotoGallery
