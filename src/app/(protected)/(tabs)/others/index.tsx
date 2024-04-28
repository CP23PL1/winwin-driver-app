import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { ListRenderItem, TextStyle } from 'react-native'
import { useAuth0 } from 'react-native-auth0'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, ListItem, Text } from 'react-native-ui-lib'

type Menu = {
  title: string
  textStyle?: TextStyle
  onPress: () => void
}

export default function OthersScreen() {
  const queryClient = useQueryClient()
  const { clearSession } = useAuth0()

  const logout = useCallback(async () => {
    await clearSession()
    queryClient.clear()
  }, [])

  const renderItem: ListRenderItem<Menu> = ({ item }) => {
    return (
      <ListItem onPress={item.onPress}>
        <ListItem.Part>
          <Text style={[item.textStyle]}>{item.title}</Text>
        </ListItem.Part>
      </ListItem>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FlatList
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          borderRadius: 25,
        }}
        data={[
          { title: 'คะแนนของฉัน', onPress: () => router.navigate('/others/feedback') },
          {
            title: 'ออกจากระบบ',
            textStyle: {
              color: Colors.$textDanger,
            },
            onPress: logout,
          },
        ]}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}
