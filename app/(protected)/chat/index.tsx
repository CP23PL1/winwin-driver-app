import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextField, Button, Colors, StateScreen } from 'react-native-ui-lib'
import { useRouter } from 'expo-router'
import { driversApi } from '../../../apis/drivers'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { authCallback, socketManager } from '../../../libs/socket-client'
import { useJob } from '../../../contexts/job'
import { FlatList } from 'react-native-gesture-handler'

type IncomingChatPayload = {
  sender: string
  message: string
  timestamp: Date
}

type ChatPayload = {
  driveRequestId: number
  message: string
}

const driveRequestsSocket = socketManager.socket('/drive-requests', {
  auth: authCallback,
})

const Chat = () => {
  const { driveRequest } = useJob()
  const router = useRouter()
  const [prevChat, setPrevChat] = useState(true)
  const [text, onChangeText] = React.useState('')
  const [chatItems, setChatItems] = useState<IncomingChatPayload[]>([])

  const prev = () => {
    router.push('../')
  }

  const sendChatMessage = (message: string) => {
    if (!driveRequest) {
      return
    }
    const payload: ChatPayload = {
      driveRequestId: driveRequest.id,
      message,
    }
    driveRequestsSocket.emit('drive-requests:chat', payload)
    onChangeText('')
  }

  useEffect(() => {
    driveRequestsSocket.connect()

    const handleDriveRequestChat = (data: IncomingChatPayload) => {
      setChatItems((prev) => [...prev, data])
    }

    driveRequestsSocket.on('drive-requests:chat', handleDriveRequestChat)
    return () => {
      driveRequestsSocket.off('drive-requests:chat', handleDriveRequestChat)
      driveRequestsSocket.disconnect()
    }
  }, [])

  return (
    <View flex backgroundColor={'#F5F5F5'}>
      <View backgroundColor={Colors.$textPrimary} row paddingT-30 paddingB-10 paddingH-10>
        <View flex-1 paddingV-10 center>
          <Button onPress={() => prev()}>
            <Ionicons name="chevron-back-outline" size={30} color="white" />
          </Button>
        </View>
        <View flex-8 center>
          <Text h4B white>
            สมศักดิ์ มีดี
          </Text>
        </View>
        <View flex-1></View>
      </View>
      {/* <View flex paddingB-50>
        {prevChat ? (
          <View padding-15>
            <View style={{ alignItems: 'baseline' }}>
              <View style={styles.customer}>
                <Text flexS>คุณทำอะไรอยู่</Text>
              </View>
            </View>
            <Text>2:36 AM</Text>
            <View style={{ alignItems: 'baseline' }}>
              <View style={styles.driver}>
                <Text white>ผมกำลังไปครับ รอสักครู่นะครับคุณลูกค้า</Text>
              </View>
            </View>
            <Text>โอเคครับ</Text>
            <Text>🙂</Text>
            <Text>2:38 AM</Text>
          </View>
        ) : (
          <View flex center paddingB-50>
            <Ionicons name="chatbubbles" size={150} color="#DFDFDF" />
            <Text style={{ color: '#DFDFDF' }}>ไม่มีข้อความ ณ ขณะนี้</Text>
          </View>
        )}
      </View> */}

      <View padding-15>
        <FlatList
          data={chatItems}
          renderItem={(chatItem) => (
            <Text
              style={
                chatItem.item.sender === driveRequest?.driver.id ? styles.driver : styles.customer
              }
            >
              {chatItem.item.message}
            </Text>
          )}
        />
        {/* <View style={{ alignItems: 'baseline' }}>
          <View style={styles.customer}>
            <Text flexS>คุณทำอะไรอยู่</Text>
          </View>
        </View>
        <Text>2:36 AM</Text>
        <View style={{ alignItems: 'baseline' }}>
          <View style={styles.driver}>
            <Text white>ผมกำลังไปครับ รอสักครู่นะครับคุณลูกค้า</Text>
          </View>
        </View>
        <Text>โอเคครับ</Text>
        <Text>🙂</Text>
        <Text>2:38 AM</Text> */}
      </View>

      <View row absB bg-white width={'100%'} paddingV-10>
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
  customer: {
    borderTopLeftRadius: 100,
    padding: 15,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#DEDEDE',
    alignSelf: 'flex-start',
  },
  driver: {
    borderTopLeftRadius: 100,
    padding: 15,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: '#FDA84B',
    alignSelf: 'flex-end',
  },
})

export default Chat
