import { HomeBottomTabsParams } from '../home-bottom-tabs/types.ts'
import { NavigatorScreenParams } from '@react-navigation/native'

export type MainStackParams = {
  Home: NavigatorScreenParams<HomeBottomTabsParams>
  PlaceDetails: {
    id: string
  }
  AddNote: {
    placeId: string
  }
  EditNote: {
    placeId: string
    noteIndex: number
  }
  SelectLanguage: undefined
  SelectTheme: undefined
}
