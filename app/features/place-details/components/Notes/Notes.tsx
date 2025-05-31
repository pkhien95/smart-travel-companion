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

export type NotesProps = Omit<ViewProps, 'children'> & {
  notes: string[]
}

const MAX_NOTES = 10

const SEPARATOR_HEIGHT = 12

const NotesComponent: React.FC<NotesProps> = ({ notes, ...rest }) => {
  const { colors } = useTheme()
  const navigation =
    useNavigation<NavigationProp<MainStackParams, 'PlaceDetails'>>()

  const renderItem = useCallback(({ item }: ListRenderItemInfo<string>) => {
    return <NoteItem note={item} />
  }, [])

  const renderItemSeparator = useCallback(
    () => <View height={SEPARATOR_HEIGHT} />,
    [],
  )

  const canAddMore = useMemo(() => notes.length < MAX_NOTES, [notes.length])

  return (
    <View {...rest}>
      <View flexDirection={'row'} alignItems={'center'} mb={'12'}>
        <Text variant={'subheader'} flex={1}>
          Notes
        </Text>
        <StyledTouchableOpacity
          hitSlop={DEFAULT_HIT_SLOP}
          disabled={!canAddMore}
          onPress={() => navigation.navigate('AddNote')}>
          <Icon
            name={'add'}
            size={22}
            color={canAddMore ? colors.foreground : colors.muted}
          />
        </StyledTouchableOpacity>
      </View>
      <FlatList<string>
        data={notes}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </View>
  )
}

export default NotesComponent
