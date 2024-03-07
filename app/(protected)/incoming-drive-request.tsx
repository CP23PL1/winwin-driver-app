import React from 'react'
import { Modal, Text, View } from 'react-native-ui-lib'
import { socketManager } from '../../libs/socket-client'

const driveRequestsSocket = socketManager.socket('/drive-requests')

export default function IncomingDriveRequestScreen() {
  return (
    <Modal visible={true}>
      <View>
        <Text>Incoming Drive Request</Text>
      </View>
    </Modal>
  )
}
