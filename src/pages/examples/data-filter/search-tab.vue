<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar left-arrow safe-area-inset-top title="搜索+标签" @click-left="handleBack" />
    <wd-search v-model="searchValue" hide-cancel placeholder-left class="flex-shrink-0 px-2" @search="handleSearch">
      <template #prefix>
        <wd-popover mode="menu" :content="searchTypeMenu" @menuclick="changeSearchType">
          <view class="search-type">
            <text>{{ searchType }}</text>
            <wd-icon custom-class="icon-arrow" name="fill-arrow-down" />
          </view>
        </wd-popover>
      </template>
    </wd-search>
    <wd-tabs v-model="activeTab" slidable="always" class="min-h-50 flex-1" @change="handleChangeTab">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="item.title" :name="item.name" auto-line-width>
          <view class="h-[calc(100vh-148px)]">
            <DataList v-if="item.name === activeTab" :query-params="queryParams" />
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import type { PopoverProps } from 'wot-design-uni/components/wd-popover/types'
import DataList, { type QueryParams } from './data-list.vue'

const queryParams = reactive<QueryParams>({
  searchType: 'all',
  searchValue: '',
  category: '分类1',
})

const searchType = ref<string>('全部')
const searchValue = ref<string>('')
const searchTypeMenu = ref<PopoverProps['content']>([
  {
    value: 'all',
    content: '全部',
  },
  {
    value: 'order',
    content: '订单号',
  },
  {
    value: 'refund',
    content: '退款单号',
  },
])
function handleSearch() {
  queryParams.searchValue = searchValue.value
}

function changeSearchType({ item }: { item: { content: string; value: string }; index: number }) {
  searchType.value = item.content
  queryParams.searchType = item.value
}

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
function handleChangeTab({ name }: { name: string }) {
  console.log('*************')
  queryParams.category = name
}

function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.search-type {
  @apply relative h-60 leading-none px-4 text-font-color-normal text-sm flex items-center;
}
.search-type::after {
  content: '';
  @apply absolute w-1px right-0 top-10 bottom-10 bg-font-color-placeholder;
}
.search-type {
  :deep(.icon-arrow) {
    @apply inline-block text-xl;
  }
}
</style>
