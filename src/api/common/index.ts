/**
 * 通用接口
 */
import type { SendCodeReq, SendCodeRes, UploadRes } from './types'
import { post, upload } from '@/utils/request'

// 文件上传
export const apiUploadFile = (filePath: string) =>
  upload<UploadRes>('/common/upload', { filePath, name: 'file' })

// 发送验证码
export const apiSendCode = (data: SendCodeReq) => post<SendCodeRes>('/sendCode', { data })

export * from './user'
