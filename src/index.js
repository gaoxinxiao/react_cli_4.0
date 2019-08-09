import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from "react-hot-loader";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import './index.css'


/*初始化*/
renderWithHotReload(App)

/*热更新*/
if (module.hot) {
    module.hot.accept("./App.jsx", () => {
        const Router = require("./App.jsx").default;
        renderWithHotReload(Router);
    });
}


function renderWithHotReload(Router) {
    ReactDOM.render(
        <AppContainer>
            <HashRouter>
                <Router />
            </HashRouter>
        </AppContainer>,
        document.getElementById("root")
    );
}





// const app = () =>{
//     console.log('wmh')
// }


// function* fnGxx(){   // 定义一个Generator函数
//     yield 'hello';
//     yield 'world';
//     return 'end';
// }
// console.log(fnGxx())

// console.log(new Set([1,2,2,2,3]),'wwww')