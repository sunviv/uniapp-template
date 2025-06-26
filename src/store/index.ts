import type { App } from 'vue'
import { createPinia } from 'pinia'
// 数据持久化
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 安装pinia状态管理插件
export function setupStore(app: App) {
  const store = createPinia()

  const piniaPersist = createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  })
  store.use(piniaPersist)

  app.use(store)
}

export * from './modules'
