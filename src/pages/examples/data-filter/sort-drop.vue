<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar safe-area-inset-top left-arrow title="搜索+下拉条件" @click-left="handleBack" />
    <wd-search v-model="searchValue" hide-cancel placeholder-left class="flex-shrink-0 px-2" @search="handleSearch" />
    <view class="flex flex-nowrap justify-between bg-white px-4">
      <view class="w-140 flex-shrink-0" @click="closeOutside">
        <wd-sort-button v-model="sort.price" title="价格" allow-reset :line="true" />
      </view>
      <view class="w-140 flex-shrink-0" @click="closeOutside">
        <wd-sort-button v-model="sort.rating" title="评价" allow-reset :line="true" />
      </view>

      <wd-drop-menu class="ml-auto max-w-360">
        <wd-drop-menu-item v-model="simpleFilterValue" icon-size="40rpx" icon="filter" :options="simpleOptions" @change="handleFilterChange" />
      </wd-drop-menu>
    </view>
    <view class="flex flex-nowrap justify-between bg-white px-4">
      <view class="w-140 flex-shrink-0" @click="closeOutside">
        <wd-sort-button v-model="sort.price" title="价格" allow-reset :line="true" />
      </view>
      <view class="w-140 flex-shrink-0" @click="closeOutside">
        <wd-sort-button v-model="sort.rating" title="评价" allow-reset :line="true" />
      </view>

      <wd-drop-menu class="ml-auto max-w-360">
        <wd-drop-menu-item ref="dropMenu" v-model="simpleFilterValue" title="自定义筛选" icon-size="40rpx" icon="filter" custom-popup-class="flex flex-col !max-h-90%" @opened="handleDropMenuOpened">
          <view class="flex-1 overflow-y-auto p-4">
            <view class="text-base text-font-color-primary font-bold">
              单选
            </view>
            <wd-radio-group v-model="singleFilterValue" cell shape="button" class="mt-2 flex flex-wrap">
              <wd-radio v-for="item in singleFilterOptions" :key="item.value" :value="item.value" class="filter-radio">
                {{ item.label }}
              </wd-radio>
            </wd-radio-group>
            <view class="mt-2 text-base text-font-color-primary font-bold">
              多选
            </view>
            <wd-checkbox-group v-model="multipleFilterValue" cell shape="button" class="mt-2 flex flex-wrap">
              <wd-checkbox v-for="item in multipleFilterOptions" :key="item.value" :model-value="item.value" class="filter-checkbox">
                {{ item.label }}
              </wd-checkbox>
            </wd-checkbox-group>
          </view>
          <view class="shadow-footer h-120 flex flex-shrink-0 items-center justify-center px-6">
            <wd-button :round="false" size="large" plain class="flex-1 !mr-3" @click="handleReset">
              重置
            </wd-button>
            <wd-button :round="false" size="large" type="primary" class="flex-1" @click="handleConfirm">
              确定
            </wd-button>
          </view>
        </wd-drop-menu-item>
      </wd-drop-menu>
    </view>
    <DataList class="h-[calc(100vh-196px)] flex-1" />
  </view>
</template>

<script lang="ts" setup>
import { useQueue } from 'wot-design-uni'
import DataList from './data-list.vue'

const { closeOutside } = useQueue()

const searchValue = ref<string>('')
function handleSearch() {
  console.log(searchValue.value)
}

const sort = reactive<{ price: number; rating: number }>({ price: 0, rating: 0 })
const simpleFilterValue = ref<number>(0)

const simpleOptions = ref<Record<string, number | string>[]>([
  { label: '全部', value: 0 },
  { label: '条件一', value: 1 },
  { label: '条件二', value: 2 },
  { label: '这是比较长的筛选条件这是比较长的筛选条件', value: 3 },
])
function handleFilterChange({ value }: { value: number }) {
  console.log(value)
}

const dropMenu = ref()
const singleFilterOptions = ref<Record<string, string>[]>([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '选项六', value: '6' },
  { label: '这是比较长的筛选条件这是比较长的筛选条件这是比较长的筛选条件这是比较长的筛选条件', value: '7-1' },
  { label: '选项七', value: '7' },
  { label: '选项八', value: '8' },
  { label: '选项九', value: '9' },
])
const multipleFilterOptions = ref<Record<string, string>[]>([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
  { label: '选项六', value: '6' },
  { label: '这是比较长的筛选条件这是比较长的筛选条件', value: '7-1' },
  { label: '选项七', value: '7' },
  { label: '选项八', value: '8' },
  { label: '选项九', value: '9' },
])
const singleFilterValue = ref<string>('')
const multipleFilterValue = ref<string[]>([])
function handleDropMenuOpened() {
  console.log('handleDropMenuOpened')
}
function handleConfirm() {
  console.log('handleConfirm:', singleFilterValue.value, multipleFilterValue.value)
  // TODO:
  dropMenu.value.close()
}
function handleReset() {
  singleFilterValue.value = ''
  multipleFilterValue.value = []
  dropMenu.value.close()
}
function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
