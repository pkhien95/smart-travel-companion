import { AuthStackParams } from '../auth-stack/types.ts'
import { MainStackParams } from '../main-stack/types.ts'
import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackStackParams = {
  Auth: NavigatorScreenParams<AuthStackParams>
  Main: NavigatorScreenParams<MainStackParams>
}
