import { Text, View, ViewProps } from '@components'
import { useAppSelector } from '@hooks/redux.ts'
import { selectFavoritePlaces } from '@state/slices/placesSlice.ts'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { Place } from '@rootTypes/places.ts'
import { useCallback } from 'react'
import SavedPlaceItem, { ITEM_WIDTH } from './SavedPlaceItem.tsx'

export type SuggestedPlacesProps = Omit<ViewProps, 'children'> & {}

const SEPARATOR_WIDTH = 12

const SavedPlaces: React.FC<SuggestedPlacesProps> = props => {
  const places = useAppSelector(selectFavoritePlaces)

  const renderItem = useCallback((info: ListRenderItemInfo<Place>) => {
    const { item } = info

    return <SavedPlaceItem data={item} />
  }, [])

  const renderItemSeparator = useCallback(() => {
    return <View width={SEPARATOR_WIDTH} />
  }, [])

  const getItemLayout = useCallback(
    (_data: ArrayLike<Place> | null | undefined, index: number) => {
      return {
        length: ITEM_WIDTH,
        offset: (ITEM_WIDTH + SEPARATOR_WIDTH) * index,
        index,
      }
    },
    [],
  )

  const renderListEmpty = () => {
    return (
      <View justifyContent={'center'} width={'100%'}>
        <Text variant={'body'} color={'textSubdued'}>
          Your favorite places will be displayed here.
        </Text>
      </View>
    )
  }

  return (
    <View {...props}>
      <Text variant={'subheader'} mb={'12'} mx={'20'}>
        Saved Places
      </Text>
      <FlatList<Place>
        data={places}
        renderItem={renderItem}
        horizontal={true}
        ItemSeparatorComponent={renderItemSeparator}
        getItemLayout={getItemLayout}
        ListEmptyComponent={renderListEmpty}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
})

export default SavedPlaces
