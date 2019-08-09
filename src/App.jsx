import React, { Suspense } from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'
import routerConfig from './router/index'
import './App.scss'


class App extends React.Component {
    render() {
        return <Suspense fallback={<div>loading</div>}>
            <Switch>
                <Redirect exact from='/' to="/login" />
                {
                    routerConfig.config.map((item, ind) => {
                        return <Route exact={item.exact} key={ind} path={item.path} render={(location) => {
                            return <item.component {...location} />
                        }} />
                    })
                }
            </Switch>
        </Suspense>
    }
}

export default App
