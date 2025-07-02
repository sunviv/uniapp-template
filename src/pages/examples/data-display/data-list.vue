<template>
  <z-paging ref="pagingRef" v-model="dataList" :fixed="false" auto-show-system-loading auto-show-back-to-top @query="queryList">
    <template #top>
      <wd-navbar safe-area-inset-top left-arrow title="自定义选择" @click-left="handleBack" />
      <wd-search v-model="searchValue" hide-cancel placeholder-left class="flex-shrink-0 px-2" />
    </template>
    <view>
      <view v-for="item in dataList" :key="item.id" class="m-3 rounded-xl bg-white p-3">
        <view class="flex items-start">
          <view class="mr-2 flex-shrink-0 tag-primary">
            瓶盖
          </view>
          <view class="break-all text-34 text-font-color-primary font-medium">
            {{ item.productName }}
          </view>
        </view>
        <view class="my-2 flex items-center">
          <view class="mr-2 flex-shrink-0 tag-warning">
            物料
          </view>
          <view class="text-34 text-font-color-primary font-medium">
            B0144.10009
          </view>
          <view class="ml-auto rounded bg-placeholder px-1.5 py-1 text-28 text-font-color-secondary">
            2401-HA02
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

        <view class="my-2 flex flex-1 items-center justify-between rounded-lg bg-placeholder px-3 py-2">
          <view class="text-30 text-font-color-primary font-medium">
            物料数量
          </view>
          <view class="text-primary">
            {{ 1000 }} 万只
          </view>
        </view>
        <view class="flex flex-1 items-center justify-between rounded-lg bg-placeholder px-3 py-2">
          <view class="flex flex-1 flex-col items-center justify-center">
            <view class="text-30 text-font-color-primary font-medium">
              {{ 123.45 }}万只
            </view>
            <view class="text-28 text-font-color-secondary">
              计划数量
            </view>
          </view>
          <view class="flex flex-1 flex-col items-center justify-center">
            <view class="text-30 text-font-color-primary font-medium">
              {{ 123.45 }}万只
            </view>
            <view class="text-28 text-font-color-secondary">
              已完成数量
            </view>
          </view>
          <view class="flex flex-1 flex-col items-center justify-center">
            <view class="text-30 text-font-color-primary font-medium">
              {{ 123.45 }}万只
            </view>
            <view class="text-28 text-font-color-secondary">
              本次数量
            </view>
          </view>
        </view>

        <view class="mt-3 flex items-center justify-end">
          <wd-button type="info" :round="false" plain class="!mr-3" @click="handleConfirm(item)">
            操作一
          </wd-button>
          <wd-button :round="false" plain class="!mr-3" @click="handleOperation(item)">
            操作二
          </wd-button>
        </view>
      </view>
    </view>
    <wd-message-box />
    <wd-message-box selector="success">
      <image
        src="@/static/images/icon-success.png"
        mode="scaleToFill"
        class="h-108 w-108"
      />
      <view class="text-center text-40 text-font-color-primary font-medium">
        {{ currentConfirmTitle }}
      </view>
      <view class="mt-2 text-center text-font-color-normal">
        {{ currentConfirmMsg }}
      </view>
    </wd-message-box>
  </z-paging>
</template>

<script lang="ts" setup>
import type { ListItem } from '@/api'
import { apiList } from '@/api'
import { useRouter } from '@/hooks'
import { useMessage } from 'wot-design-uni'

const message = useMessage()
const customMessage = useMessage('success')
const router = useRouter()

const pagingRef = ref<ZPagingRef> ()
const dataList = ref<ListItem[]>([])
const searchValue = ref('')

watch(() => searchValue.value, () => {
  pagingRef.value?.reload()
})
async function queryList(pageNo: number, pageSize: number) {
  console.log('[ pageNo ] >', pageNo)
  console.log('[ pageSize ] >', pageSize)
  const { list } = await apiList({ page: pageNo, pageSize, searchValue: searchValue.value })
  pagingRef.value?.complete(list)
}

async function handleOperation(item: ListItem) {
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

const currentConfirmTitle = ref('绑定成功，已绑定模芯')
const currentConfirmMsg = ref('')
async function handleConfirm(item: ListItem) {
  try {
    console.log('handleDelete:', item)
    currentConfirmMsg.value = item.productName
    await customMessage.alert({})
  }
  catch {
    console.log('delete cancel:', item)
  }
}

onLoad((options) => {
  console.log('[ options ] >', options)
})

function handleBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
//
</style>
