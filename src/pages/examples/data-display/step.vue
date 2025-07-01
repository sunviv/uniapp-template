<template>
  <view class="h-screen flex flex-col overflow-hidden">
    <wd-navbar safe-area-inset-top left-arrow title="步骤条" @click-left="handleBack" />
    <view class="flex-1 overflow-y-auto p-3">
      <wd-steps vertical custom-class="card-steps">
        <wd-step v-for="(item, index) in steps" :key="index" :status="item.status">
          <template #title>
            <view class="p-3">
              <view class="flex items-center justify-between text-34rpx">
                <view class="text-34 text-font-color-primary font-medium">
                  第{{ index + 1 }}步
                </view>
                <view :class="{ 'text-success': item.status === 'finished', 'text-error': item.status === 'error', 'text-primary': item.status === 'process' }">
                  {{ item.statusText }}
                </view>
              </view>
              <view class="h-2" />
              <view class="my-1 text-30 text-font-color-normal">
                标签码：JGKK01
              </view>
              <view class="my-1 text-30 text-font-color-normal">
                巡检点：激光雕刻机1#
              </view>
            </view>
          </template>
        </wd-step>
      </wd-steps>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { StepStatus } from 'wot-design-uni/components/wd-step/types'

const steps = ref<{ status?: StepStatus; statusText: string }[]>([
  {
    status: 'process',
    statusText: '检查中',
  },
  {
    status: 'finished',
    statusText: '已检查',
  },
  {
    status: 'error',
    statusText: '检查失败',
  },
  {
    statusText: '未检查',
  },
])

function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
