import { driversApi } from '@/apis/drivers'
import Waypoint from '@/components/Waypoint'
import { driveRequestStatusText } from '@/constants/drive-request'
import { DriveRequest } from '@/sockets/drive-request/type'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { Card, Colors, SkeletonView, Text, View } from 'react-native-ui-lib'
import moment from 'moment'
import { commonUtil } from '@/utils/common'
import { router } from 'expo-router'

function DriveRequestListItem({ driveRequest }: { driveRequest: DriveRequest }) {
  return (
    <Card row center padding-15 onPress={() => router.push(`/drive-requests/${driveRequest.id}`)}>
      <View flex>
        <Text caption color="gray">
          {moment(driveRequest.createdAt).format('DD/MM/YYYY HH:mm')}
        </Text>
        <Waypoint
          placeDetail={driveRequest.origin}
          color={Colors.blue40}
          useDivider={false}
          textProps={{
            numberOfLines: 1,
            ellipsizeMode: 'tail',
          }}
        />
        <Waypoint
          placeDetail={driveRequest.destination}
          color={Colors.red40}
          useDivider={false}
          textProps={{
            numberOfLines: 1,
            ellipsizeMode: 'tail',
          }}
        />
        <Text>{driveRequestStatusText[driveRequest.status]}</Text>
      </View>
      <Text>{commonUtil.formatCurrency(driveRequest.paidAmount)}</Text>
    </Card>
  )
}

export default function DriveRequests() {
  const { data: driveRequests, isLoading } = useQuery({
    queryKey: ['drive-requests'],
    queryFn: () => driversApi.getMyDriveRequests({ sortBy: 'createdAt:DESC' }),
  })
  return (
    <View flex padding-10>
      <SkeletonView
        template={SkeletonView.templates.LIST_ITEM}
        showContent={!isLoading}
        times={10}
        renderContent={() => (
          <FlashList
            data={driveRequests?.data}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View height={10} />}
            estimatedItemSize={100}
            renderItem={({ item }) => <DriveRequestListItem driveRequest={item} />}
          />
        )}
      />
    </View>
  )
}
