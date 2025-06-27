import type { PageParams } from '@/utils/request/types'
import type { ListRes } from './types'
import { get } from '@/utils/request'

export const apiList = (params?: PageParams) => get<ListRes>('/list', { params })

export * from './types'
