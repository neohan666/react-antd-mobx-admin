import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// mobx
import StoreContext from '@/contexts/storeContext'
import store from '@/store'

// antd
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import '@/assets/style/index.less'

dayjs.locale('zh-cn')

ReactDOM.render(
  // antd的侧边栏SubMenu菜单展开时控制台会报错，暂时关闭StrictMode
  // <React.StrictMode>
  <StoreContext.Provider value={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StoreContext.Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
)
