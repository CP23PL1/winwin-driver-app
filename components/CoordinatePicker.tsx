import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MapView, { Address, Details, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { View, Text, Button, LoaderScreen, TouchableOpacity } from 'react-native-ui-lib'
import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import { useLocation } from '../hooks/useLocation'
import debounce from 'lodash.debounce'

export type MapConfirmHandler = (region: Region) => void

type Props = {
  onConfirm: MapConfirmHandler
}

const LAT_DELTA = 0.002
const LNG_DELTA = 0.005

export default function CoordinatePicker({ onConfirm }: Props) {
  const { location } = useLocation()
  const mapRef = useRef<MapView>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const [region, setRegion] = useState<Region | null>(null)
  const setRegionDebouce = useMemo(() => debounce(setRegion, 500), [])
  const [isPicked, setIsPicked] = useState(false)

  const animateToCurrentLocation = useCallback(() => {
    if (!location) return
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LAT_DELTA,
      longitudeDelta: LNG_DELTA,
    })
  }, [location])

  const handleRegionChangeComplete = useCallback((region: Region, detail: Details) => {
    if (detail && detail.isGesture) {
      setIsPicked(false)
      setRegionDebouce(region)
    }
  }, [])

  const handleConfirm = useCallback(() => {
    if (!region) return
    onConfirm(region)
  }, [region])

  useEffect(() => {
    if (!location) return
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LAT_DELTA,
      longitudeDelta: LNG_DELTA,
    })
  }, [location])

  useEffect(() => {
    if (!region) return
    mapRef.current?.addressForCoordinate(region).then((address) => {
      setAddress(address)
      setIsPicked(true)
    })
  }, [region])

  if (!location || !region) {
    return <LoaderScreen />
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        rotateEnabled={false}
        pitchEnabled={false}
        onRegionChangeComplete={handleRegionChangeComplete}
      />
      <View style={styles.picker}>
        <Fontisto name="map-marker-alt" size={32} color="orange" />
      </View>
      <View gap-10 absB absH padding-15>
        <View right>
          <TouchableOpacity
            br100
            backgroundColor="white"
            center
            style={{ width: 40, height: 40, elevation: 3 }}
            onPress={animateToCurrentLocation}
          >
            <MaterialIcons name="my-location" size={24} color="orange" />
          </TouchableOpacity>
        </View>

        <View gap-10 br50 padding-15 backgroundColor="white" style={{ elevation: 3 }}>
          <Text h4>เลือกตำแหน่งที่ตั้งซุ้ม</Text>
          <Text>
            {address?.name} {address?.thoroughfare} {address?.locality} {address?.subLocality}{' '}
            {address?.administrativeArea} {address?.postalCode}
          </Text>
          <Button marginT-5 label="ยืนยัน" onPress={handleConfirm} disabled={!isPicked} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '125%',
  },
  picker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30, // to adjust marker icon anchor
  },
})
