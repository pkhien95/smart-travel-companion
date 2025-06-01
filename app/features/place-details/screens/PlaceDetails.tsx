import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { Button, ScreenBox, Text, View } from '@components'
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
import MDIcon from '@react-native-vector-icons/material-design-icons'
import Notes from '../components/Notes/Notes.tsx'
import { WINDOW_WIDTH } from '@constants/metrics.ts'
import { openInMaps } from '@utils/deeplink.ts'
import Share from 'react-native-share'
import { DEEPLINK_PROTOCOL } from '@constants/common.ts'
import { useGetCurrentWeatherQuery } from '@services/weather-api/weatherApi.ts'
import useDistanceFromCurrent from '@hooks/useDistanceFromCurrent.ts'
import { formatTemp } from '@utils/common.ts'
import { useMemo } from 'react'
import { getTodayOpeningHour } from '@utils/datetime.ts'
import MapView, { Marker } from 'react-native-maps'

const PlaceDetails = (
  props: NativeStackScreenProps<MainStackParams, 'PlaceDetails'>,
) => {
  const { route } = props
  const {
    id,
    photos,
    name,
    locationName,
    isFavorite,
    notes,
    location,
    openingHours,
    rating,
  } = useAppSelector(state => selectPlaceById(state, route.params.id))
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { data: weatherData } = useGetCurrentWeatherQuery(location)
  const distance = useDistanceFromCurrent(location)

  const onPressFavorite = () => {
    dispatch(isFavorite ? removePlaceFromFavorite(id) : addPlaceToFavorite(id))
  }

  const onPressShare = () => {
    Share.open({
      title: locationName,
      url: `${DEEPLINK_PROTOCOL}places/${id}`,
    })
  }

  const onMapPress = () => {
    openInMaps(location.latitude, location.longitude, name)
  }

  const fullDescription = useMemo(() => {
    let result = `${locationName} • ${distance}`

    if (weatherData?.temp) {
      result = `${result} • ${formatTemp(weatherData.temp)}`
    }

    return result
  }, [distance, locationName, weatherData?.temp])

  return (
    <ScreenBox edges={['bottom']} style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <PhotoGallery photos={photos} placeId={id} />

        <View px={'20'} mt={'20'}>
          <Text variant={'header'}>{name}</Text>
          <Text variant={'body'} mt={'xs'}>
            {fullDescription}
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
            }
            onPress={onPressShare}>
            Share
          </Button>
        </View>

        <View flexDirection={'row'} alignItems={'center'} px={'20'} mt={'12'}>
          <MDIcon name={'clock-outline'} size={18} />
          <Text ml={'xs'}>{getTodayOpeningHour(openingHours)}</Text>
        </View>

        <View flexDirection={'row'} alignItems={'center'} px={'20'} mt={'12'}>
          <MDIcon name={'star-outline'} size={18} />
          <Text ml={'xs'}>{rating} (1235 reviews)</Text>
        </View>

        <View height={1} backgroundColor={'primaryLight'} mt={'l'} mx={'20'} />

        <Notes notes={notes} px={'20'} mt={'l'} placeId={id} />

        <MapView
          provider={'google'}
          style={styles.map}
          initialRegion={{
            latitude: 37.421998,
            longitude: -122.084,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={onMapPress}>
          <Marker
            coordinate={{
              latitude: 37.421998,
              longitude: -122.084,
            }}
            title={name}
          />
        </MapView>
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  scrollViewContainer: {
    paddingBottom: 40,
  },
  map: {
    marginHorizontal: 20,
    width: WINDOW_WIDTH - 40,
    height: 200,
    borderRadius: 12,
    marginTop: 20,
    overflow: 'hidden',
  },
})

export default PlaceDetails
