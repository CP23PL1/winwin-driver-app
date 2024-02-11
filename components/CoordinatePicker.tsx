import React, { useCallback, useRef, useState } from 'react'
import MapView, {
  Address,
  Details,
  PROVIDER_GOOGLE,
  PoiClickEvent,
  Region,
} from 'react-native-maps'
import { Alert, StyleSheet } from 'react-native'
import { View, Text } from 'react-native-ui-lib'
import { Fontisto } from '@expo/vector-icons'

export default function CoordinatePicker() {
  const mapRef = useRef<MapView>(null)

  const [address, setAddress] = useState<Address | null>(null)

  const handlePoiClick = useCallback((evt: PoiClickEvent) => {
    mapRef.current?.animateToRegion({
      latitude: evt.nativeEvent.coordinate.latitude,
      longitude: evt.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }, [])

  const handleRegionChangeComplete = useCallback((region: Region, detail: Details) => {
    if (detail && detail.isGesture) {
      mapRef.current?.addressForCoordinate(region).then((address) => {
        if (!address) return
        setAddress(address)
      })
    }
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 13.0,
          longitude: 100.0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPoiClick={handlePoiClick}
        rotateEnabled={false}
        pitchEnabled={false}
        onRegionChangeComplete={handleRegionChangeComplete}
        followsUserLocation
        showsUserLocation
      />
      <View style={styles.picker}>
        <Fontisto name="map-marker-alt" size={32} color="orange" />
      </View>
      <View style={styles.locationInfo} backgroundColor="white">
        <Text>เลือกตำแหน่งที่ตั้งซุ้ม</Text>
        <Text>
          {address?.name} {address?.thoroughfare} {address?.locality} {address?.subLocality}{' '}
          {address?.administrativeArea} {address?.postalCode}
        </Text>
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
    height: '100%',
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
  locationInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 120,
    gap: 8,
  },
})
