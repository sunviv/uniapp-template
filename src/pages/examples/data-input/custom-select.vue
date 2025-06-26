<template>
  <z-paging ref="pagingRef" v-model="dataList" :fixed="false" auto-show-system-loading @query="queryList">
    <template #top>
      <wd-navbar left-arrow safe-area-inset-top title="自定义选择" @click-left="handleBack" />
      <wd-search v-model="searchValue" hide-cancel placeholder-left class="flex-shrink-0 px-2" />
    </template>
    <wd-checkbox-group v-model="checkedValue" class="!bg-transparent">
      <view v-for="item in dataList" :key="item.id" class="m-3 flex items-center rounded-xl bg-white p-3">
        <wd-checkbox :model-value="item.id" class="mr-2" />
        <view class="flex-1" @click="handleCheckItem(item)">
          <view class="flex items-start">
            <view class="mr-2 flex-shrink-0 rounded bg-[#E0F3D6] px-1 py-1 text-30 text-[#18BC37] font-bold leading-none">
              瓶盖
            </view>
            <view class="break-all text-34 text-font-color-primary font-medium">
              {{ item.productName }}
            </view>
          </view>
          <view class="my-2 flex text-30 text-font-color-secondary leading-tight">
            <view>物料编号：</view>
            <view>{{ 'B0014.0052.0201' }}</view>
          </view>
          <view class="my-2 flex text-30 text-font-color-secondary leading-tight">
            <view>箱码：</view>
            <view>{{ 'YT00418082' }}</view>
          </view>
          <view class="mt-2 flex items-center text-30 text-font-color-secondary">
            <view class="mr-3 flex flex-1 items-center justify-between rounded-lg bg-placeholder px-3 py-2">
              <view class="text-30 text-font-color-primary">
                物料数量
              </view>
              <view class="text-primary">
                {{ 1000 }} 万只
              </view>
            </view>
          </view>
        </view>
      </view>
    </wd-checkbox-group>
    <template #bottom>
      <view class="form-actions !relative">
        <wd-button plain :round="false" class="flex-1 !mr-3" @click="handleReset">
          重置
        </wd-button>
        <wd-button type="primary" :round="false" class="flex-1" @click="handleConfirm">
          确定
        </wd-button>
      </view>
    </template>
  </z-paging>
</template>

<script lang="ts" setup>
import type { ListItem } from '@/api'
import { apiList } from '@/api'
import { useRouter } from '@/hooks'
import { CustomSelectEvent } from './types'

const router = useRouter()

const pagingRef = ref<ZPagingRef> ()
const dataList = ref<ListItem[]>([])
const searchValue = ref('')
const checkedValue = ref<string[]>([])
const checkedItems = ref<ListItem[]>([])

watch(() => searchValue.value, () => {
  pagingRef.value?.reload()
})
async function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo)
  console.log('[ pageSize ] >', pageSize)
  const { list } = await apiList({ page: pageNo, pageSize, searchValue: searchValue.value })
  pagingRef.value?.complete(list)
}

function handleCheckItem(item: ListItem) {
  const index = checkedValue.value.indexOf(item.id as string)
  if (index > -1) {
    checkedValue.value.splice(index, 1)
    checkedItems.value.splice(index, 1)
    return
  }
  checkedValue.value.push(item.id as string)
  checkedItems.value.push(item)
}

function handleConfirm() {
  console.log('handleConfirm:', checkedItems.value)
  checkedItems.value = dataList.value.filter(item => checkedValue.value.includes(item.id as string))
  router.back(1, {
    success: () => {
      uni.$emit(CustomSelectEvent.confirm, checkedItems.value)
    },
  })
}

function handleReset() {
  checkedValue.value = []
}

function handleBack() {
  router.back()
}

onLoad((options) => {
  console.log('[ options ] >', options)
  checkedValue.value = options?.checkedValue?.split(',') || []
})
</script>

<style lang="scss" scoped>
//
</style>
