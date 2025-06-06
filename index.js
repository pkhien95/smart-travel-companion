/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig')
}

import { AppRegistry, LogBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)

LogBox.ignoreAllLogs(true)
