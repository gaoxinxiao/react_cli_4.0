import React from 'react'
import _ from 'lodash'
import { Button } from 'antd'

class Login extends React.Component{
    render(){

        return <div>
            <span className='iconfont circular' style={{color:"red"}}></span>
<<<<<<< HEAD
            <span>hello world</span>
            <Button>hello </Button>
=======
            <span>hello word</span>
>>>>>>> 66f98618c0fe20268648c42a1caf1cac43a86822
            {
                 _.map([1,2,3],(item)=>{
                     return <span key={item} style={{color:"red"}}>{item}</span>
                 })
            }
        </div>
    }
}
export default Login