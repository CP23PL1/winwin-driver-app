import React from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'

type Props = {
  value?: string
}

function InviteCodeMask({ value }: Props) {
  return (
    <View row gap-15 center>
      <View style={[styles.container]} center>
        <Text h2B>{value?.slice(0, 1)}</Text>
      </View>
      <View style={[styles.container]} center>
        <Text h2B>{value?.slice(1, 2)}</Text>
      </View>
      <View style={[styles.container]} center>
        <Text h2B>{value?.slice(2, 3)}</Text>
      </View>
      <View style={[styles.container]} center>
        <Text h2B>{value?.slice(3, 4)}</Text>
      </View>
      <View style={[styles.container]} center>
        <Text h2B>{value?.slice(4, 5)}</Text>
      </View>
      <View style={[styles.container]} center>
        <Text h2B>{value?.slice(5, 6)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.$backgroundPrimaryHeavy,
    borderBottomWidth: 2,
    width: 30,
  },
})

export default InviteCodeMask
