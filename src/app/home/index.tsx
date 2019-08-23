import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Row, Col,  Dropdown } from 'antd';
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import './style.scss'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class Home extends React.Component<any, any>{
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
                <Menu.Item>
                   修改密码
                </Menu.Item>
                <Menu.Item>
                    退出
                </Menu.Item>
            </Menu>
        );
        return <Layout>
            <Header className="header">
                <Row>
                    <Col span={12} className='header_name'>
                        <span className='header_name_logo'><img src={require('assets/images/logo.jpg')} alt="" /></span>
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
            
           
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" />基础管理</span>}
                        >
                            <Menu.Item key="1"><Link to='/versionControl'>版本控制</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="laptop" />权限管理</span>}
                        >
                            <Menu.Item key="5">option5</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="notification" />产品管理</span>}
                        >
                            <Menu.Item key="9">option9</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={<span><Icon type="align-right" />银行管家</span>}
                        >
                            <Menu.Item key="9">option9</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {
                            renderRoutes(this.props.route.routes)
                        }
            </Content>
                </Layout>
            </Layout>
        </Layout> 
    }   
}
export default Home