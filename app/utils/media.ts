import { Asset } from 'react-native-image-picker'

export const getBase64Uri = (assets: Asset[]): string | null => {
  const asset = assets[0]
  if (!asset) {
    return null
  }

  return `data:${asset.type};base64,${asset.base64}`
}
