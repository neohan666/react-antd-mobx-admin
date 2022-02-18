/*
 * @Description: 顶部栏
 * @Author: Neo
 * @Date: 2022-02-15
 * @LastEditTime: 2022-02-18
 * @LastEditors: Neo
 */
import './headBar.less'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useStore, observer } from '@/hooks/storeHook'
import { Breadcrumb, Menu, Dropdown, } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRouteTitleMap } from '@/utils/appTools'

function HeadBar () {
  const { commonStore, userStore } = useStore()
  const { sideBarCollapsed } = commonStore
  const { userInfo } = userStore

  const location = useLocation()
  const navigate = useNavigate()

  function onToggle () {
    commonStore.setSideBarCollapsed(!sideBarCollapsed)
  }

  /**
   * 面包屑
   */
  const routeTitleMap = getRouteTitleMap()
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <span>{routeTitleMap[url]}</span>
      </Breadcrumb.Item>
    )
  })

  function toPageHome () {
    navigate('/index')
  }

  return (
    <div className="c-Layout-headBar">
      <div className="headLeft">
        {/* 侧边栏折叠按钮 */}
        <div className="toggleIcon" onClick={onToggle}>
          {sideBarCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </div>
        {/* 面包屑导航 */}
        <Breadcrumb>
          {extraBreadcrumbItems}
        </Breadcrumb>
      </div>

      <div className="headRight">
        <Dropdown
          className="userMenu"
          overlay={
            <Menu>
              <Menu.Item key="0">
                <div onClick={toPageHome}>首页</div>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">
                <div className="logout">退出</div>
              </Menu.Item>
            </Menu>
          }
        >
          <div>{userInfo.nickName || ''}<DownOutlined className="iconArrowDown"/></div>
        </Dropdown>
      </div>
    </div>
  )
}

export default observer(HeadBar)
