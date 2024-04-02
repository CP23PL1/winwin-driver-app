import { DriveRequest } from '@/sockets/drive-request/type'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { View } from 'react-native-ui-lib'
import DriveRequestListItem from './DriveRequestListItem'

type Props = {
  readonly data: DriveRequest[]
  readonly listProps?: Partial<FlashListProps<DriveRequest>>
  readonly onEndReached?: () => void
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
