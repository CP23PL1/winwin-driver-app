import { Redirect, Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from 'react-native-ui-lib'
import { useDriverInfo } from '@/hooks/useDriverInfo'

export default function MainLayout() {
  const { data: driver } = useDriverInfo()

  if (!driver?.serviceSpot) return <Redirect href="/signup" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: Colors.secondaryColor,
        tabBarActiveTintColor: Colors.$backgroundPrimaryHeavy,
        tabBarLabelStyle: {
          fontFamily: 'NotoSansThai',
          fontSize: 15,
          paddingBottom: 5,
        },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'หน้าแรก',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="drive-requests"
        options={{
          title: 'การโดยสาร',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={30} color={color} />,
        }}
      />
      <Tabs.Screen
        name="others"
        options={{
          title: 'อื่นๆ',
          tabBarIcon: ({ color }) => <MaterialIcons name="more-horiz" size={30} color={color} />,
        }}
      />
    </Tabs>
  )
}
