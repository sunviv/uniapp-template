<template>
  <view class="h-full">
    <view class="bg-white px-4 py-6">
      <view class="text-center text-xl text-font-color-primary font-bold">
        uniapp-template@1.0.0
      </view>
      <view class="mt-4 text-font-color-primary">
        Uniapp 开发模版，兼容 App、H5、小程序
      </view>
    </view>
    <wd-collapse v-model="collapseItemValues" class="mx-3 mt-2 !bg-transparent">
      <wd-collapse-item title="数据查询筛选" name="dataFilter" class="collapse-item" custom-body-class="collapse-item-body">
        <wd-cell-group border>
          <wd-cell title="搜素+标签页+分页" is-link @click="navigateTo('/pages/examples/data-filter/search-tab')" />
          <wd-cell title="标签页+简单条件筛选" is-link @click="navigateTo('/pages/examples/data-filter/tab-filter')" />
          <wd-cell title="排序+下拉条件" is-link @click="navigateTo('/pages/examples/data-filter/sort-drop')" />
          <wd-cell title="显式条件筛选" is-link @click="navigateTo('/pages/examples/data-filter/explicit-filter')" />
        </wd-cell-group>
      </wd-collapse-item>
      <div class="h-16 bg-placeholder" />
      <wd-collapse-item title="数据展示" name="dataDisplay" class="collapse-item" custom-body-class="collapse-item-body">
        <wd-cell-group border>
          <wd-cell title="列表+普通分页" is-link @click="navigateTo('/pages/examples/data-display/data-list')" />
          <wd-cell title="步骤条" is-link @click="navigateTo('/pages/examples/data-display/step')" />
        </wd-cell-group>
      </wd-collapse-item>
      <div class="h-16 bg-placeholder" />
      <wd-collapse-item title="数据录入" name="dataInput" class="collapse-item" custom-body-class="collapse-item-body">
        <wd-cell-group border>
          <wd-cell title="表单综合案例" is-link @click="navigateTo('/pages/examples/data-input/form-demo')" />
        </wd-cell-group>
      </wd-collapse-item>
    </wd-collapse>
    <div class="h-120" />
  </view>
</template>

<script lang="ts" setup>
import { usePermission } from '@/hooks'

const collapseItemValues = ref<string[]>(['dataFilter', 'dataDisplay', 'dataInput'])

onLoad(() => {

})

onShow(() => {
  usePermission()
})

function navigateTo(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<style lang="scss" scoped>
.collapse-item {
  @apply overflow-hidden rounded-xl bg-white;
}
:deep(.collapse-item-body) {
  @apply p-0 pl-2;
}
</style>
