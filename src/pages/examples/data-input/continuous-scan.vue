<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar left-arrow safe-area-inset-top title="连续扫码示例" @click-left="handleBack" />
    <view v-if="codes.length === 0" class="flex flex-1 flex-col items-center justify-center">
      <wd-status-tip image="content" tip="请扫描盒码">
        <template #image>
          <view class="i-mdi:qrcode-scan text-200 text-gray-4" />
        </template>
      </wd-status-tip>
    </view>
    <view v-else class="flex flex-1 flex-col overflow-y-auto">
      <wd-swipe-action v-for="code in codes" :key="code">
        <view class="mb-2rpx bg-white px-3 py-4 text-32 text-font-color-primary">
          {{ code }}
        </view>
        <template #right>
          <view class="h-full">
            <view class="h-full flex items-center justify-center bg-danger px-3 text-32 text-white" @click="handleDelete(code)">
              删除
            </view>
          </view>
        </template>
      </wd-swipe-action>
    </view>
    <view class="form-actions">
      <view class="flex-1 text-font-color-primary">
        已扫描：{{ codes.length }}
      </view>
      <view class="ml-auto">
        <wd-button :round="false" plain size="large" class="!mr-3 !w-50">
          暂存
        </wd-button>
        <wd-button :round="false" size="large" type="primary" class="!mr-0 !w-50">
          提交
        </wd-button>
      </view>
    </view>
    <BroadcastScan />
  </view>
</template>

<script lang="ts" setup>
import { BroadcastScanEvent } from '@/components/BroadcastScan'

const codes = ref<string[]>([])

onShow(() => {
  uni.$on(BroadcastScanEvent, (code) => {
    console.log('scan:', code)
    if (codes.value.includes(code)) {
      uni.showToast({
        title: '改码已存在，请勿重复扫描',
        icon: 'none',
      })
      return
    }
    codes.value.push(code)
  })
})

onHide(() => {
  uni.$off(BroadcastScanEvent)
})

onUnload(() => {
  uni.$off(BroadcastScanEvent)
})

function handleDelete(code: string) {
  codes.value = codes.value.filter(item => item !== code)
}
function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
