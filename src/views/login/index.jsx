/*
 * @Description: 登录页
 * @Author: Neo
 * @Date: 2022-02-18
 * @LastEditTime: 2022-02-24
 * @LastEditors: Neo
 */
import './index.less'
import { Form, Input, Button, Checkbox } from 'antd'
import { useStore } from '@/hooks/storeHook'
import { useNavigate } from 'react-router-dom'
import tools from '@/utils/tools'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { getRoutePath } from '@/utils/appTools'

function Index () {
  const navigate = useNavigate()

  const { userStore } = useStore()

  // url参数
  const query = tools.getQueryObject()
  const redirectUrl = decodeURIComponent(query.redirectUrl || '')

  // form实例
  const [form] = Form.useForm()

  // 提交表单
  function onSubmit () {
    form.validateFields().then(values => {
      // console.log(values)
      setTimeout(() => {
        const ticket = 'token123'
        userStore.setTicket(ticket)

        if (redirectUrl) {
          const path = getRoutePath(redirectUrl, true)
          navigate(path)
        } else {
          navigate('/index')
        }
      }, 200)
    })
  }

  return (
    <div className="v-login-index">
      <h4 className="title">后台管理系统</h4>

      <Form
        className="formWrap"
        name="login"
        form={form}
        size="large"
        initialValues={{ username: 'neo', password: '123456', remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <div className="moreWrap">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">忘记密码</a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="loginBtn" onClick={onSubmit}>登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Index
