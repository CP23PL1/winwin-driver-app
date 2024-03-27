import { useCallback, useMemo, useState } from 'react'
import { Text, View, Card } from 'react-native-ui-lib'
import { serviceSpotUtil } from '@/utils/service-spot'
import { StyleSheet } from 'react-native'

import { Stack } from 'expo-router'
import { Slider } from 'react-native-ui-lib/src/incubator'
import debounce from 'lodash.debounce'

function CalculatePriceScreen() {
  const [distance, setDistance] = useState<number>(1)

  const calculatedPrice = useMemo(() => {
    const nf = new Intl.NumberFormat('th-TH', {
      currency: 'THB',
      style: 'currency',
      minimumFractionDigits: 0,
    })
    return nf.format(Math.round(serviceSpotUtil.calculatePrice(distance)))
  }, [distance])

  const onDistanceChange = useCallback((value: number) => {
    setDistance(+value.toFixed(1))
  }, [])

  return (
    <View flex padding-20 gap-10 centerV>
      <Stack.Screen
        options={{
          title: 'คำนวณค่าโดยสาร',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'NotoSansThaiBold',
          },
        }}
      />

      <Card padding-15>
        <Text>ปรับระยะทาง (กิโลเมตร)</Text>
        <Slider
          thumbStyle={styles.thumbStyle}
          step={0.1}
          value={distance}
          minimumValue={1}
          maximumValue={10}
          onValueChange={onDistanceChange}
        />
      </Card>

      <View gap-10>
        <Card center paddingV-20>
          <Text>ระยะทาง</Text>
          <Text h3>{distance} กิโลเมตร</Text>
        </Card>
        <Card center padding-20 paddingB-10>
          <Text>ค่าโดยสารตามอัตรา</Text>

          <Text style={styles.calculatedPrice}>{calculatedPrice}</Text>
          <Text red style={{ fontSize: 12 }}>
            * ราคาที่ไม่รวมค่าเรียกรับบริการ
          </Text>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FDA84B',
  },
  calculatedPrice: {
    fontSize: 48,
    fontFamily: 'NotoSansThai',
  },
})

export default CalculatePriceScreen
