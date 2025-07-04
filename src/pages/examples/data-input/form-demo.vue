<template>
  <view class="h-full flex flex-col overflow-hidden">
    <wd-navbar left-arrow safe-area-inset-top title="表单综合案例" class="flex-shrink-0" @click-left="handleBack" />
    <view class="h-100 flex-1 overflow-y-auto p-3">
      <wd-form ref="formRef" :model="formModel">
        <wd-cell-group border class="form-group">
          <wd-cell title="输入框示例" title-width="100%" label="详细描述详细描述详细描述详细描述" custom-title-class="form-group-title" />
          <wd-input
            v-model="formModel.inputValue"
            label="输入框"
            label-width="200rpx"
            prop="inputValue"
            clearable
            placeholder="请输入"
            :rules="[{ required: true, message: '输入框为必填项' }]"
          />
          <wd-input
            v-model="formModel.numberValue"
            type="number"
            label="数字输入框"
            label-width="200rpx"
            prop="inputValue"
            clearable
            placeholder="请输入"
            :rules="[{ required: true, message: '输入框为必填项' }]"
          />
          <wd-textarea v-model="formModel.textareaValue" label-width="200rpx" label="多行文本框" :maxlength="100" auto-height show-word-limit />
        </wd-cell-group>
        <view class="h-24" />
        <wd-cell-group border class="form-group">
          <wd-cell title="选择器示例" title-width="100%" label="详细描述详细描述详细描述详细描述" custom-title-class="form-group-title" />
          <wd-datetime-picker v-model="formModel.time" label="日期选择" label-width="200rpx" />
          <wd-datetime-picker v-model="formModel.timeRange" label="日期范围选择" label-width="200rpx" />

          <wd-picker v-model="formModel.singleColumnValue" :columns="singleColumns" label-width="200rpx" label="单列选择器" title="单列选择" clearable @confirm="handlePickerConfirm" />
          <wd-picker v-model="formModel.multiColumnValue" :columns="multiColumns" label-width="200rpx" label="多列选择器" title="多列选择" clearable :display-format="displayFormat" />
          <wd-picker
            v-model="formModel.linkColumnValue"
            :columns="linkColumns"
            label="多列联动"
            label-width="200rpx"
            :column-change="handleChangeLinkColumn"
            :display-format="displayFormat"
          />
          <wd-select-picker v-model="formModel.selectPickerValue" label="单列多选" :columns="selectPickerColumns" filterable label-width="200rpx" />
          <wd-cell title="自定义选择" title-width="200rpx" label="跳转到新页面选择" is-link custom-value-class="form-cell-value" @click="handleCustomSelect">
            <view v-if="!customSelectedLabel" class="text-font-color-placeholder">
              请选择
            </view>
            <view v-else>
              {{ customSelectedLabel }}
            </view>
          </wd-cell>
        </wd-cell-group>
        <view class="h-24" />
        <wd-cell-group border class="form-group">
          <wd-cell title="自定义键盘示例" title-width="100%" label="详细描述详细描述详细描述详细描述" custom-title-class="form-group-title" />
          <wd-cell title="身份证键盘" title-width="200rpx" is-link :value="formModel.idCardValue" custom-value-class="form-cell-value" prop="idCardValue" :rules="[{ required: true, pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/, message: '身份证号格式错误' }]" @click="showIdKeyBoard()" />
          <wd-cell title="车牌号键盘" title-width="200rpx" is-link :value="formModel.carNo" custom-value-class="form-cell-value" prop="carNo" :rules="[{ required: true, message: '车牌号为必填项' }]" @click="showCarNoKeyBoard()" />
          <wd-cell title="金额类键盘" title-width="200rpx" is-link :value="formModel.price" custom-value-class="form-cell-value" prop="price" :rules="[{ required: true, message: '金额为必填项' }]" @click="showPriceKeyBoard()" />

          <wd-keyboard v-model="formModel.idCardValue" v-model:visible="idKeyboardVisible" extra-key="X" safe-area-inset-bottom title="身份证号" close-text="完成" />
          <wd-keyboard v-model="formModel.carNo" v-model:visible="carNoKeyboardVisible" mode="car" safe-area-inset-bottom title="车牌号" close-text="完成" />
          <wd-keyboard v-model="formModel.price" v-model:visible="priceKeyboardVisible" mode="custom" :extra-key="['00', '.']" close-text="完成" safe-area-inset-bottom title="金额" />
        </wd-cell-group>
        <view class="h-24" />
        <wd-cell-group border class="form-group">
          <wd-cell title="文件上传" title-width="100%" label="详细描述详细描述详细描述详细描述" custom-title-class="form-group-title" />
          <wd-cell title="单个图片上传" title-width="200rpx" custom-value-class="form-cell-value">
            <wd-upload v-model:file-list="formModel.singleFileList" accept="image" image-mode="aspectFill" :limit="1" :action="uploadAction" :header="uploadHeader" :form-data="uploadFormData" />
          </wd-cell>
          <wd-cell title="多个图片上传" title-width="200rpx" custom-value-class="form-cell-value" vertical>
            <wd-upload v-model:file-list="formModel.multiFileList" accept="image" image-mode="aspectFill" multiple :limit="6" :action="uploadAction" :header="uploadHeader" :form-data="uploadFormData" />
          </wd-cell>
        </wd-cell-group>
        <view class="h-24" />
        <wd-cell-group border class="form-group">
          <wd-cell title="其它示例" title-width="100%" label="详细描述详细描述详细描述详细描述" custom-title-class="form-group-title" />
        </wd-cell-group>
        <view class="h-120" />
        <view class="form-actions">
          <wd-button plain :round="false" size="large" class="flex-1 !mr-3" @click="handleReset">
            重置
          </wd-button>
          <wd-button :round="false" size="large" class="flex-1" type="primary" @click="handleSubmit">
            提交
          </wd-button>
        </view>
      </wd-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { ListItem } from '@/api'
