import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import Store from 'store/store'
import { observer } from 'mobx-react'
const { SubMenu } = Menu;
const { Sider } = Layout;


@observer
class MenuComponent extends React.Component<any, any>{
    render() {
        let selectedKeys = "/", openKeys = "";
        const NowPath = this.props.location.pathname
        Store.Menu.MenuList.map(item => {
            item.Children.map(res => {
                if (NowPath == '/') {
                    return
                }
                if (res.Path == NowPath.split('/')[1]) {
                    openKeys = item.Key
                    selectedKeys = res.Id
                }
            })
        })

        let config = {
            defaultOpenKeys: [openKeys],
            defaultSelectedKeys: [selectedKeys]
        }
        if (Store.Menu.MenuList.length!=0) {
            return <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultOpenKeys={config.defaultOpenKeys}
                    defaultSelectedKeys={config.defaultSelectedKeys}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Store.Menu.MenuList.map(item => {
                            return <SubMenu
                                key={item.Key}
                                title={<span><Icon type={item.Icon} />{item.Name}</span>}
                            >
                                {
                                    item.Children.map(res => {
                                        return <Menu.Item key={res.Id}><Link to={"/" + res.Path}>{res.Name}</Link></Menu.Item>
                                    })
                                }
                            </SubMenu>
                        })
                    }
                </Menu>
            </Sider>
        }
        return null

    }
}
export default MenuComponent

