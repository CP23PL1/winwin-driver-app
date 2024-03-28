import { FlashList } from '@shopify/flash-list'
import React from 'react'
import ChatMessageItem from './ChatMessageItem'
import { Driver } from '@/apis/drivers/type'

type Props = {
  user: Driver
  messages: ChatMessage[]
}

export default function ChatMessageList({ user, messages }: Props) {
  return (
    <FlashList
      contentContainerStyle={{ padding: 10 }}
      data={messages}
      renderItem={({ item }) => <ChatMessageItem message={item} user={user} />}
      estimatedItemSize={100}
    />
  )
}
