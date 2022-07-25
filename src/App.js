import { HashRouter, Routes, Route } from 'react-router-dom';
import MainView from './MainView';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { walletActions, swapActions } from './store/actions'
import { useEffect } from "react";
import { SocketManager } from './networking/socket';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      SocketManager.connect();
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
