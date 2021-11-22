import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";
import store from './store/store'
import {Provider} from 'react-redux';
// Init VK  Mini App
bridge.send("VKWebAppInit");
Sentry.init({
  dsn: "https://acbfd8c16a824dcf929ce1d6cf623f04@o510489.ingest.sentry.io/6075406",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root"));