import type { ColumnItem, PickerViewColumnChange } from 'wot-design-uni/components/wd-picker-view/types'
import type { PickerDisplayFormat } from 'wot-design-uni/components/wd-picker/types'
import type { UploadFile } from 'wot-design-uni/components/wd-upload/types'
import { useRouter } from '@/hooks'
import { getApiBaseUrl, getToken, TokenPrefix } from '@/utils'
import to from 'await-to-js'
import { CustomSelectEvent } from './types'

const router = useRouter()

interface FormModel {
  inputValue: string;
  numberValue?: number;
  textareaValue: string;
  singleColumnValue: string;
  idCardValue: string;
  carNo: string;
  price?: string;
  multiColumnValue: string;
  linkColumnValue: string;
  selectPickerValue: string;
  customSelectedValue: string[];
  singleFileList: UploadFile[];
  multiFileList: UploadFile[];
  time: string;
  timeRange: string[];
}
const formRef = ref()
const formModel = ref<FormModel>({
  inputValue: '',
  numberValue: undefined,
  textareaValue: '',
  singleColumnValue: '',
  idCardValue: '',
  carNo: '',
  price: undefined,
  multiColumnValue: '',
  linkColumnValue: '',
  selectPickerValue: '',
  customSelectedValue: [],
  singleFileList: [],
  multiFileList: [],
  time: '',
  timeRange: [],
})
const customSelectedLabel = ref('')

const singleColumns = ref<Record<string, string>[]>([
  {
    label: '选项1',
    value: '1',
  },
  {
    label: '选项2',
    value: '2',
  },
  {
    label: '选项3',
    value: '3',
  },
])

const multiColumnsData = [
  [
    { label: '中山大学', value: 'zs' },
    { label: '中南大学', value: 'zn' },
    { label: '华南理工大学', value: 'hn' },
  ],
  [
    { label: '计算机科学与技术', value: '计算机科学与技术' },
    { label: '软件工程', value: '软件工程' },
    { label: '通信工程', value: '通信工程' },
    { label: '法学', value: '法学' },
    { label: '经济学', value: '经济学' },
  ],
]
const multiColumns = ref<Record<string, string>[][]>(multiColumnsData)

const linkColumnsData: Record<string, Record<string, string>[]> = {
  university: [
    { label: '中山大学', value: 'zs' },
    { label: '中南大学', value: 'zn' },
    { label: '华南理工大学', value: 'hn' },
  ],
  zs: [
    { label: '计算机科学与技术', value: '计算机科学与技术' },
    { label: '软件工程', value: '软件工程' },
    { label: '通信工程', value: '通信工程' },
  ],
  zn: [
    { label: '法学', value: '法学' },
    { label: '经济学', value: '经济学' },
  ],
  hn: [
    { label: '历史', value: '历史' },
    { label: '历史学', value: '历史学' },
  ],
}
const linkColumns = ref([linkColumnsData.university, linkColumnsData.zs])

