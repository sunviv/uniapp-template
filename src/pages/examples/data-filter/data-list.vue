<template>
  <view class="h-full overflow-hidden p-3">
    <z-paging ref="pagingRef" v-model="dataList" :fixed="false" auto-show-system-loading @query="queryList">
      <view v-for="item in dataList" :key="item.id" class="mb-3 rounded-xl bg-white p-3">
        <view class="flex items-start">
          <view class="mr-2 tag-success flex-shrink-0">
            瓶盖
          </view>
          <view class="break-all text-34 text-font-color-primary font-bold">
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
            <view class="text-30 text-font-color-primary font-bold">
              物料数量
            </view>
            <view class="text-primary font-bold">
              <wd-text mode="price" :text="1000" bold type="primary" /> 万只
            </view>
          </view>
          <wd-button type="error" plain :round="false" @click="handleDelete(item)">
            删除
          </wd-button>
        </view>
      </view>
    </z-paging>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import type { ListItem } from '@/api'
import { apiList } from '@/api'
import { useMessage } from 'wot-design-uni'

const props = defineProps<Props>()

const message = useMessage()

export interface QueryParams {
  searchValue?: string;
  searchType?: string;
  category?: string;
}

interface Props {
  queryParams?: QueryParams;
}

const pagingRef = ref<ZPagingRef> ()
const dataList = ref<ListItem[]>([])

async function queryList(pageNum: number, pageSize: number) {
  console.log('[ pageNum ] >', pageNum)
  console.log('[ pageSize ] >', pageSize)
  const { list } = await apiList({ pageNum, pageSize, ...props.queryParams })
  pagingRef.value?.complete(list)
}

watch(() => props.queryParams, () => {
  console.log('[ queryParams ] >', props.queryParams)
  pagingRef.value?.reload()
}, { deep: true })

async function handleDelete(item: ListItem) {
  try {
    console.log('handleDelete:', item)
    await message.confirm({ msg: '确定要删除这条数据吗？', title: `提示` })
    // TODO: 点击确定按钮，执行删除操作
    console.log('delete confirm:', item)
    // await apiDelete(item.id)
    // TODO: 删除成功后，重新加载列表数据
    // pagingRef.value?.refresh()
  }
  catch {
    console.log('delete cancel:', item)
  }
}
</script>

<style lang="scss" scoped>
//
</style>
