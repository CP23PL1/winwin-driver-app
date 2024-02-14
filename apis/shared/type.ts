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
