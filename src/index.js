import React from 'react';
import './components/styles/index.css';
import App from './App';
import { store } from './store/store'
import { Provider } from 'react-redux';
import Splash from '@citadeldao/apps-ui-kit/dist/components/uiKit/Splash'
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Config } from './components/config/config';
const enabled = window.location.href.search('/localhost') === -1 && window.location.href.search('/192.168.') === -1
Sentry.init({
    dsn: enabled ? "https://5c05e134a0f74a7b985c06ad96e81e73@o510489.ingest.sentry.io/6477719" : null,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><App /></Provider>);

const splashContainer = document.getElementById('splash');
const splashRoot = createRoot(splashContainer);
splashRoot.render(<Splash appName='Pancakeswap' />);

var r = document.querySelector(':root');
const config = new Config()
r.style.setProperty('--appThemeColor', config.tabbarParamsFromConfig("BACKGROUND_COLOR"));