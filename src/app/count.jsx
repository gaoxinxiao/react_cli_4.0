import React from 'react'


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            count:0
        }
    }
   
    render(){
        return <div>
            <span>{this.state.count}</span>
            <span onClick={()=> this.setState({count:this.state.count+=1})}>加加加</span>
        </div>
    }
}


export default Login