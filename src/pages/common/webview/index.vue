<template>
  <web-view class="h-full" :src="url" />
</template>

<script setup lang="ts">
const url = ref<string>('')

onLoad((options: any) => {
  console.log('options', options)
  if (options.url)
    url.value = decodeURIComponent(options.url)
  if (options.title) {
    uni.setNavigationBarTitle({
      title: options.title,
    })
  }
})
</script>
