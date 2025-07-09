<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar safe-area-inset-top left-arrow title="颜色、标签示例" @click-left="handleBack" />
    <view class="h-full bg-white p-3 text-32">
      <view class="text-34 text-font-color-primary font-bold">
        标签：标签名的字数尽量统一
      </view>
      <view class="flex items-center py-4">
        <view class="mr-2">
          产品示例：绿色
        </view>
        <view class="tag-success">
          瓶盖
        </view>
      </view>
      <view class="flex items-center py-4">
        <view class="mr-2">
          与人相关：紫色
        </view>
        <view class="tag-info">
          供应商
        </view>
      </view>
      <view class="flex items-center py-4">
        <view class="mr-2">
          设备示例：橙色
        </view>
        <view class="tag-warning">
          模具号
        </view>
      </view>
      <view class="flex items-center py-4">
        <view class="mr-2">
          订单示例：蓝色
        </view>
        <view class="tag-primary">
          订单号
        </view>
      </view>

      <view class="mt-4 text-34 text-font-color-primary font-bold">
        状态：
      </view>
      <view class="py-4">
        <view>
          表示通过的：绿色
        </view>
        <view class="text-32 text-success font-bold">
          合格、已完成
        </view>
      </view>
      <view class="py-4">
        <view>
          表示不通过的：红色
        </view>
        <view class="text-32 text-danger font-bold">
          不合格
        </view>
      </view>
      <view class="py-4">
        <view>
          流程中的：蓝色
        </view>
        <view class="text-32 text-primary font-bold">
          进行中
        </view>
      </view>
      <view class="py-4">
        <view>
          特殊提醒：橙色
        </view>
        <view class="text-32 text-warning font-bold">
          紧急放行、让步放行
        </view>
      </view>
      <view class="py-4">
        <view>
          未进入流程：灰色
        </view>
        <view class="text-32 text-font-color-secondary font-bold">
          未开始
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
