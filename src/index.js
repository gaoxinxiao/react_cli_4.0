import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App.jsx";
import './index.css'
import {Provider} from 'mobx-react'
import stores from 'store/store'


ReactDOM.render(
    <Provider store={stores}><App /></Provider>,
    document.getElementById("root")
);