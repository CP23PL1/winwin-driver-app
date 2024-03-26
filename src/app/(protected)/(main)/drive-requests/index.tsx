import { driversApi } from '@/apis/drivers'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-ui-lib'

export default function DriveRequests() {
  const { data: driveRequests } = useQuery({
    queryKey: ['drive-requests'],
    queryFn: () => driversApi.getMyDriveRequests(),
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Drive Requests</Text>
      <FlashList
        data={driveRequests?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.id} {item.status}
          </Text>
        )}
      />
    </SafeAreaView>
  )
}
