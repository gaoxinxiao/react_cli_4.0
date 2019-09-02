import React from 'react'
import Exception from 'ant-design-pro/lib/Exception';
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Animate from 'rc-animate'
import Loadable from 'react-loadable'
import { Skeleton, Spin } from 'antd'
import Login from 'app/login'
import Business from 'app/business'
import container from 'app/container'
import Home from 'app/home'
import ResetPwd from 'app/resetPwd'
import Store from 'store/store'
import _ from 'lodash'


class Entrance extends React.Component<any, any>{
    render() {
        if (Store.User.loading) {
            return <Spin size="large" tip="Loading..." spinning={true}>
                <div style={{ height: "100vh" }} />
            </Spin>
        }
        if (Store.User.isUser) {
            return <Business {...this.props} />
        }
        return <Login {...this.props}></Login>
    }
}

export default class RouterConfig extends React.Component<any, any>{
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
                {
                    path: "/",
                    component: this.createCSSTransition(Home),
                    exact: true
                },
                {
                    path: "/resetPwd",
                    component: this.createCSSTransition(ResetPwd),
                    exact: true
                },
                ...this.initRoutes(),
                {
                    component: this.createCSSTransition(NoMatch)
                }
            ]
        }
    ]
    initRoutes() {
        return _.map(container, (item, key) => {
            return {
                'path': `/` + key,
                'component': this.renderLoadable(item.Component)
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
    /**
    *
    * @param Component 组件
    * @param Animate 路由动画
    * @param Loading 组件加载动画
    * @param cssTranParams 路由动画参数
    */
    renderLoadable(Component, Animate = true, Loading = this.Loading, cssTranParams = { content: true, classNames: "fade" }) {
        if (!Loading) {
            Loading = (props) => {
                return this.Loading(props)
            };
        }
        const loadable = Loadable({ loader: Component, loading: Loading })

        if (Animate) {
            return this.createCSSTransition(loadable, cssTranParams.content, cssTranParams.classNames)
        }

        return loadable
    }
    /**
    * 过渡动画
    * @param Component 组件
    * @param content
    * @param classNames 动画
    */
    createCSSTransition(Component: any, content = true, classNames = "fade") {
        return class extends React.PureComponent<any, any>{
            state = {
                error: null,
                errorInfo: null
            };
            componentDidCatch(error, info) {
                this.setState({
                    error: error,
                    errorInfo: info
                })
            }
            render() {
                const { location } = this.props;
                // 组件错误
                if (this.state.errorInfo) {
                    return (
                        <Exception type="500" desc={<div>
                            <h2>组件出错~</h2>
                            <details >
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </details>
                        </div>} />
                    );
                }
                // 404
                if (Component == NoMatch) {
                    return <Animate transitionName={classNames}
                        transitionAppear={true} component="" key={Component.name} ><NoMatch {...this.props} />
                    </Animate>
                }
                // 认证通过
                if (true) {
                    return (
                        <div className="app-animate-content" key="app-animate-content" >
                            <Component  {...this.props} />
                        </div>
                    );
                }
                // 认证未通过
                return <Animate transitionName={classNames}
                    transitionAppear={true} component="" key={Component.name} >
                    <Exception type="404" desc={<h3>
                        <code>{location.pathname}</code>
                    </h3>} />
                </Animate  >
            }
        }
    };

    render() {
        return <HashRouter>
            {
                renderRoutes(this.routes)
            }
        </HashRouter>
    }
}

export class NoMatch extends React.Component<any, any> {
    render() {
        return <Exception type="404" desc={<h3>无法匹配 <code>{this.props.location.pathname}页面</code></h3>} />
    }
}