import React from 'react'
import './style.scss'


interface Props{
    name: "aa" | "bb" 
}


class Login extends React.Component<Props,any> {
    state = {
        count: 0
    }
    test = () => {
        console.log(123)
    }
    render() {
        return <div>
            <span onClick={this.test.bind(this)} className='test'>test</span>
            <span>{this.state.count}</span>
            <span onClick={() => this.setState({ count: this.state.count += 1 })}>加加加</span>
        </div>
    }
}

<Login name="aa"></Login>

export default Login