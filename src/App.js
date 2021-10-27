import { useEffect } from 'react';
import { View,AdaptivityProvider, AppRoot ,ModalRoot,ModalPage} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPanel from './MainPanel';
import ROUTES from './routes'
import TransactionDetailsPanel from './components/panels/TransactionDetailsPanel'
import './components/styles/index.css'
import store from './store/store'
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {getTokenBalance} from './store/actions/swapActions'
import {initApp} from './store/actions/vkActions'
import SelectAddressPanel from './components/panels/SelectAddressPanel'
import SelectTokenPanel from './components/panels/SelectTokenPanel'
import {loadNetworks} from './store/actions/walletActions'
const App = (props) => {
    const {activePage,activeModal} = props.panelReducer
	useEffect(() => {
		props.initApp()
		props.loadNetworks()
		props.getTokenBalance()
	}, []);
	const modal = (
		<ModalRoot activeModal={activeModal}>
		  <ModalPage id="error">
			...
		  </ModalPage>
		</ModalRoot>
	  );
	return (
		<Provider store={store}>
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel={activePage} modal={modal}>
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

export default connect(mapStateToProps, {getTokenBalance,loadNetworks,initApp}) (App);