<template>
  <view class="relative box-border h-screen">
    <view class="relative h-620rpx flex flex-col items-center leading-none">
      <image src="@/static/images/login-bg.png" class="absolute left-0 top-0 z-1 h-full w-full" />
      <image
        src="@/static/images/avatar-default.png"
        mode="scaleToFill"
        class="relative z-2 mt-150rpx h-144 w-144 rounded-full"
      />
      <view class="relative z-2 mt-4 text-38 text-font-color-primary font-bold">
        {{ '烟台管理员' }}
      </view>
    </view>
    <wd-cell-group border class="form-group relative z-1 !mx-3 -mt-15">
      <wd-cell title="系统版本号" title-width="200rpx" :value="app.systemInfo.appVersion" />
      <wd-cell title="个人资料" title-width="200rpx" is-link />
      <wd-cell title="修改密码" title-width="200rpx" is-link />
    </wd-cell-group>

    <wd-button block :round="false" size="large" class="mt-3 !mx-3 !bg-white !text-font-color-primary" @click="handleLogout">
      退出登录
    </wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { usePermission, useRouter } from '@/hooks'
import { useAppStore } from '@/store'
import { clearToken } from '@/utils'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const router = useRouter()
const app = useAppStore()
app.initSystemInfo()
console.log(app.systemInfo)

async function handleLogout() {
  await message.confirm({ title: `确定要退出登录吗？` })
  clearToken()
  router.replace('/pages/common/login/index')
}

onShow(() => {
  usePermission()
})
</script>

<style lang="scss" scoped>
//
</style>
