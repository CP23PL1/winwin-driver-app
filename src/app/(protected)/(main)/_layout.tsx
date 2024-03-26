import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Colors } from 'react-native-ui-lib'

export default function MainLayout() {
  const tabSettings = {
    tabBarInactiveTintColor: 'black',
    tabBarActiveTintColor: Colors.$backgroundPrimaryHeavy,
    tabBarLabelStyle: styles.tabBarLabelStyle,
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          ...tabSettings,
          title: 'หน้าแรก',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="drive-requests/index"
        options={{
          ...tabSettings,
          title: 'การโดยสารทั้งหมด',
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: 'NotoSansThai',
  },
})
