import { View, Text } from 'react-native-ui-lib'
import { DriveRequestStatus, useJob } from '@/contexts/JobContext'
import { Button } from 'react-native-ui-lib'

type Props = {}

export default function DriveRequestDetail({}: Props) {
  const { driveRequest, origin, destination } = useJob()
  return (
    driveRequest && (
      <View>
        <Text>{driveRequest.id}</Text>
        <Text>{origin?.formatted_address}</Text>
        <Text>{destination?.formatted_address}</Text>
        {driveRequest.status === DriveRequestStatus.ACCEPTED && <Button label="ถึงจุดรับแล้ว" />}
      </View>
    )
  )
}
