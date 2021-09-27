import React, { useEffect } from 'react';
import { View,AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPanel from './MainPanel';
import ROUTES from './routes'
import TransactionDetailsPanel from './components/panels/TransactionDetailsPanel'
import './components/styles/index.css'
import store from './store/store'
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {initApp} from './store/actions/vkActions'
import SelectAddressPanel from './components/panels/SelectAddressPanel'
import SelectTokenPanel from './components/panels/SelectTokenPanel'
import {loadNetworks} from './store/actions/walletActions'
const App = (props) => {
    const {activePage} = props.panelReducer
	useEffect(() => {
		props.initApp()
		props.loadNetworks()
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
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {loadNetworks,initApp}) (App);