import type { LoginByCodeReq, LoginReq, UserInfoReq } from '@/api/user/types'
import type { UserState } from './types'
import { apiLogin, apiLoginByCode, apiLogout, apiUserInfo } from '@/api'
import { clearToken, getToken, setToken } from '@/utils/auth'

import storage from '@/utils/storage'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserState>({
    userId: '',
    username: '',
    avatar: '',
  })
  const token = ref(getToken())
  const rememberPwd = ref<'Y' | 'N'>(storage.get('rememberPwd'))

  async function loginByCode(req: LoginByCodeReq) {
    try {
      const res = await apiLoginByCode(req)
      const { accessToken } = res
      if (accessToken) {
        setToken(accessToken)
        token.value = accessToken
        return Promise.resolve()
      }
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  async function loginByPwd(req: LoginReq) {
    try {
      const res = await apiLogin(req)
      const { accessToken } = res
      if (!accessToken) return Promise.reject(new Error('登录失败'))

      setToken(accessToken)
      token.value = accessToken

      if (rememberPwd.value === 'Y') {
        storage.set('rememberPwd', rememberPwd.value)
        storage.set('username', req.username)
        storage.set('password', req.password)
      }
      else {
        storage.remove('rememberPwd')
        storage.remove('username')
        storage.remove('password')
      }

      return Promise.resolve()
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  async function logout() {
    await apiLogout()
    clearToken()
    token.value = ''
  }

  async function getUserInfo(req: UserInfoReq) {
    try {
      const res = await apiUserInfo(req)
      if (res) {
        userInfo.value = res
        return Promise.resolve()
      }
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  return {
    loginByCode,
    loginByPwd,
    logout,
    getUserInfo,
    userInfo,
    token,
    rememberPwd,
  }
})
