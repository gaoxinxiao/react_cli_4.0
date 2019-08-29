import React from 'react'
import { Row } from 'antd'
import './style.scss'


class Home extends React.Component<any, any>{
    render() {
        return <Row align="middle" justify='center'>
                <img className='bg' src="https://img5.duitang.com/uploads/item/201311/28/20131128101128_JZUaM.jpeg" alt=""/>
        </Row>
    }
}
export default Home