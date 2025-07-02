<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar safe-area-inset-top left-arrow title="标签+简单条件筛选" @click-left="handleBack" />

    <wd-tabs v-model="activeTab" slidable="always" class="min-h-50 flex-1">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="item.title" :name="item.name" auto-line-width>
          <wd-sticky :z-index="0">
            <checkbox-filter v-model="filterValue" :options="filterOptions" class="mt-3 box-border -mb-1.5" @change="handleChangeFilter" />
          </wd-sticky>
          <view class="h-[calc(100vh-142px)]">
            <DataList />
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import DataList from './data-list.vue'

const tabs = ref<{ name: string; title: string }[]>([
  { name: '分类1', title: '分类1' },
  { name: '分类2', title: '分类2' },
  { name: '分类3', title: '分类3' },
  { name: '分类4', title: '分类4' },
  { name: '分类5', title: '分类5' },
  { name: '分类6', title: '分类6' },
  { name: '分类7', title: '分类7' },
  { name: '分类8', title: '分类8' },
  { name: '分类9', title: '分类9' },
  { name: '分类10', title: '分类10' },
  { name: '分类11', title: '分类11' },
  { name: '分类12', title: '分类12' },
  { name: '分类13', title: '分类13' },
  { name: '分类14', title: '分类14' },
  { name: '分类15', title: '分类15' },
])
const activeTab = ref<string>('分类1')

const filterValue = ref<(number | string)[]>([])
const filterOptions = ref<{ label: string; value: number | string }[]>([
  { label: '条件一', value: 1 },
  { label: '条件二', value: 2 },
  { label: '条件三', value: 3 },
  { label: '条件四', value: 4 },
  { label: '条件五', value: 5 },
  { label: '条件六', value: 6 },
])
function handleChangeFilter(value: number | string) {
  console.log('handleChangeFilter:', value)
}

function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:deep(.radio-filter) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    padding: 0 32rpx;
    overflow-x: auto;
    background: transparent !important;

    &::-webkit-scrollbar {
      display: none;
    }

    .wd-radio.is-button {
      flex: 1 0 auto;
      height: 72rpx;

      .wd-radio__label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 30rpx;
        font-weight: 600;
        background-color: #fff;
        border-radius: 16rpx;
      }
    }
  }
</style>
