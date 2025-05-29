import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'
import { View, Text, Button, Card } from '@components/base'
import { ScreenBox } from '@components'
import { ScrollView, StyleSheet } from 'react-native'

function Dashboard(
  props: CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabsParams, 'Dashboard'>,
    NativeStackScreenProps<MainStackParams>
  >,
) {
  return (
    <ScreenBox edges={['top', 'bottom']}>
      <Text marginTop={'m'} variant={'header'}>
        Dashboard
      </Text>

      <ScrollView style={styles.scrollView}>
        <Card borderRadius={'l'}>
          <Text>dawdwa</Text>
        </Card>
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
})

export default Dashboard
