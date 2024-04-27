import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Image, Text, View } from 'react-native-ui-lib'

export default function NewServiceSpotPending() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        width={200}
        resizeMode="contain"
        source={require('../../../../assets/clock_man.png')}
      />
      <Text h3B center marginB-20>
        อดใจรออีกนิด⌛
      </Text>
      <Text caption color={Colors.$textNeutral} marginB-20>
        ซุ้มวินมอเตอร์ไซค์ของคุณอยู่ในระหว่างขั้นตอนการตรวจสอบจากทีมงานวินวิน กระบวนการนี้อาจใช้เวลา
        1-3 วันทำการ โดยประมาณ
      </Text>
      <Text caption color={Colors.$textNeutral}>
        หลังจากการตรวจสอบเสร็จสิ้น ท่านจะได้รับการแจ้งเตือนผ่านทางแอปพลิเคชัน
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  image: {
    alignSelf: 'center',
  },
})
