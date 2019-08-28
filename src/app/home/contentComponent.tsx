import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import { renderRoutes } from 'react-router-config'
import { observer } from 'mobx-react'
import Store from 'store/store'

const { Content } = Layout;


@observer
class ContentComponent extends React.Component<any, any>{
    render() {
        return <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
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
    }
}
export default ContentComponent