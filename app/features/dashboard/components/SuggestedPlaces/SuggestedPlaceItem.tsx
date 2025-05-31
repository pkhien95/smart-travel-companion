import { Card, Text, View } from '@components'
import { Place } from '@rootTypes/places.ts'
import StyledTouchableOpacity, {
  StyledTouchableOpacityProps,
} from '@components/base/StyledTouchableOpacity.tsx'
import { Image, StyleSheet } from 'react-native'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { memo } from 'react'

export type SupportedPlaceItemProps = Omit<
  StyledTouchableOpacityProps,
  'children' | 'onPress'
> & {
  data: Place
}

export const ITEM_WIDTH = 200

const SupportedPlaceItem = ({ data, ...rest }: SupportedPlaceItemProps) => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<HomeBottomTabsParams, 'Dashboard'>,
        NativeStackNavigationProp<MainStackParams>
      >
    >()

  const onPress = () => {
    navigation.navigate('PlaceDetails', {
      id: data.id,
    })
  }

  return (
    <StyledTouchableOpacity {...rest} width={ITEM_WIDTH} onPress={onPress}>
      <Card shadowRadius={5}>
        <Image source={{ uri: data.photos[0] }} style={styles.image} />
        <View py={'s'} px={'s'}>
          <Text variant={'medium'} numberOfLines={1}>
            {data.name}
          </Text>
          <Text
            variant={'label'}
            mt={'xs'}
            color={'textSubdued'}
            numberOfLines={1}>
            {data.locationName}
          </Text>
        </View>
      </Card>
    </StyledTouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    aspectRatio: 1.5,
    resizeMode: 'cover',
  },
})

export default memo(SupportedPlaceItem)
