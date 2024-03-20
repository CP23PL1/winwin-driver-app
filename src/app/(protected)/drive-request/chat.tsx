import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TextField, Button, Colors } from 'react-native-ui-lib'
import { Redirect, Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { useJob } from '@/contexts/JobContext'
import { FlatList } from 'react-native-gesture-handler'
import { driveRequestSocket } from '@/sockets/drive-request'
import moment from 'moment'

type IncomingChatPayload = {
  sender: string
  message: string
  timestamp: Date
}

type ChatPayload = {
  to: string
  message: string
}

export default function DriveRequestChat() {
  const { driveRequest } = useJob()
  const [text, onChangeText] = useState('')
  const [chatMessages, setChatMessages] = useState<IncomingChatPayload[]>([])

  const sendChatMessage = (message: string) => {
    if (!driveRequest?.id) {
      console.log('No drive request id')
      return
    }
    const payload: ChatPayload = {
      to: driveRequest.user.id,
      message,
    }
    driveRequestSocket.emit('chat-message', payload)
    onChangeText('')
  }

  const handleChatMessageReceived = useCallback((data: IncomingChatPayload) => {
    console.log('Chat message received', data)
    setChatMessages((prev) => [...prev, data])
  }, [])

  useEffect(() => {
    driveRequestSocket.on('chat-message-received', handleChatMessageReceived)
    return () => {
      driveRequestSocket.off('chat-message-received', handleChatMessageReceived)
    }
  }, [handleChatMessageReceived])

  if (!driveRequest) {
    return <Redirect href="/" />
  }

  return (
    <View flex backgroundColor={'#F5F5F5'}>
      <Stack.Screen
        options={{
          headerTitle: `${driveRequest.user.firstName} ${driveRequest.user.lastName}`,
          headerTitleAlign: 'center',
        }}
      />
      <FlatList
        style={styles.chatContainer}
        data={chatMessages}
        renderItem={(chatItem) => (
          <View
            style={[
              {
                alignItems:
                  chatItem.item.sender === driveRequest.driver?.id ? 'flex-end' : 'flex-start',
                marginVertical: 5,
              },
            ]}
          >
            <View
              paddingH-16
              paddingV-8
              br60
              backgroundColor={
                chatItem.item.sender === driveRequest.driver?.id
                  ? Colors.$backgroundPrimaryHeavy
                  : Colors.rgba(222, 222, 222, 1)
              }
            >
              <Text
                style={styles.chatMessage}
                color={
                  chatItem.item.sender === driveRequest.driver?.id ? Colors.white : Colors.black
                }
              >
                {chatItem.item.message}
              </Text>
            </View>
            <Text caption color="gray">
              {moment(chatItem.item.timestamp).format('HH:mm')}
            </Text>
          </View>
        )}
      />
      <View row bg-white width={'100%'} paddingV-10>
        <View flex-1 center paddingH-15>
          <Button none>
            <Entypo name="image-inverted" size={35} color="#DEDEDE" />
          </Button>
        </View>
        <View flex-8 centerV>
          <TextField
            containerStyle={{
              borderColor: '#D5DDE0',
              borderWidth: 1,
              borderRadius: 30,
              paddingLeft: 13,
              paddingVertical: 10,
              backgroundColor: '#DEDEDE',
            }}
            placeholder="ข้อความ"
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View flex-1 paddingL-5 paddingR-15 centerV>
          <Button none avoidMinWidth avoidInnerPadding onPress={() => sendChatMessage(text)}>
            <Text bodyB>ส่ง</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 15,
    gap: 10,
  },

  chatMessage: {
    flexShrink: 1,
  },
})
