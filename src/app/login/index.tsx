import React from 'react'
import _ from 'lodash'
import { Button } from 'antd'
import { observer } from 'mobx-react'

@observer
class Login extends React.Component<any,any>{
    render(){
        return <div>
            <span className='iconfont circular' style={{color:"red"}}></span>
            <span>hello world</span>
            <Button>hello </Button>
            <span>hello word</span>
            {
                 _.map([1,2,3],(item)=>{
                     return <span key={item} style={{color:"red"}}>{item}</span>
                 })
            }
        </div>
    }
}

export default Login