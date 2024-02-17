import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Text, Button, View, TextField } from 'react-native-ui-lib'

function CalPrice() {
  const [price, setPrice] = useState(0)
  const [distance, setDistance] = useState('')

  const calculatePrice = () => {
    const distanceToNumber = Number(distance)
    if (distanceToNumber <= 2) {
      setPrice(25)
    } else if (distanceToNumber <= 5) {
      setPrice(25 + (distanceToNumber - 2) * 5)
    } else if (distanceToNumber <= 10) {
      const newPrice = (distanceToNumber - 5) * 10
      setPrice(40 + newPrice)
    } else {
      // Price is determined by the driver and passenger
      setPrice(0)
    }
  }

  return (
    <View>
      <TextField
        placeholder={'ระยะทาง'}
        keyboardType="numeric"
        floatingPlaceholder
        onChangeText={(e: any) => setDistance(e)}
        value={distance}
      />
      <Button onPress={() => calculatePrice()}>
        <Text>Calculate Price</Text>
      </Button>
      <Text>Price: {price} บาท</Text>
    </View>
  )
}

export default CalPrice
