<template>
  <view class="relative box-border h-screen bg-white">
    <view class="relative h-620rpx flex flex-col items-center leading-none">
      <image src="@/static/images/login-bg.png" class="absolute left-0 top-0 h-full w-full -z-1" />
      <image
        src="@/static/images/logo.png"
        mode="scaleToFill"
        class="mt-190rpx h-128 w-128"
      />
      <view class="mt-4 text-52 text-font-color-primary font-bold">
        海维 Uniapp 开发模版
      </view>
    </view>
    <view class="box-border overflow-hidden border-rounded-t-5 bg-white py-6 -mt-5">
      <view class="flex items-center justify-between px-6">
        <view class="text-40 text-font-color-primary font-semibold">
          用户登录
        </view>
        <!-- <view class="text-font-color-secondary text-34">
          软件设置
        </view> -->
        <wd-button type="text">
          软件设置
        </wd-button>
      </view>
      <wd-form ref="loginForm" :model="loginModel" error-type="message" class="mt-6 px-3">
        <wd-input v-model="loginModel.phone" prop="phone" label-width="120rpx" label="手机号" type="number" placeholder="请输入手机号" class="login-input my-1" :rules="[{ required: true, pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请填写手机号' }]" />
        <view class="mx-3 border-b-2 border-gray-1 border-b-solid" />
        <wd-input v-model="loginModel.code" prop="code" label-width="120rpx" label="验证码" type="number" placeholder="请输入验证码" class="login-input my-1" :rules="[{ required: true, message: '请填写验证吗' }]">
          <template #suffix>
            <view class="flex items-center">
              <wd-button type="primary" size="small" class="!h-48" @click="getCode">
                {{ tips }}
              </wd-button>
            </view>
          </template>
        </wd-input>
        <view class="mx-3 border-b-2 border-gray-1 border-b-solid" />
      </wd-form>
      <view class="my-20rpx mb-60rpx px-6 text-24rpx text-font-color-secondary">
        未注册的手机号验证后将自动注册
      </view>
      <wd-button size="large" :round="false" block type="primary" class="mt-8 !mx-6" :loading="isLogin" @click="login">
        登录
      </wd-button>
      <view class="mt-10 flex items-center justify-center text-24rpx text-font-color-secondary">
        登录代表你已同意
        <wd-button type="text" size="small" @click="toAgreement('user')">
          《用户协议》
        </wd-button>
        和
        <wd-button type="text" size="small" @click="toAgreement('privacy')">
          《隐私政策》
        </wd-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router'
import { useUserStore } from '@/store'
import to from 'await-to-js'

const userStore = useUserStore()

const loginForm = ref()
const loginModel = reactive({
  phone: '',
  code: '',
})
const isLogin = ref(false)

const tips = ref('获取验证码')
const seconds = ref(60)
const timer = ref<ReturnType<typeof setInterval>>()

let canGetCode = true
let redirect = HOME_PATH

// 获取验证码
const getCode = () => {
  if (!canGetCode) return
  if (!loginModel.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    })
    return
  }
  if (!/^1[3-9]\d{9}$/.test(loginModel.phone)) {
    uni.showToast({
      title: '手机号格式不正确',
      icon: 'none',
    })
    return
  }
  canGetCode = false
  timer.value = setInterval(() => {
    seconds.value--
    tips.value = `${seconds.value}秒后重新获取`
    if (seconds.value <= 0) {
      clearInterval(timer.value)
      tips.value = '获取验证码'
      seconds.value = 60
      canGetCode = true
    }
  }, 1000)
}

// 登录
const login = async () => {
  const { valid } = await loginForm.value.validate()
  if (!valid) return
  isLogin.value = true
  const [err] = await to(userStore.loginByCode({ phone: loginModel.phone, code: loginModel.code }))
  isLogin.value = false
  if (err) return

  setTimeout(() => {
    if (isTabBarPath(redirect)) {
      uni.switchTab({ url: redirect })
    }
    else {
      uni.redirectTo({ url: redirect })
    }
  }, 800)
}

// 查看协议
const toAgreement = (type: string) => {
  const url = type === 'user' ? 'https://www.baidu.com' : 'https://www.baidu.com'
  const title = type === 'user' ? '用户协议' : '隐私政策'
  uni.navigateTo({
    url: `/pages/common/webview/index?url=${url}&title=${title}`,
  })
}

onLoad((options: any) => {
  if (options.redirect && removeQueryString(options.redirect) !== LOGIN_PATH) {
    redirect = decodeURIComponent(options.redirect)
  }
})
</script>

<style lang="scss" scoped>
:deep(.wd-input__label) {
  @apply !pl-0;
  &::after {
    @apply hidden;
  }
}
</style>
