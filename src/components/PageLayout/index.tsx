/*
 * @Description: 页面整体布局组件
 * @Author: Neo
 * @Date: 2022-02-15
 * @LastEditTime: 2022-02-15
 * @LastEditors: Neo
 */
import './index.less'
import { Outlet } from 'react-router-dom'
import HeadBar from './headBar'
import SideBar from './sideBar'

function PageLayout () {
  return (
    <div className="c-Layout-index">
      <SideBar />

      <div className="appMainWrap">
        <HeadBar />

        <div className="appMain">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PageLayout
