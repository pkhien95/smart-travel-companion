import { Text } from '@components'
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityProps,
} from '@components/base/StyledTouchableOpacity.tsx'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { memo } from 'react'

export type NoteItemProps = Omit<StyledTouchableOpacityProps, 'children'> & {
  note: string
}

const NoteItem: React.FC<NoteItemProps> = ({ note, ...rest }) => {
  const navigation =
    useNavigation<NavigationProp<MainStackParams, 'PlaceDetails'>>()

  return (
    <StyledTouchableOpacity
      px={'m'}
      py={'12'}
      borderRadius={'s'}
      onPress={() =>
        navigation.navigate('EditNote', {
          note,
        })
      }
      {...rest}
      backgroundColor={'primaryLight'}>
      <Text variant={'note'}>{note}</Text>
    </StyledTouchableOpacity>
  )
}

export default memo(NoteItem)
