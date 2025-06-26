import { exec } from 'node:child_process'

// 定义要执行的命令
const dependencies = [
  '@dcloudio/uni-app-harmony',
  // TODO: 如果需要某个平台的小程序，请手动删除或注释掉
  '@dcloudio/uni-mp-alipay',
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-jd',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-lark',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-toutiao',
  '@dcloudio/uni-mp-xhs',
  '@dcloudio/uni-quickapp-webview',
  // vue 已经内置了 @vue/runtime-core，这里移除掉
  '@vue/runtime-core',
  'vue-i18n',
]

// 使用exec执行命令
exec(`pnpm remove ${dependencies.join(' ')}`, (error, stdout, stderr) => {
  if (error) {
    // 如果有错误，打印错误信息
    console.error(`执行出错: ${error}`)
    return
  }

  if (stdout)
    console.log(`stdout: ${stdout}`)

  if (stderr)
    console.error(`stderr: ${stderr}`)
})
