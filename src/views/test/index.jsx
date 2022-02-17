import { useState, useEffect } from 'react'
import './index.less'
import { useNavigate } from 'react-router-dom'
import { observer, useStore } from '@/hooks/storeHook'
import { Button } from 'antd'
import tools from '@/utils/tools'

function Index () {
  const navigate = useNavigate()

  const store = useStore()
  const { userStore } = store

  useEffect(() => {
    const query = tools.getQueryObject()
    console.log(query)
  }, [])

  function toPage () {
    navigate('/index')
  }

  function onSetStore () {
    // userStore.setTicket('ttt')
    // alert(userStore.ticket)
  }

  return (
    <div className="v-test-index">
      <div className="content">
        <div>
          <Button color='primary' onClick={toPage}>去首页</Button>
        </div>
        <div>
          <Button color='primary' onClick={onSetStore}>修改store中的ticket</Button>
        </div>
      </div>
    </div>
  )
}

export default observer(Index)
