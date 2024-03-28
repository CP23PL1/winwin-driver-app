import { DriveRequest } from '@/sockets/drive-request/type'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { View } from 'react-native-ui-lib'
import DriveRequestListItem from './DriveRequestListItem'
import { useRef } from 'react'

type Props = {
  data: DriveRequest[]
  listProps?: Partial<FlashListProps<DriveRequest>>
  onEndReached?: () => void
}

export default function DriveRequestList({ data, listProps, onEndReached }: Props) {
  return (
    <FlashList
      {...listProps}
      data={data}
      scrollEnabled={true}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View height={10} />}
      estimatedItemSize={100}
      renderItem={({ item }) => <DriveRequestListItem driveRequest={item} />}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
    />
  )
}
