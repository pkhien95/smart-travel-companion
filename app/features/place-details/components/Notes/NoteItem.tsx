import { Text } from '@components'
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityProps,
} from '@components/base/StyledTouchableOpacity.tsx'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo } from 'react'
import Icon from '@react-native-vector-icons/material-design-icons'
import useTheme from '@hooks/useTheme.ts'
import { DEFAULT_HIT_SLOP } from '@constants/metrics.ts'
import { useAppDispatch } from '@hooks/redux.ts'
import localizedStrings from '@localization'
import { Alert } from 'react-native'
import { deleteNote } from '@state/slices/placesSlice.ts'

export type NoteItemProps = Omit<StyledTouchableOpacityProps, 'children'> & {
  note: string
  placeId: string
  index: number
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  placeId,
  index,
  ...rest
}) => {
  const navigation =
    useNavigation<NavigationProp<MainStackParams, 'PlaceDetails'>>()

  const dispatch = useAppDispatch()

  const { colors } = useTheme()
  const strings = localizedStrings.placeDetails.notes

  const onPressDelete = () => {
    Alert.alert(strings.removeAlert.title, strings.removeAlert.description, [
      {
        text: strings.removeAlert.confirmButton,
        style: 'destructive',
        onPress: () =>
          dispatch(
            deleteNote({
              placeId,
              index,
            }),
          ),
      },
      {
        text: strings.removeAlert.cancelButton,
        style: 'cancel',
        isPreferred: true,
      },
    ])
  }

  return (
    <StyledTouchableOpacity
      px={'m'}
      py={'12'}
      borderRadius={'s'}
      flexDirection={'row'}
      alignItems={'center'}
      onPress={() =>
        navigation.navigate('EditNote', {
          placeId,
          noteIndex: index,
        })
      }
      {...rest}
      backgroundColor={'primaryLight'}>
      <Text variant={'note'} flex={1} mr={'s'}>
        {note}
      </Text>
      <StyledTouchableOpacity
        hitSlop={DEFAULT_HIT_SLOP}
        onPress={onPressDelete}>
        <Icon name={'delete'} size={20} color={colors.foreground} />
      </StyledTouchableOpacity>
    </StyledTouchableOpacity>
  )
}

export default memo(NoteItem)
