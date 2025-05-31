import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { ScreenBox } from '@components'
import { TextInput } from 'react-native'

const EditNote = (
  props: NativeStackScreenProps<MainStackParams, 'EditNote'>,
) => {
  const { navigation } = props

  return (
    <ScreenBox>
      <TextInput />
    </ScreenBox>
  )
}

export default EditNote
