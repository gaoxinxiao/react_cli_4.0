import React from 'react'

export default {
    config: [
        {
            path: "/login",
            component: React.lazy(() => import('../app/login')),
            exact: true
        },
        {
            path: "/count",
            component: React.lazy(() => import('../app/count')),
            exact: true
        },
    ]
}