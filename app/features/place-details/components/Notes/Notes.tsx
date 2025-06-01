import { Text, View, ViewProps } from '@components'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import Icon from '@react-native-vector-icons/ionicons'
import useTheme from '@hooks/useTheme.ts'
import { DEFAULT_HIT_SLOP } from '@constants/metrics.ts'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useCallback, useMemo } from 'react'
import NoteItem from './NoteItem.tsx'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import localizedStrings from '@localization'

export type NotesProps = Omit<ViewProps, 'children'> & {
  notes: string[]
  placeId: string
}

const MAX_NOTES = 10

const SEPARATOR_HEIGHT = 12

const Notes: React.FC<NotesProps> = ({ notes, placeId, ...rest }) => {
  const { colors } = useTheme()
  const navigation =
    useNavigation<NavigationProp<MainStackParams, 'PlaceDetails'>>()
  const strings = localizedStrings.placeDetails.notes

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      return <NoteItem note={item} placeId={placeId} index={index} />
    },
    [placeId],
  )

  const renderItemSeparator = useCallback(
    () => <View height={SEPARATOR_HEIGHT} />,
    [],
  )

  const canAddMore = useMemo(() => notes.length < MAX_NOTES, [notes.length])

  return (
    <View {...rest}>
      <View flexDirection={'row'} alignItems={'center'} mb={'12'}>
        <Text variant={'subheader'} flex={1}>
          {strings.title}
        </Text>
        <StyledTouchableOpacity
          hitSlop={DEFAULT_HIT_SLOP}
          disabled={!canAddMore}
          onPress={() =>
            navigation.navigate('AddNote', {
              placeId,
            })
          }>
          <Icon
            name={'add'}
            size={22}
            color={canAddMore ? colors.foreground : colors.muted}
          />
        </StyledTouchableOpacity>
      </View>
      <Text variant={'note'} mb={'s'} color={'textSubdued'}>
        {notes.length === 0 ? strings.emptyNote : strings.description}
      </Text>
      <FlatList<string>
        data={notes}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </View>
  )
}

export default Notes
