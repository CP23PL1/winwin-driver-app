import MapView, { LatLng, MapMarker, Marker, Polyline } from 'react-native-maps'
import { Modal, View, Colors, Button, Text } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { mapUtil } from '@/utils/map'
import Waypoint from './Waypoint'
import { DriveRequestSession, DriveRequestSessionStatus } from '@/sockets/drive-request/type'
import { commonUtil } from '@/utils/common'
import CustomMarkerImage from './map/CustomMarkerImage'

type Props = {
  driveRequest: DriveRequestSession | null
  onAccepted: () => void
  onRejected: () => void
}

export default function JobOfferModal({ driveRequest, onAccepted, onRejected }: Props) {
  const [points, setPoints] = useState<LatLng[]>([])
  const originMarker = useRef<MapMarker>(null)
  const destinationMarker = useRef<MapMarker>(null)
  const map = useRef<MapView>(null)
  useEffect(() => {
    if (!driveRequest?.polyline || !map.current) return
    const decodedPolyline = mapUtil.decodePolyline(driveRequest.polyline.encodedPolyline)
    setPoints(decodedPolyline)
    map.current?.fitToCoordinates(decodedPolyline, {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      },
    })
    originMarker.current?.redraw()
    destinationMarker.current?.redraw()
  }, [map.current, driveRequest?.polyline, originMarker.current, destinationMarker.current])

  return (
    driveRequest && (
      <Modal visible={driveRequest.status === DriveRequestSessionStatus.PENDING}>
        <MapView
          ref={map}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: driveRequest.origin?.location.lat!,
            longitude: driveRequest.origin?.location.lng!,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapPadding={{ bottom: 150, top: 50, right: 0, left: 0 }}
        >
          <Marker
            ref={originMarker}
            coordinate={{
              latitude: driveRequest.origin?.location.lat!,
              longitude: driveRequest.origin?.location.lng!,
            }}
            tracksViewChanges={false}
          >
            <CustomMarkerImage color="blue" />
          </Marker>
          {points.length > 0 && (
            <Polyline coordinates={points} strokeWidth={3} strokeColor="#7C89FF" />
          )}
          <Marker
            ref={destinationMarker}
            coordinate={{
              latitude: driveRequest.destination?.location.lat!,
              longitude: driveRequest.destination?.location.lng!,
            }}
            tracksViewChanges={false}
          >
            <CustomMarkerImage color="red" />
          </Marker>
        </MapView>
        <View absB absL bg-white padding-25 gap-20 style={styles.footer}>
          <View>
            <Text caption>ค่าโดยสารทั้งหมด</Text>
            <Text h1B>{commonUtil.formatCurrency(driveRequest.total)}</Text>
          </View>
          <View gap-10>
            <Waypoint
              placeDetail={driveRequest.origin!}
              color={Colors.blue40}
              styles={{ placeNameStyle: { fontSize: 16 } }}
              useDivider={false}
            />
            <Waypoint
              placeDetail={driveRequest.destination!}
              color={Colors.red40}
              styles={{ placeNameStyle: { fontSize: 16 } }}
              useDivider={false}
            />
          </View>
          <View gap-10 row>
            <Button backgroundColor={Colors.red40} label="ไม่รับงาน" onPress={onRejected} />
            <Button
              flexG
              backgroundColor={Colors.$textPrimary}
              label="รับงาน"
              onPress={onAccepted}
            />
          </View>
        </View>
      </Modal>
    )
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})
