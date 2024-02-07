import React, { useState } from 'react'
import { View, Text, TextField, Button, Colors, KeyboardAwareScrollView } from 'react-native-ui-lib'
import SuccessOrFail from '../../../components/SuccessOrFail'

const Confirm = () => {
  return (
    <View centerV flex>
      <SuccessOrFail status="true" />
    </View>
  )
}

export default Confirm
