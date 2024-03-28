import { Stack } from 'expo-router'

export default function DriveRequestsLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'ประวัติการโดยสาร',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'NotoSansThai',
          },
        }}
      />
    </Stack>
  )
}
