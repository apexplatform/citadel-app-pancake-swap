import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import store from './store/store'
import {Provider} from 'react-redux';
// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

