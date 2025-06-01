import { LinkingOptions } from '@react-navigation/native'
import { RootStackStackParams } from './root-stack/types.ts'
import { DEEPLINK_PROTOCOL } from '@constants/common.ts'

const linking: LinkingOptions<RootStackStackParams> = {
  prefixes: [DEEPLINK_PROTOCOL],
  config: {
    screens: {
      Main: {
        screens: {
          PlaceDetails: 'places/:id',
        },
      },
    },
  },
}

export default linking