const selectPickerColumns = ref([
  { label: '张三', value: '张三' },
  { label: '李四', value: '李四' },
  { label: '王五', value: '王五' },
  { label: '赵六', value: '赵六' },
  { label: '孙七', value: '孙七' },
  { label: '周八', value: '周八' },
  { label: '吴九', value: '吴九' },
  { label: '郑十', value: '郑十' },
  { label: '王十一', value: '王十一' },
  { label: '王十二', value: '王十二' },
  { label: '王十三', value: '王十三' },
])
const handleChangeLinkColumn: PickerViewColumnChange = (pickerView, value, columnIndex, resolve) => {
  console.log(value, columnIndex)
  const item = (value as ColumnItem[])[columnIndex] as ColumnItem
  console.log(item, '******')
  if (columnIndex === 0) {
    pickerView.setColumnData(1, linkColumnsData[item.value as string])
  }
  resolve()
}
const displayFormat: PickerDisplayFormat = (items) => {
  console.log(items)
  return items.map((item: ColumnItem) => item.label).join('-')
}

const idKeyboardVisible = ref(false)
function showIdKeyBoard() {
  idKeyboardVisible.value = true
}

const carNoKeyboardVisible = ref(false)
function showCarNoKeyBoard() {
  carNoKeyboardVisible.value = true
}

const priceKeyboardVisible = ref(false)
function showPriceKeyBoard() {
  priceKeyboardVisible.value = true
}

function handleCustomSelect() {
  console.log('[ handleCustomSelect ] >')
  router.push('/pages/examples/data-input/custom-select', {
    checkedValue: formModel.value.customSelectedValue.join(','),
  })
}

function handlePickerConfirm({ value }: { value: string }) {
  console.log(value)
}

const uploadAction = `${getApiBaseUrl()}/upload`
const uploadFormData = {
  type: 'image',
}
const uploadHeader = {
  Authorization: `${TokenPrefix}${getToken()}`,
}

async function handleSubmit() {
  console.log('[ handleSubmit ] >', formModel.value)
  const [err] = await to(formRef.value.validate())
  if (err) return
  console.log('校验成功')
  // TODO: 调用接口，提交数据
}

function handleReset() {
  formModel.value = {
    inputValue: '',
    numberValue: undefined,
    textareaValue: '',
    singleColumnValue: '',
    idCardValue: '',
    carNo: '',
    price: '',
    multiColumnValue: '',
    linkColumnValue: '',
    selectPickerValue: '',
    customSelectedValue: [],
    singleFileList: [],
    multiFileList: [],
    time: '',
    timeRange: [],
  }
}

onLoad((options) => {
  console.log('[ options ] >', options, CustomSelectEvent.confirm)
  uni.$on(CustomSelectEvent.confirm, (data) => {
    console.log('[ CustomSelectEvent.confirm ] >', data)
    formModel.value.customSelectedValue = data.map((item: ListItem) => item.id)
    if (data.length) {
      customSelectedLabel.value = `已选中(${data.length})条数据`
    }
    else {
      customSelectedLabel.value = ''
    }

    console.log(customSelectedLabel.value)
  })
  // TODO: 初始化页面数据
  singleColumns.value = [
    {
      label: '选项1',
      value: '1',
    },
    {
      label: '选项2',
      value: '2',
    },
    {
      label: '选项3',
      value: '3',
    },
  ]
  multiColumns.value = [
    [
      { label: '中山大学', value: '中山大学' },
      { label: '中南大学', value: '中南大学' },
      { label: '华南理工大学', value: '华南理工大学' },
    ],
    [
      { label: '计算机科学与技术', value: '计算机科学与技术' },
      { label: '软件工程', value: '软件工程' },
      { label: '通信工程', value: '通信工程' },
      { label: '法学', value: '法学' },
      { label: '经济学', value: '经济学' },
    ],
  ]
})

onUnload(() => {
  //
})

function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
//
</style>
