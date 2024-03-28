import { DriveRequestSessionStatus, DriveRequestStatus } from '@/sockets/drive-request/type'

export const driveRequestStatusText: Record<
  DriveRequestSessionStatus | DriveRequestStatus,
  string
> = {
  [DriveRequestSessionStatus.ARRIVED]: 'ถึงจุดรับแล้ว',
  [DriveRequestSessionStatus.CANCELLED]: 'ยกเลิก',
  [DriveRequestSessionStatus.COMPLETED]: 'เสร็จสิ้น',
  [DriveRequestSessionStatus.ON_GOING]: 'กำลังเดินทางไปยังจุดรับ',
  [DriveRequestSessionStatus.PENDING]: 'รอการตอบรับ',
  [DriveRequestSessionStatus.PICKED_UP]: 'รับผู้โดยสารแล้ว',
}
