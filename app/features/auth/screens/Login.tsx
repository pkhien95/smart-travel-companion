import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams } from '@navigation/auth-stack/types.ts'
import { Button, ScreenBox, Text, View } from '@components'
import { Image, StyleSheet } from 'react-native'
import FingerPrintImg from '@assets/images/fingerprint.png'
import { useCallback, useEffect, useState } from 'react'
import { unlockWithBiometrics } from '@utils/auth.ts'
import { useAppDispatch } from '@hooks/redux.ts'
import { setIsLoggedIn } from '@state/slices/authSlice.ts'
import localizedStrings from '@localization'

const Login = (_props: NativeStackScreenProps<AuthStackParams, 'Login'>) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const dispatch = useAppDispatch()
  const strings = localizedStrings.login

  const unlock = useCallback(async () => {
    try {
      setIsProcessing(true)
      const success = await unlockWithBiometrics()
      if (!success) {
        return
      }

      dispatch(setIsLoggedIn(true))
    } catch (e) {
    } finally {
      setIsProcessing(false)
    }
  }, [dispatch])

  useEffect(() => {
    unlock()
  }, [unlock])

  return (
    <ScreenBox>
      <View flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text variant={'header'} textAlign={'center'}>
          Smart Travel Companion
        </Text>
        <Image source={FingerPrintImg} style={styles.image} />
        <Button
          variant={'primary'}
          width={'70%'}
          marginTop={'20'}
          disabled={isProcessing}
          onPress={unlock}>
          {strings.unlockButton}
        </Button>
      </View>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 40,
  },
})

export default Login
