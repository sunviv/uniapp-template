<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar left-arrow safe-area-inset-top title="扫码示例" @click-left="handleBack" />
    <wd-cell-group border>
      <!-- <wd-cell title-width="240rpx" title="箱码"> -->
      <wd-input v-model="xCode" label="箱码" label-width="240rpx" clearable placeholder="请扫描或输入箱码" placeholder-class="text-font-color-placeholder" align-right :focus="xCodeFocus" @focus="xCodeFocus = true" @blur="xCodeFocus = false" />
      <!-- </wd-cell> -->
      <!-- <wd-cell title-width="240rpx" title="盒码"> -->
      <wd-input v-model="hCode" label="盒码" label-width="240rpx" clearable placeholder="请扫描或输入盒码" placeholder-class="text-font-color-placeholder" align-right :focus="hCodeFocus" @focus="hCodeFocus = true" @blur="hCodeFocus = false" />
      <!-- </wd-cell> -->
      <wd-cell title-width="240rpx" title="摄像头扫码" is-link :value="scanCodeValue" @click="handleScan" />
      <wd-cell title-width="240rpx" title="连续扫码示例" is-link @click="navigateTo('/pages/examples/data-input/continuous-scan')" />
    </wd-cell-group>
    <BroadcastScan />
  </view>
</template>

<script lang="ts" setup>
import { BroadcastScanEvent } from '@/components/BroadcastScan'

const xCodeFocus = ref(true)
const hCodeFocus = ref(false)
// 箱码
const xCode = ref('')
// 盒码
const hCode = ref('')
// 摄像头扫码值
const scanCodeValue = ref('')

onShow(() => {
  uni.$on(BroadcastScanEvent, (code) => {
    console.log('scan:', code)
    if (xCodeFocus.value) {
      xCode.value = code
      xCodeFocus.value = false
      hCodeFocus.value = true
    }
    else if (hCodeFocus.value) {
      hCode.value = code
    }
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

function navigateTo(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<style lang="scss" scoped>
//
</style>
