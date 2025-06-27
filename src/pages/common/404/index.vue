<template>
  <view class="min-h-screen flex flex-col bg-white">
    <wd-navbar left-arrow @click-left="handleBack" />
    <wd-status-tip image="/static/images/404.png" tip="页面不存在" image-size="380" />
  </view>
</template>

<script setup lang="ts">
import { useRouter } from '@/hooks'
// import { HOME_PATH } from '@/router'

const router = useRouter()
function handleBack() {
  router.back()
  // uni.switchTab({ url: HOME_PATH })
}
</script>
