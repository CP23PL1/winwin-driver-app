import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import JobOfferModal from '@/components/JobOfferModal'
import { router } from 'expo-router'
import { driveRequestSocket } from '@/sockets/drive-request'
import { DriveRequestSession, DriveRequestSessionStatus } from '@/sockets/drive-request/type'
import { useQueryClient } from '@tanstack/react-query'

type JobContextType = {
  isOnline: boolean
  driveRequest: DriveRequestSession | null
  updateDriveRequestStatus: (status: DriveRequestSessionStatus) => void
  updateDriverOnlineStatus: (isOnline: boolean) => void
}

const JobContext = createContext<JobContextType>({} as JobContextType)

export default function JobContextProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const [isOnline, setIsOnline] = useState(false)
  const [driveRequest, setDriveRequest] = useState<DriveRequestSession | null>(null)

  const updateDriverOnlineStatus = useCallback((onlineStatus: boolean) => {
    driveRequestSocket.emit('update-driver-status', onlineStatus)
    setIsOnline(onlineStatus)
  }, [])

  const acceptDriveRequest = useCallback(() => {
    if (!driveRequest) return
    driveRequestSocket.emit('accept-drive-request', driveRequest)
  }, [driveRequest])

  const rejectDriveRequest = useCallback(() => {
    if (!driveRequest) return
    updateDriverOnlineStatus(false)
    driveRequestSocket.emit('reject-drive-request', driveRequest)
    setDriveRequest(null)
  }, [driveRequest, setDriveRequest, updateDriverOnlineStatus])

  const updateDriveRequestStatus = useCallback(
    (status: DriveRequestSessionStatus) => {
      if (!driveRequest) return
      setDriveRequest({
        ...driveRequest,
        status,
      })
      driveRequestSocket.emit('update-drive-request-status', {
        driveRequestSid: driveRequest.sid,
        status,
      })
    },
    [driveRequest, setDriveRequest],
  )

  const handleDriveRequestCreated = useCallback(
    (data: DriveRequestSession) => {
      updateDriverOnlineStatus(false)
      router.push(`/drive-request`)
      setDriveRequest(data)
    },
    [setDriveRequest, updateDriverOnlineStatus],
  )

  const handleDriveRequestUpdated = useCallback(
    (data: Partial<DriveRequestSession>) => {
      if (!driveRequest) return
      setDriveRequest({
        ...driveRequest,
        ...data,
      })
    },
    [driveRequest, setDriveRequest],
  )

  const handleDriveRequestCompleted = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['drive-requests'],
      type: 'all',
    })
    setDriveRequest(null)
  }, [setDriveRequest])

  const handleException = useCallback((error: any) => {
    console.error('Error', error)
  }, [])

  const handleJobOffer = useCallback(
    (data: DriveRequestSession) => {
      setDriveRequest(data)
    },
    [setDriveRequest],
  )

  useEffect(() => {
    driveRequestSocket.on('job-offer', handleJobOffer)
    driveRequestSocket.on('drive-request-created', handleDriveRequestCreated)
    driveRequestSocket.on('drive-request-updated', handleDriveRequestUpdated)
    driveRequestSocket.on('drive-request-completed', handleDriveRequestCompleted)
    driveRequestSocket.on('sync-driver-status', setIsOnline)
    driveRequestSocket.on('exception', handleException)

    return () => {
      driveRequestSocket.off('job-offer', handleJobOffer)
      driveRequestSocket.off('drive-request-created', handleDriveRequestCreated)
      driveRequestSocket.off('drive-request-updated', handleDriveRequestUpdated)
      driveRequestSocket.off('drive-request-completed', handleDriveRequestCompleted)
      driveRequestSocket.off('sync-driver-status', setIsOnline)
      driveRequestSocket.off('exception', handleException)
    }
  }, [
    handleDriveRequestCreated,
    handleDriveRequestCompleted,
    handleDriveRequestUpdated,
    handleJobOffer,
    handleException,
    setIsOnline,
  ])

  useEffect(() => {
    driveRequestSocket.connect()

    return () => {
      driveRequestSocket.disconnect()
    }
  }, [])

  return (
    <JobContext.Provider
      value={{
        driveRequest,
        isOnline,
        updateDriverOnlineStatus,
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
