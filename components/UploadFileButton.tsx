import React, { useState } from 'react'
import { View, Text, Colors, TouchableOpacity, Button, Image } from 'react-native-ui-lib'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from 'react-native'

function UploadFileButton() {
  const [result, setResult] = useState<ImagePicker.ImagePickerResult | null>(null)

  const pickImage = async (useLibary: boolean) => {
    let _result

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    }

    if (useLibary) {
      _result = await ImagePicker.launchImageLibraryAsync(options)
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      _result = await ImagePicker.launchCameraAsync(options)
    }

    if (!_result.canceled) {
      setResult(_result)
    }
  }

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        height: 200,
        overflow: 'hidden',
      }}
      onPress={pickImage}
    >
      {result?.assets ? (
        <Image
          source={{
            uri: result.assets[0].uri,
            width: result.assets[0].width,
          }}
          style={{ height: '100%', resizeMode: 'contain' }}
        />
      ) : (
        <>
          <View center paddingV-5>
            <MaterialCommunityIcons name="file-upload" size={50} color="gray" />
          </View>
          <View>
            <Text bodyB center color="gray">
              อัปโหลดไฟล์
            </Text>
            <Text body center color="gray">
              ไฟล์รูปภาพ ขนาดไม่เกิน 50 MB
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  )
}

export default UploadFileButton
