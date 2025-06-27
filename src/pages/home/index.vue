<template>
  <view class="h-full flex flex-col items-center justify-center">
    <view class="text-center text-60 font-bold">
      <text>Home Page</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { usePermission } from '@/hooks'

usePermission()
</script>

<style lang="scss" scoped>
//
</style>
