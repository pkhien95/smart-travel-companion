import { Card, CardProps, Text, View } from '@components'
import { FC, useState } from 'react'
import useCurrentLocation from '@hooks/useCurrentLocation.ts'
import { useGetCurrentWeatherQuery } from '@services/weather-api/weatherApi.ts'
import { skipToken } from '@reduxjs/toolkit/query'
import { ActivityIndicator, Image, StyleSheet } from 'react-native'
import { capitalize } from 'lodash'
import Icon from '@react-native-vector-icons/material-design-icons'
import useTheme from '@hooks/useTheme.ts'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import { openInMaps } from '@utils/deeplink.ts'
import MapView, { Marker } from 'react-native-maps'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type WeatherInfoProps = Omit<CardProps, 'children'> & {}

const MAP_HEIGHT = 200

const WeatherInfo: FC<WeatherInfoProps> = props => {
  const currentLocation = useCurrentLocation()
  const { data: weatherData, isLoading } = useGetCurrentWeatherQuery(
    currentLocation
      ? {
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        }
      : skipToken,
  )
  const { colors } = useTheme()
  const [mapVisible, setMapVisible] = useState(true)

  // Animation values
  const mapHeight = useSharedValue(MAP_HEIGHT)
  const mapOpacity = useSharedValue(1)

  // Animated styles
  const mapAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: mapHeight.value,
      opacity: mapOpacity.value,
      overflow: 'hidden',
    }
  })

  const toggleMap = () => {
    if (mapVisible) {
      // Hide map
      mapHeight.value = withTiming(0, { duration: 300 })
      mapOpacity.value = withTiming(0, { duration: 300 })
      setTimeout(() => setMapVisible(false), 300)
    } else {
      // Show map
      setMapVisible(true)
      mapHeight.value = withTiming(MAP_HEIGHT, { duration: 300 })
      mapOpacity.value = withTiming(1, { duration: 300 })
    }
  }

  const onPressOpenMap = () => {
    if (!currentLocation) {
      return
    }

    openInMaps(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
    )
  }

  return (
    <Card {...props}>
      {isLoading ? (
        <View height={150} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator size={20} />
        </View>
      ) : (
        <>
          <View flexDirection={'row'} alignItems={'center'} pr={'s'} py={'s'}>
            <Image
              source={{ uri: weatherData?.icon ?? '' }}
              style={[styles.icon]}
            />
            <View flex={1}>
              <Text variant={'subheader'}>{weatherData?.name}</Text>
              <Text variant={'note'} mt={'s'}>
                {capitalize(weatherData?.description)}
              </Text>
            </View>
            <StyledTouchableOpacity ml={'s'} onPress={toggleMap}>
              <Icon
                name={'map'}
                size={32}
                color={mapVisible ? colors.primary : colors.muted}
              />
            </StyledTouchableOpacity>
          </View>

          {currentLocation && (
            <Animated.View style={mapAnimatedStyle}>
              {mapVisible && (
                <MapView
                  provider={'google'}
                  style={styles.map}
                  initialRegion={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  onPress={onPressOpenMap}>
                  <Marker
                    coordinate={{
                      latitude: currentLocation.coords.latitude,
                      longitude: currentLocation.coords.longitude,
                    }}
                    title="Your Location"
                  />
                </MapView>
              )}
            </Animated.View>
          )}
        </>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 40,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    marginTop: 8,
  },
})

export default WeatherInfo
