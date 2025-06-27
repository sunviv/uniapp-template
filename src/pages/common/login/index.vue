<template>
  <view class="relative box-border h-screen bg-white">
    <view class="relative h-620rpx flex flex-col items-center leading-none">
      <image src="@/static/images/login-bg.png" class="absolute left-0 top-0 z-1 h-full w-full" />
      <image
        src="@/static/images/logo.png"
        mode="scaleToFill"
        class="relative z-2 mt-190rpx h-128 w-128"
      />
      <view class="relative z-2 mt-4 text-52 text-font-color-primary font-bold">
        海维 Uniapp 开发模版
      </view>
    </view>
    <view class="relative z-2 box-border overflow-hidden border-rounded-t-5 py-6 -mt-5 !bg-white">
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
        <wd-input v-model="loginModel.username" prop="username" label-width="120rpx" label="用户名" type="number" clearable placeholder="请输入用户名" class="my-1" :rules="[{ required: true, message: '请填写用户名' }]" />
        <view class="mx-3 border-b-2 border-gray-1 border-b-solid" />
        <wd-input v-model="loginModel.password" prop="password" label-width="120rpx" label="密码" type="text" clearable show-password placeholder="请输入密码" class="login-input my-1" :rules="[{ required: true, message: '请填写密码' }]" />
        <view class="mx-3 border-b-2 border-gray-1 border-b-solid" />
      </wd-form>
      <wd-button size="large" :round="false" block type="primary" class="mt-10 !mx-6" :loading="isLogin" @click="login">
        登录
      </wd-button>
      <wd-checkbox v-model="userStore.rememberPwd" true-value="Y" false-value="N" class="ml-6 mt-5">
        记住密码
      </wd-checkbox>

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
import storage from '@/utils/storage'
import to from 'await-to-js'

const userStore = useUserStore()

const loginForm = ref()
const loginModel = reactive({
  username: storage.get('username') || '',
  password: storage.get('password') || '',
})
const isLogin = ref(false)

let redirect = HOME_PATH

// 登录
const login = async () => {
  const { valid } = await loginForm.value.validate()
  if (!valid) return
  isLogin.value = true
  const [err] = await to(userStore.loginByPwd({ username: loginModel.username, password: loginModel.password }))
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
