<template>
  <view class="h-full flex flex-col">
    <wd-navbar safe-area-inset-top left-arrow title="多选列表" @click-left="handleBack" />
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
