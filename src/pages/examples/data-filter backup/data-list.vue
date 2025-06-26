<template>
  <view class="p-3">
    <view v-for="(_, index) in list" :key="index" class="mb-3 rounded-xl bg-white p-3">
      <view class="flex items-start">
        <view class="mr-2 mt-1 flex-shrink-0 rounded bg-[#E0F3D6] px-1 py-1 text-30 text-[#18BC37] font-bold leading-none">
          瓶盖
        </view>
        <view class="break-all text-34 text-font-color-primary font-medium">
          700ml42度今世缘大太阳(e盖)700ml42度今世缘大太阳(e盖)700ml42
        </view>
      </view>
      <view class="my-2 flex text-30 text-font-color-secondary">
        <view>物料编号：</view>
        <view>{{ 'B0014.0052.0201' }}-{{ index }}</view>
      </view>
      <view class="my-2 flex text-30 text-font-color-secondary">
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
        <wd-button type="error" plain :round="false">
          删除
        </wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps<Props>()
interface Props {
  list: any[];
}
</script>

<style lang="scss" scoped>
//
</style>
