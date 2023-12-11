import React from 'react'
import { View, Text, Colors, TouchableOpacity } from 'react-native-ui-lib'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function UploadFileButton() {
  return (
    <TouchableOpacity
      paddingV-40
      style={{
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
      }}
    >
      <View center paddingV-5>
        <MaterialCommunityIcons name="file-upload" size={50} color="gray" />
      </View>
      <Text bodyB center color="gray">
        อัปโหลดไฟล์
      </Text>
      <Text body center color="gray">
        ไฟล์รูปภาพ ขนาดไม่เกิน 50 MB
      </Text>
    </TouchableOpacity>
  )
}

export default UploadFileButton
