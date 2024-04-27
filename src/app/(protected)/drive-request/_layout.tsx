import { useJob } from '@/contexts/JobContext'
import { Redirect, Stack } from 'expo-router'

export default function DriveRequestLayout() {
  const { driveRequest } = useJob()

  if (!driveRequest) {
    return <Redirect href="/" />
  }

  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
      }}
    />
  )
}
