import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Home from 'app/home'
import container from 'app/container' 
import _ from 'lodash'


class Entrance extends React.Component<any,any>{
    render(){
        //正常登录的情况后期加判断
        if (true){
            return <Home {...this.props} />
        }
    }
}

export default class RouterConfig extends React.Component<any, any>{
    initRoutes(data) {
        return _.map(data, (component, key) => {
            return {
                'path': `/` + key,
                'component':component,
                "exact":true
            };
        })
    }
    routes = [
        {
            path: "/login",
            component: React.lazy(() => import('app/login')),
            exact: true
        },
        {
            path: "/",
            component: Entrance,
            routes:[
                ...this.initRoutes(container)
            ]
        }
    ]
    render() {
        return <Suspense fallback={<div className='loading'>loading</div>}>
            <HashRouter>
                {
                    renderRoutes(this.routes)
                }
            </HashRouter>
        </Suspense>
    }
}

