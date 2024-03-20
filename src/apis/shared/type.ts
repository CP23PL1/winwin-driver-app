export type Paginate<T> = {
  data: T[]
  links: {
    current: string
    last: string
    next: string
  }
  meta: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export type PaginateParams = Partial<{
  page: number
  limit: number
  sortBy: string
  search: string
  searchBy: string
}>

export type Coordinate = {
  lat: number
  lng: number
}

export type Route = {
  duration: string
  distanceMeters: number
  polyline: {
    encodedPolyline: string
  }
}

export type User = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  createdAt: string
  updatedAt: string
}
