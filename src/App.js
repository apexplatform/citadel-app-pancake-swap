import React, { useState, useEffect } from 'react';
import { View, ScreenSpinner,AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPanel from './panels/MainPanel';
import ROUTES from './routes'
import TransactionDetailsPanel from './panels/TransactionDetailsPanel'
import './styles/index.css'
import store from './store/store'
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {initApp} from './store/actions/vkActions'
import {setUser} from './store/actions/userActions'
import SelectAddressPanel from './panels/SelectAddressPanel'
import SelectTokenPanel from './panels/SelectTokenPanel'

const App = (props) => {
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    const {activePage} = props.panelReducer
	useEffect(() => {
		props.initApp()
		props.setUser(setPopout())
	}, []);
	return (
		<Provider store={store}>
			<AdaptivityProvider>
				<AppRoot>
					<View popout={popout} activePanel={activePage}>
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

export default connect(mapStateToProps, {initApp,setUser}) (App);
