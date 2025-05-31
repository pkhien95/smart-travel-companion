import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { Button, ScreenBox, Text, View } from '@components'
import ScreenHeader from '@components/layout/ScreenHeader.tsx'
import { ScrollView, StyleSheet } from 'react-native'
import PhotoGallery from '../components/PhotoGallery.tsx'
import { useAppDispatch, useAppSelector } from '@hooks/redux.ts'
import {
  addPlaceToFavorite,
  removePlaceFromFavorite,
  selectPlaceById,
} from '@state/slices/placesSlice.ts'
import useTheme from '@hooks/useTheme.ts'
import Icon from '@react-native-vector-icons/ionicons'
import Notes from '../components/Notes/Notes.tsx'

const PlaceDetails = (
  props: NativeStackScreenProps<MainStackParams, 'PlaceDetails'>,
) => {
  const { route } = props
  const { id, photos, name, locationName, isFavorite, notes } = useAppSelector(
    state => selectPlaceById(state, route.params.id),
  )
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const onPressFavorite = () => {
    dispatch(isFavorite ? removePlaceFromFavorite(id) : addPlaceToFavorite(id))
  }

  return (
    <ScreenBox edges={['bottom']} style={styles.container}>
      <ScrollView bounces={false}>
        <PhotoGallery photos={photos} />
        <View px={'20'} mt={'20'}>
          <Text variant={'header'}>{name}</Text>
          <Text variant={'body'} mt={'xs'}>
            {locationName}
          </Text>
        </View>
        <View flexDirection={'row'} alignItems={'center'} px={'20'} mt={'12'}>
          <Button
            variant={isFavorite ? 'primary' : 'secondary'}
            onPress={onPressFavorite}
            flex={1}
            leftComponent={
              <Icon
                name={'heart'}
                size={22}
                color={isFavorite ? colors.background : colors.foreground}
              />
            }>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </Button>
          <Button
            marginLeft={'s'}
            variant={'secondary'}
            flex={1}
            leftComponent={
              <Icon name={'share-social'} size={22} color={colors.foreground} />
            }>
            Share
          </Button>
        </View>

        <Notes notes={notes} px={'20'} mt={'l'} />

        <ScreenHeader
          position={'absolute'}
          top={0}
          tintColor={colors.cardBackground}
        />
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
})

export default PlaceDetails
