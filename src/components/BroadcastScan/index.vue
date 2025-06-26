<template>
  <view />
</template>

<script setup>
import {
  onHide,
  onShow,
  onUnload,
} from '@dcloudio/uni-app'
import {
  BroadcastAction,
  BroadcastDataLabel,
  BroadcastScanEvent,
} from './config'

let mainActivity, receiver, filter
let isScan = false

function initScan() {
  mainActivity = plus.android.runtimeMainActivity()
  const IntentFilter = plus.android.importClass('android.content.IntentFilter')
  filter = new IntentFilter()
  // 广播动作
  filter.addAction(BroadcastAction)
  receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
    onReceive: (context, intent) => {
      plus.android.importClass(intent)
      // 广播数据标签
      const code = intent.getStringExtra(BroadcastDataLabel)
      console.log('onReceive', code)
      queryCode(code)
    },
  })
};

// 启动扫描操作,将之前创建的广播接收器（receiver）注册到活动中,以便接收指定广播动作的结果
// filter 用于过滤广播消息，只有匹配过滤器中指定的广播动作的消息才会被接收和处理
const startScan = () => {
  mainActivity.registerReceiver(receiver, filter)
}

// 停止扫描操作,将之前注册的广播接收器（receiver）从活动中注销,以停止接收扫描结果的广播
const stopScan = () => {
  mainActivity.unregisterReceiver(receiver)
}

function queryCode(code) {
  if (isScan) return
  isScan = true
  setTimeout(() => {
    isScan = false
  }, 150)
  uni.$emit(BroadcastScanEvent, code)
};

onShow(() => {
  initScan()
  startScan()
})

onUnload(() => {
  stopScan()
})

onHide(() => {
  stopScan()
})
</script>

<style>

</style>
