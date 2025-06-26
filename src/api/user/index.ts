/**
 * 用户信息相关接口
 */
import type { CommonRes } from '@/api/common/types'
import type { LoginByCodeReq, LoginReq, LoginRes, UserInfoReq, UserInfoRes } from './types'
import { get, post } from '@/utils/request'

/** 获取用户信息 */
export const apiUserInfo = (params?: UserInfoReq) => get<UserInfoRes>('/user/profile', { params })

/** 登录 */
export const apiLogin = (data: LoginReq) => post<LoginRes>('/user/login', { data })

/** 验证码登录 */
export const apiLoginByCode = (data: LoginByCodeReq) => post<LoginRes>('/user/loginByCode', { data })

/** 退出登录 */
export const apiLogout = () => post<CommonRes>('/user/logout')

export * from './types'
