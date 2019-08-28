import React from 'react'
import { Layout } from 'antd';
import {observer} from 'mobx-react'
import './style.scss'
import ContentComponent from './contentComponent'
import MenuComponent from './menuComponent'
import HeaderComponent from './headerComponent'

@observer
class Home extends React.Component<any, any>{
  
    render() {
        return <Layout>
            <HeaderComponent {...this.props}></HeaderComponent>
            <Layout>
               {/* 菜单 */}
               <MenuComponent {...this.props}></MenuComponent>
               {/* 内容 */}
               <ContentComponent {...this.props}></ContentComponent>
            </Layout>
        </Layout> 
    }   
}
export default Home