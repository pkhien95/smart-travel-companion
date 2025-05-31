import { Text, View, ViewProps } from '@components'
import { useAppSelector } from '@hooks/redux.ts'
import { selectNonFavoritePlaces } from '@state/slices/placesSlice.ts'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ViewToken,
} from 'react-native'
import { Place } from '@rootTypes/places.ts'
import { useCallback, useEffect, useRef } from 'react'
import SuggestedPlaceItem, { ITEM_WIDTH } from './SuggestedPlaceItem.tsx'

export type SuggestedPlacesProps = Omit<ViewProps, 'children'> & {}

const SEPARATOR_WIDTH = 12
const AUTO_SCROLL_INTERVAL = 3000

const SuggestedPlaces: React.FC<SuggestedPlacesProps> = props => {
  const places = useAppSelector(selectNonFavoritePlaces)
  const flatListRef = useRef<FlatList>(null)
  const currentIndexRef = useRef(0)

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems.length > 0 &&
        typeof viewableItems[0].index === 'number'
      ) {
        currentIndexRef.current = viewableItems[0].index
      }
    },
    [],
  )

  const scrollToNextItem = useCallback(() => {
    if (!places.length) return

    currentIndexRef.current = (currentIndexRef.current + 1) % places.length
    flatListRef.current?.scrollToIndex({
      index: currentIndexRef.current,
      animated: true,
    })
  }, [places.length])

  useEffect(() => {
    const intervalId = setInterval(scrollToNextItem, AUTO_SCROLL_INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [scrollToNextItem])

  const renderItem = useCallback((info: ListRenderItemInfo<Place>) => {
    const { item } = info

    return <SuggestedPlaceItem data={item} />
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

  return (
    <View {...props}>
      <Text variant={'subheader'} mb={'12'} mx={'20'}>
        Suggested Places
      </Text>
      <FlatList<Place>
        ref={flatListRef}
        data={places}
        renderItem={renderItem}
        horizontal={true}
        ItemSeparatorComponent={renderItemSeparator}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
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

export default SuggestedPlaces
