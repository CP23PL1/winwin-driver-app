import { driversApi } from '@/apis/drivers'
import DriveRequestDetail from '@/components/drive-request/DriveRequestDetail'

import { useQuery } from '@tanstack/react-query'
import { Stack, useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import { SkeletonView } from 'react-native-ui-lib'

export default function DriveRequestDetailScreen() {
  const { slug } = useLocalSearchParams()

  const { data: driveRequest } = useQuery({
    queryKey: ['drive-requests', slug],
    queryFn: () => driversApi.getMyDriveRequestById(slug as string),
    enabled: !!slug,
  })

  return (
    <>
      <Stack.Screen
        options={{
          title: driveRequest
            ? moment(driveRequest.createdAt).format('DD/MM/YYYY HH:mm')
            : 'Loading',
        }}
      />
      <SkeletonView
        style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10 }}
        times={3}
        template={SkeletonView.templates.TEXT_CONTENT}
        showContent={!!driveRequest}
        renderContent={() => <DriveRequestDetail data={driveRequest!} />}
      />
    </>
  )
}
