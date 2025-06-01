import ReactNativeBiometrics from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const unlockWithBiometrics = async () => {
  const { available } = await rnBiometrics.isSensorAvailable()
  if (!available) {
    return true
  }

  const res = await rnBiometrics.simplePrompt({
    promptMessage: 'Unlock using Biometrics',
  })

  if (res.error) {
    return false
  }

  return res.success
}
