/*
 * @Description: 侧边栏
 * @Author: Neo
 * @Date: 2022-02-15
 * @LastEditTime: 2022-02-17
 * @LastEditors: Neo
 */
import './sideBar.less'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useStore, observer } from '@/hooks/storeHook'
import { routes } from '@/router'

const { Sider } = Layout
const { SubMenu, Item: ItemMenu } = Menu

function SideBar () {
  const { commonStore } = useStore()
  const { sideBarCollapsed } = commonStore

  const location = useLocation()
  const { pathname } = location

  /**
   * 根据路由配置自动生成侧边菜单
   */
  const openKeys = [] // 用于根据当前路由默认展开子菜单
  const menuList = getMenuList()
  // 递归获取层级菜单
  function getMenuList () {
    const getList = (routeList = [], prePath = '') => {
      let menuList = []
      routeList.forEach(v => {
        v.meta = v.meta || {}
        if (v.redirect || v.path === '*') {
          return
        }
        let currentPath = prePath + v.path
        if (v.path === '/') {
          menuList = menuList.concat(getList(v.children, '/'))
        } else {
          if (v.children) {
            menuList.push((
              <SubMenu key={currentPath} icon={v.meta.icon} title={v.meta.title}>
                {getList(v.children, currentPath + '/')}
              </SubMenu>
            ))
            if (pathname.match(new RegExp('^' + currentPath + '\\/\\w'))) {
              openKeys.push(currentPath)
            }
          } else {
            menuList.push((
              <ItemMenu key={currentPath} icon={v.meta.icon}>
                <Link to={currentPath}>{v.meta.title}</Link>
              </ItemMenu>
            ))
          }
        }
      })
      return menuList
    }
    return getList(routes)
  }

  return (
    <div className="c-Layout-sideBar">
      <Layout className="sideBarLayout">
        <Sider
          trigger={null}
          collapsible
          collapsed={sideBarCollapsed}
          collapsedWidth="50"
        >
          <Link to="/">
            <div className="logoWrap">
              <i className="logo"></i>
              {!sideBarCollapsed ? <h1 className="title">后台管理系统</h1> : null}
            </div>
          </Link>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={sideBarCollapsed ? [] : openKeys}
          >
            {menuList}
          </Menu>
        </Sider>
      </Layout>
    </div>
  )
}

export default observer(SideBar)
