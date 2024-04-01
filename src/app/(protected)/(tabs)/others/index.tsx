import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useAuth0 } from 'react-native-auth0'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GridList, GridView, ListItem, Text, View } from 'react-native-ui-lib'

export default function OthersScreen() {
  const queryClient = useQueryClient()
  const { clearSession } = useAuth0()

  const logout = useCallback(async () => {
    await clearSession()
    queryClient.clear()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FlatList
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          borderRadius: 25,
        }}
        data={[
          { title: 'คะแนนของฉัน', onPress: () => {} },
          { title: 'ออกจากระบบ', onPress: logout },
        ]}
        renderItem={({ item }) => (
          <ListItem>
            <ListItem.Part>
              <Text>{item.title}</Text>
            </ListItem.Part>
          </ListItem>
        )}
      />
    </SafeAreaView>
  )
}
