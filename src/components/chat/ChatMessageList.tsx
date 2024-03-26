import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { StyleSheet } from 'react-native'
import ChatMessageItem from './ChatMessageItem'

type Props = {
  user: User
  messages: ChatMessage[]
}

export default function ChatMessageList({ user, messages }: Props) {
  return (
    <FlashList
      data={messages}
      renderItem={({ item }) => <ChatMessageItem message={item} user={user} />}
      estimatedItemSize={100}
    />
  )
}
