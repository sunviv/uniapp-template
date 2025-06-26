<template>
  <view class="checkbox-filter">
    <wd-checkbox-group v-model="modelValue" shape="button" @change="handleChangeFilter">
      <wd-checkbox v-for="filterItem in options" :id="`filterItem${filterItem.value}`" :key="filterItem.value" :model-value="filterItem.value" class="flex-1 flex-shrink-0" @click="handleClickFilterItem(`filterItem${filterItem.value}`)">
        {{ filterItem.label }}
      </wd-checkbox>
    </wd-checkbox-group>
  </view>
</template>

<script lang="ts" setup>
export interface checkboxFilterOption {
  label: string;
  value: string | number;
}

export interface Props {
  options: checkboxFilterOption[];
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'change', value: string | number): void;
}>()
const modelValue = defineModel<(string | number)[]>('value')
function handleClickFilterItem(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
}

function handleChangeFilter({ value }: { value: string | number }) {
  emits('change', value)
}
</script>

<style lang="scss" scoped>
.checkbox-filter {
  --wot-checkbox-button-font-size: 30rpx;
  --wot-checkbox-button-height: 72rpx;
  --wot-checkbox-button-border: #fff;
  --wot-checkbox-button-bg: #fff;
  --wot-checkbox-button-radius: 16rpx;

  width: 100vw;
  background: transparent;
  display: flex;
  &::before, &::after {
    content: '';
    width: 24rpx;
  }

  .wd-checkbox-group {
    &::-webkit-scrollbar {
      display: none;
    }
    width: 600rpx;
    overflow-x: auto;
    flex: 1 0 600rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    .wd-checkbox.is-button {
      flex: 1 0 auto;
      height: 72rpx;
      padding: 0;

      .wd-checkbox__label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 16rpx;
        .wd-checkbox__txt {
          font-size: 30rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
