<template>
  <z-paging ref="pagingRef" v-model="dataList" class="h-full flex flex-col" @query="queryList">
    <template #top>
      <wd-navbar left-arrow title="搜索+标签" @click-left="handleBack" />
      <wd-search v-model="searchValue" hide-cancel placeholder-left class="flex-shrink-0 px-2">
        <template #prefix>
          <wd-popover mode="menu" :content="searchTypeMenu" @menuclick="changeSearchType">
            <view class="search-type">
              <text>{{ searchType }}</text>
              <wd-icon custom-class="icon-arrow" name="fill-arrow-down" />
            </view>
          </wd-popover>
        </template>
      </wd-search>
    </template>
    <wd-tabs v-model="activeTab" :offset-top="50" sticky slidable="always">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="item" :name="item" auto-line-width>
          <view class="h-full">
            <DataList :list="dataList" />
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
  </z-paging>
</template>

<script lang="ts" setup>
import type { PopoverProps } from 'wot-design-uni/components/wd-popover/types'
import DataList from './data-list.vue'

const pagingRef = ref<ZPagingRef> ()
const dataList = ref<string[]>([])
function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo)
  console.log('[ pageSize ] >', pageSize)
  setTimeout(() => {
    const list = []
    for (let i = 0; i < 30; i++)
      list.push(i)
    pagingRef.value?.complete(list)
  }, 2000)
}

const searchType = ref<string>('全部')
const searchValue = ref<string>('')
const searchTypeMenu = ref<PopoverProps['content']>([
  {
    content: '全部',
  },
  {
    content: '订单号',
  },
  {
    content: '退款单号',
  },
])
function changeSearchType({ item }: { item: { content: string }; index: number }) {
  searchType.value = item.content
}

const tabs = ref<string[]>(['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7', '分类8', '分类9', '分类10', '分类11', '分类12', '分类13', '分类14', '分类15'])
const activeTab = ref<string>('分类1')

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
