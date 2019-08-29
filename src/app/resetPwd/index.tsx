import React from 'react'
import { Button, Row, Col, Form, Icon, Input, notification } from 'antd'
import { observer } from 'mobx-react'
import './style.scss'
import Store from 'store/store'

@observer
class ResetPwd extends React.Component<any, any>{
    handleSubmit = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {currentPwd,newPwd} = values
                if (currentPwd == newPwd) {
                    Store.Notification.error({description:"新密码和旧密码不能一致"})
                }else {
                    console.log('Received values of form: ', values);
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return <Row className='resetPwd' type='flex' justify='center'>
            <Col>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='当前密码'>
                        {getFieldDecorator('currentPwd', {
                            rules: [{ required: true, message: '请输入旧密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入旧密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label='新密码'>
                        {getFieldDecorator('newPwd', {
                            rules: [{ required: true, message: '请输入新密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入新密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label='确认新密码'>
                        {getFieldDecorator('confirmPwd', {
                            rules: [{ required: true, message: '请再次输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请再次输入密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="resetPwd-form-button-confirm">确认</Button>
                        <Button type="dashed" htmlType="submit" className="resetPwd-form-button" onClick={() => this.props.history.push('/')}>取消</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    }
}
export default Form.create()(ResetPwd)