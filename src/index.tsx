import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import StoreContext from '@/contexts/storeContext'
import store from '@/store'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import '@/assets/style/index.less'

import mainFn from '@/utils/mainFn'

mainFn.setNoReferer()

dayjs.locale('zh-cn')

ReactDOM.render(
  // <React.StrictMode> // antd的侧边栏二级菜单展开时控制台会报错，暂时关闭StrictMode，等antd的更新
  <StoreContext.Provider value={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StoreContext.Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
)
