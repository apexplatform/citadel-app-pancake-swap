import { HashRouter, Routes, Route } from "react-router-dom";
import MainView from "./MainView";
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { walletActions, swapActions } from './store/actions'
import { useEffect } from "react";
// eslint-disable-next-line
import socket from "./networking/socket";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(walletActions.loadWalletWithBalances());
      dispatch(swapActions.getSwapInfo('1',true,false,false))
      // eslint-disable-next-line
  },[])
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
            <Route path="/*" element={<MainView />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
