<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar left-arrow safe-area-inset-top title="显式条件筛选" @click-left="handleBack" />
    <wd-cell-group border>
      <wd-cell title-width="200rpx" title="箱码">
        <view class="text-30 text-font-color-placeholder">
          请扫描箱码
        </view>
      </wd-cell>
      <wd-cell title-width="200rpx" title="盒码">
        <view class="text-30 text-font-color-placeholder">
          请扫描盒码
        </view>
      </wd-cell>
      <wd-cell title-width="200rpx" title="输入框">
        <wd-input placeholder="请输入内容" placeholder-class="text-font-color-placeholder" no-border align-right />
      </wd-cell>
      <wd-picker v-model="singleColumnValue" label="简单列表选择" align-right clearable :columns="singleColumns" />
      <wd-datetime-picker v-model="dateRange" label-width="200rpx" type="date" label="日期选择" @confirm="handleConfirm" />
    </wd-cell-group>
    <view class="hairline" />
    <view class="flex flex-shrink-0 items-center justify-center bg-white px-4 py-2">
      <wd-button :round="false" plain block class="flex-1 !mr-3" @click="handleReset">
        重置
      </wd-button>
      <wd-button :round="false" block type="primary" class="flex-1" @click="handleConfirm">
        确定
      </wd-button>
    </view>
    <DataList class="h-[calc(100vh-148px)] flex-1" />
  </view>
</template>

<script lang="ts" setup>
import DataList from './data-list.vue'

const singleColumns = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
  {
    label: '选项四',
    value: '4',
  },
  {
    label: '选项五',
    value: '5',
  },
]
const singleColumnValue = ref('')
const dateRange = ref<[string | number, string | number]>([Date.now(), Date.now()])
function handleReset() {
  //
}

function handleConfirm() {
  //
}

function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
