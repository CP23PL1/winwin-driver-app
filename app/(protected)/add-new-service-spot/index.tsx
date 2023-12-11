import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { View } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { useLocation } from '../../../hooks/useLocation'

type Props = {}

function AddNewServiceSpot({}: Props) {
  const location = useLocation()
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location?.coords?.latitude || 13.0,
          longitude: location?.coords?.longitude || 100.0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={15}
        maxZoomLevel={20}
        showsUserLocation
      />
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
})

export default AddNewServiceSpot
