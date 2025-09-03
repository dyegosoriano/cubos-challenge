export interface IResultList<T = unknown> {
  page_size: number
  page: number
  total_pages: number
  total: number
  results: T[]
}
