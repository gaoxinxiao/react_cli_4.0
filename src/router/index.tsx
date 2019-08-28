import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Login from 'app/login'
import Home from 'app/home'
import container from 'app/container'
import _ from 'lodash'
import Loadable from 'react-loadable'
import { Skeleton } from 'antd'


class Entrance extends React.Component<any, any>{
    render() {
        //正常登录的情况后期加判断
        if (true) {
            return <Home {...this.props} />
        }
    }
}


export default class RouterConfig extends React.Component<any, any>{

    initRoutes() {
        return _.map(container, (item, key) => {
            return {
                'path': `/` + key,
                'component': this.renderLoadable(item.Component),
                "exact": true
            };
        })
    }
    // 组件加载动画
    Loading = (props) => {
        if (props.error) {
            return <div>Error! {props.error}</div>;
        } else if (props.timedOut) {
            return <div>Taking a long time...</div>;
        } else if (props.pastDelay) {
            return <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </>
        } else {
            return <div></div>;
        }
    };
    renderLoadable(Component, Loading = this.Loading) {
        if (!Loading) {
            Loading = (props) => {
                return this.Loading(props)
            };
        }

        const loadable = Loadable({ loader: Component, loading: Loading })
        return loadable
    }
    routes = [
        {
            path: "/login",
            component: Login,
            exact: true
        },
        {
            path: "/",
            component: Entrance,
            routes: [
                ...this.initRoutes()
            ]
        }
    ]
    render() {
        return <HashRouter>
            {
                renderRoutes(this.routes)
            }
        </HashRouter>
    }
}

