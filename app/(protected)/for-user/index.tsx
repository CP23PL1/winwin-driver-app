import React, { useRef } from 'react'
import { View, Text, TextField, Button, Colors, TouchableOpacity } from 'react-native-ui-lib'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { Stack } from 'expo-router'

const ForUser = () => {
  const router = useRouter()

  return (
    <ScrollView>
      <Stack.Screen options={{ headerShown: true, headerTitle: 'วินประชาอุทิศ 45' }} />
      <View center height={260}>
        <View
          absR
          absT
          bg-white
          style={{
            shadowOpacity: 1,
            shadowColor: 'black',
          }}
        >
          <FontAwesome name="circle" size={24} color="#B5E848" />
          <View paddingL-10>
            <Text bodyB>4</Text>
          </View>
        </View>
        <Text>MAP</Text>
      </View>
      <View paddingH-20>
        <View row paddingV-5>
          <View flex-1 left>
            <Text bodyB>ที่อยู่</Text>
          </View>
          <View flex-1 right row>
            <View paddingR-5>
              <FontAwesome5 name="map-marked-alt" size={20} color="#FDA84B" />
            </View>
            <Text color="#FDA84B">เส้นทาง</Text>
          </View>
        </View>
        <View paddingV-5>
          <Text>ปากซอยประชาอุทิศ 45 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพมหานคร</Text>
        </View>
        <View paddingV-5 row centerV>
          <View paddingR-5>
            <MaterialCommunityIcons name="currency-btc" size={20} color="#FDA84B" />
          </View>
          <Text color="#FDA84B">อัตราค่าบริการ</Text>
        </View>
        <View paddingV-5>
          <View>
            <Text bodyB>ผู้ดูแล</Text>
          </View>
          <View></View>
        </View>
        <View paddingV-5>
          <View row>
            <View flex-1 left>
              <Text bodyB>สมาชิก</Text>
            </View>
            <View flex-1 right>
              <Text color="#FDA84B">ดูทั้งหมด</Text>
            </View>
          </View>
          <View></View>
        </View>
        <View paddingV-5></View>
      </View>

      <Button
        absB
        style={{
          borderColor: '#FDA84B',
          backgroundColor: '#FDA84B',
          borderRadius: 10,
        }}
        paddingV-20
      >
        <Text center bodyB color="white">
          เรียกรับบริการ
        </Text>
      </Button>
    </ScrollView>
  )
}

export default ForUser
