import { commonUtil } from '@/utils/common'
import moment from 'moment'
import { Card, Colors, Text, View } from 'react-native-ui-lib'
import Waypoint from '../Waypoint'
import DriveRequestStatusChip from './DriveRequestStatusChip'
import { DriveRequest } from '@/sockets/drive-request/type'
import { FontAwesome5 } from '@expo/vector-icons'

type Props = {
  data: DriveRequest
}

export default function DriveRequestDetail({ data }: Props) {
  return (
    <View style={{ padding: 10, height: '100%', gap: 10 }}>
      <Card padding-15 gap-10>
        <Text h5B>ข้อมูลเส้นทาง</Text>
        <View gap-10>
          <Waypoint
            placeDetail={data.origin}
            styles={{ placeNameStyle: { fontSize: 16 } }}
            color={Colors.blue40}
            useDivider={false}
          />

          <Waypoint
            placeDetail={data.destination}
            styles={{ placeNameStyle: { fontSize: 16 } }}
            color={Colors.red40}
            useDivider={false}
          />
        </View>
      </Card>

      <Card padding-15 gap-10>
        <Text h5B>ข้อมูลการโดยสาร</Text>
        <View gap-5>
          <View row spread centerV>
            <Text>รหัสเรียกรถ</Text>
            <Text caption>{data.id}</Text>
          </View>
          <View row spread centerV>
            <Text>วันที่</Text>
            <Text caption>{moment(data.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
          <View row spread centerV>
            <Text>สถานะ</Text>
            <DriveRequestStatusChip status={data.status} />
          </View>
        </View>

        <View row spread>
          <Text>ทั้งหมด</Text>
          <Text h4B>{commonUtil.formatCurrency(data.paidAmount)}</Text>
        </View>
      </Card>

      <Card padding-15 gap-10>
        <Text h5B>ข้อมูลผู้โดยสาร</Text>
        <View row spread>
          <View>
            <Text bodyB>
              {data.user.firstName} {data.user.lastName}
            </Text>
            <View row centerV gap-6>
              <FontAwesome5 name="phone-alt" size={16} color="black" />
              <Text>{commonUtil.formatPhoneNumber(data.user.phoneNumber)}</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  )
}
