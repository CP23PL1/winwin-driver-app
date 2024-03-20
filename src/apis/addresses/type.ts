import { Paginate } from '../shared/type'

export type AddressInfo = {
  id: number
  nameEN: string
  nameTH: string
}

export type AddressInfoResponse = Paginate<AddressInfo>
