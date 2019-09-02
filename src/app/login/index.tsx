import React from 'react'
import _ from 'lodash'
import { Button, Layout, Row, Col, Form, Icon, Input, notification } from 'antd'
import { observer } from 'mobx-react'
import './style.scss'
import Store from 'store/store'

@observer
class Login extends React.Component<any, any>{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                await Store.User.login(values)
                this.props.history.push('/')
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return <Layout className='login'>
            <Row type="flex" justify='center'>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg" alt="" className='login_bg' />
                <Col><span className='login_img'><img src={require('assets/images/logo3.png')} alt="" /></span>比财数据科技后台管理系统</Col>
            </Row>
            <Row type="flex" justify='center'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </Row>

        </Layout>
    }
}

export default Form.create()(Login)