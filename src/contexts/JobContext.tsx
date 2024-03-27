import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import JobOfferModal from '@/components/JobOfferModal'
import { router } from 'expo-router'
import { driveRequestSocket } from '@/sockets/drive-request'
import { DriveRequestSessionStatus } from '@/sockets/drive-request/type'

type JobContextType = {
  isOnline: boolean
  setIsOnline: (isOnline: boolean) => void
  driveRequest: DriveRequestSession | null
  updateDriveRequestStatus: (status: DriveRequestSessionStatus) => void
}

const JobContext = createContext<JobContextType>({} as JobContextType)

export default function JobContextProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(driveRequestSocket.connected)
  const [driveRequest, setDriveRequest] = useState<DriveRequestSession | null>(null)

  const acceptDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestSocket.emit('accept-drive-request', driveRequest)
  }, [driveRequest])

  const rejectDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestSocket.emit('reject-drive-request', driveRequest)
    setDriveRequest(null)
  }, [driveRequest])

  const updateDriveRequestStatus = useCallback(
    (status: DriveRequestSessionStatus) => {
      if (!driveRequest) return
      driveRequestSocket.emit('update-drive-request-status', {
        driveRequestSid: driveRequest.sid,
        status,
      })
    },
    [driveRequest],
  )

  const handleDriveRequestCreated = useCallback((data: DriveRequestSession) => {
    router.push(`/drive-request`)
    setDriveRequest(data)
  }, [])

  const handleDriveRequestUpdated = useCallback(
    (data: Partial<DriveRequestSession>) => {
      if (!driveRequest) return
      setDriveRequest({
        ...driveRequest,
        ...data,
      })
    },
    [driveRequest],
  )

  const handleDriveRequestCompleted = useCallback(() => {
    setDriveRequest(null)
  }, [])

  const handleException = useCallback((error: any) => {
    console.error('Error', error)
  }, [])

  const handleJobOffer = useCallback((data: DriveRequestSession) => {
    setDriveRequest(data)
  }, [])

  useEffect(() => {
    driveRequestSocket.on('job-offer', handleJobOffer)
    driveRequestSocket.on('drive-request-created', handleDriveRequestCreated)
    driveRequestSocket.on('drive-request-updated', handleDriveRequestUpdated)
    driveRequestSocket.on('drive-request-completed', handleDriveRequestCompleted)
    driveRequestSocket.on('exception', handleException)

    return () => {
      driveRequestSocket.off('job-offer', handleJobOffer)
      driveRequestSocket.off('drive-request-created', handleDriveRequestCreated)
      driveRequestSocket.off('drive-request-updated', handleDriveRequestUpdated)
      driveRequestSocket.off('drive-request-completed', handleDriveRequestCompleted)
      driveRequestSocket.off('exception', handleException)
    }
  }, [handleDriveRequestCreated, handleDriveRequestUpdated, handleJobOffer, handleException])

  useEffect(() => {
    if (isOnline) {
      driveRequestSocket.connect()
    } else {
      driveRequestSocket.disconnect()
    }

    return () => {
      driveRequestSocket.disconnect()
    }
  }, [isOnline])

  return (
    <JobContext.Provider
      value={{
        driveRequest,
        isOnline,
        setIsOnline,
        updateDriveRequestStatus,
      }}
    >
      {children}
      <JobOfferModal
        driveRequest={driveRequest}
        onAccepted={acceptDriveRequest}
        onRejected={rejectDriveRequest}
      />
    </JobContext.Provider>
  )
}

export const useJob = () => {
  return useContext(JobContext)
}
