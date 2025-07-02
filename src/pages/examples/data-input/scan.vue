<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar left-arrow safe-area-inset-top title="显式条件筛选" @click-left="handleBack" />
    <wd-cell-group border>
      <wd-cell title-width="240rpx" title="PDA 扫码">
        <wd-input v-model="broadcastCodeValue" placeholder="请扫描箱码" placeholder-class="text-font-color-placeholder" no-border readonly align-right />
      </wd-cell>
      <wd-cell title-width="240rpx" title="PDA 扫码(可输入)">
        <wd-input v-model="inputCodeValue" placeholder="请扫描或输入盒码" placeholder-class="text-font-color-placeholder" no-border align-right />
      </wd-cell>
      <wd-cell title-width="240rpx" title="摄像头扫码" is-link :value="scanCodeValue" @click="handleScan" />
    </wd-cell-group>
    <BroadcastScan />
  </view>
</template>

<script lang="ts" setup>
import { BroadcastScanEvent } from '@/components/BroadcastScan'

const broadcastCodeValue = ref('')
const inputCodeValue = ref('')
const scanCodeValue = ref('')

onShow(() => {
  uni.$on(BroadcastScanEvent, (code) => {
    console.log('scan:', code)
    broadcastCodeValue.value = code
  })
})

onHide(() => {
  uni.$off(BroadcastScanEvent)
})

onUnload(() => {
  uni.$off(BroadcastScanEvent)
})
function handleScan() {
  // 扫码
  uni.scanCode({
    success(res) {
      console.log(res)
      scanCodeValue.value = res.result
    },
  })
}
function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
