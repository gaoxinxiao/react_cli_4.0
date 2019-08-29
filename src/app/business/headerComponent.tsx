import React from 'react'
import { Layout, Icon, Row, Col, Dropdown, Menu } from 'antd';
import './style.scss'
const { Header } = Layout;


class HeaderComponent extends React.Component<any, any>{
    state = {
        visible: false,
        user: "admin",
        
    };
    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={()=> this.props.history.push('/resetPwd')}>
                    修改密码
                </Menu.Item>
                <Menu.Item onClick={()=> this.props.history.replace('/login')}>
                    退出
                </Menu.Item>
            </Menu>
        );
        return <Header className="header">
            <Row>
                <Col span={12} className='header_name'>
                    <span className='header_name_logo'><img src={require('assets/images/logo2.png')} alt="" /></span>
                    <span className='header_name_title'>比财数据科技有限公司</span>
                </Col>
                <Col span={12} className='header_opertion'>
                    <Dropdown overlay={menu}>
                        <span className='ant-dropdown-link'>
                            {this.state.user} <Icon type="down" />
                        </span>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    }
}
export default HeaderComponent