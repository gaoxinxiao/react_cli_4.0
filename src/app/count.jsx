import React from 'react'


class Login extends React.Component {
    state = {
        count: 0
    }
    test = () => {
        console.log(123)
    }
    render() {
        return <div>
            <span onClick={this.test.bind(this)}>test</span>
            <span>{this.state.count}</span>
            <span onClick={() => this.setState({ count: this.state.count += 1 })}>加加加</span>
        </div>
    }
}


export default Login