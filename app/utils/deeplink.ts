import { Linking, Platform } from 'react-native'

const safeOpenUrl = async (url: string) => {
  try {
    const canOpen = await Linking.canOpenURL(url)
    if (!canOpen) {
      return
    }

    await Linking.openURL(url)
  } catch (e) {
    console.error(e)
  }
}

export const openInMaps = (
  latitude: number,
  longitude: number,
  label?: string,
) => {
  const encodedLabel = label ? encodeURIComponent(label) : ''
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?q=${encodedLabel}&ll=${latitude},${longitude}`
      : `geo:${latitude},${longitude}?q=${latitude},${longitude}${
          label ? `(${encodedLabel})` : ''
        }`

  safeOpenUrl(url)
}
