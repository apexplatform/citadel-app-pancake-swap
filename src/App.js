import { useEffect } from 'react';
import { View,AdaptivityProvider, AppRoot} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPanel from './MainPanel';
import ROUTES from './routes'
import TransactionDetailsPanel from './components/panels/TransactionDetailsPanel'
import './components/styles/index.css'
import store from './store/store'
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {getTokenBalance,updateTradeInfo,checkTokenAllowance} from './store/actions/swapActions'
import {initApp} from './store/actions/vkActions'
import SelectAddressPanel from './components/panels/SelectAddressPanel'
import SelectTokenPanel from './components/panels/SelectTokenPanel'
import {loadWalletWithBalances} from './store/actions/walletActions'
import { loadSocketToken } from './store/actions/userActions'
import socket from './networking/socket';
import {getSwapInfoByUrl,buildSwapTx} from './networking/methods/urlMethods'
const App = (props) => {
    const {activePage} = props.panelReducer
	let swapInfo = null
	useEffect(async() => {
		swapInfo = await getSwapInfoByUrl()
		props.loadWalletWithBalances()
		props.loadSocketToken();
		props.getTokenBalance(true)
		await buildSwapTx()
		props.updateTradeInfo(1,true)
		props.checkTokenAllowance()
	}, []);

	return (
		<Provider store={store}>
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel={activePage}>
						<MainPanel id={ROUTES.HOME}/>
						<TransactionDetailsPanel id={ROUTES.TRANSACTION_DETAILS}/>
						<SelectAddressPanel id={ROUTES.SELECT_ADDRESS} />
						<SelectTokenPanel id={ROUTES.SELECT_TOKEN} />
					</View>
				</AppRoot>
			</AdaptivityProvider>
		</Provider>
	);
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
})

export default connect(mapStateToProps, {loadSocketToken,checkTokenAllowance,updateTradeInfo,loadWalletWithBalances,getTokenBalance,initApp}) (App);