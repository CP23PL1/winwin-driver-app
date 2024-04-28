import { DriveRequest, DriveRequestSession } from '@/sockets/drive-request/type'
import { commonUtil } from '@/utils/common'
import { router } from 'expo-router'
import moment from 'moment'
import { Card, Colors, View, Text } from 'react-native-ui-lib'
import Waypoint from '../Waypoint'
import DriveRequestStatusChip from './DriveRequestStatusChip'

export default function DriveRequestListItem({ driveRequest }: { driveRequest: DriveRequest }) {
  return (
    <Card
      flex
      center
      gap-20
      padding-15
      onPress={() => router.navigate(`/drive-requests/${driveRequest.id}`)}
    >
      <View row spread centerV width="100%">
        <Text caption color="gray">
          {moment(driveRequest.createdAt).format('DD/MM/YYYY HH:mm')}
        </Text>
        <DriveRequestStatusChip status={driveRequest.status} />
      </View>
      <View row centerV gap-20>
        <View flex gap-5>
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
        </View>
        <Text h4B>{commonUtil.formatCurrency(driveRequest.paidAmount)}</Text>
      </View>
    </Card>
  )
}
