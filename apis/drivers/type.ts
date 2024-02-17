export type Driver = {
  id: number
  firstName: string
  lastName: string
  approved: boolean
  createdAt: string
  updatedAt: string
  phoneNumber: string
  dateOfBirth: string
  nationalId: string
  vehicle: Vehicle
}

export type Vehicle = {
  id: number
  plate: string
  province: string
  model: string
  manufactor: string
}
