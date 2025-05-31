import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { ScreenBox } from '@components'
import { TextInput } from 'react-native'

const AddNote = (props: NativeStackScreenProps<MainStackParams, 'AddNote'>) => {
  const { navigation } = props

  return (
    <ScreenBox>
      <TextInput />
    </ScreenBox>
  )
}

export default AddNote
