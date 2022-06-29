import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainView from "./MainView";
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { walletActions } from './store/actions'
import { useEffect } from "react";
// eslint-disable-next-line
import socket from "./networking/socket";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(walletActions.loadWalletWithBalances());
      // dispatch(walletActions.loadNetworks())
      // eslint-disable-next-line
  },[])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<MainView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
