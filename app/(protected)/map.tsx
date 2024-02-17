import React from 'react'
import CoordinatePicker, { MapConfirmHandler } from '../../components/CoordinatePicker'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function AddNewServiceSpotMad() {
  const router = useRouter()
  const searchParam = useLocalSearchParams() as { callback: string }
  const handleConfirm: MapConfirmHandler = (region) => {
    router.replace(`${searchParam.callback}?region=${JSON.stringify(region)}`)
  }
  return <CoordinatePicker onConfirm={handleConfirm} />
}
