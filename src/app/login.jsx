import React from 'react'
import _ from 'lodash'


class Login extends React.Component{
    render(){
        return <div>
            <span>hello wolrd</span>
            {
                 _.map([1,2,3],(item)=>{
                     return <span key={item} style={{color:"red"}}>{item}</span>
                 })
            }
        </div>
    }
}

export default Login