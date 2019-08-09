import React from 'react'
import _ from 'lodash'


class Login extends React.Component{
    render(){
        return <div>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565255445809&di=3c9785de669d75dac9566fbfe44aa691&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F57019e6a19dff15d0249041c0b1e3ef6d04476532742c-SEeEk3_fw658" alt=""/>
            <span>hello wolrd</span>
            {
                 _.map([1,2,3],(item)=>{
                     return <span style={{color:"red"}}>{item}</span>
                 })
            }
        </div>
    }
}

export default Login