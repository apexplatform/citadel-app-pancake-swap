import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner,ModalRoot,ModalPage,Group,PanelHeaderBack,TabsItem,Tabs,Panel,PanelHeader, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Transactions from './containers/Transactions';
import ROUTES from './routes'
import Send from './containers/Send';
import TransactionDetails from './components/TransactionDetails'
import { Icon24Back } from '@vkontakte/icons';
import './styles/main.css'
const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.SEND);
	const [activePage, setActivePage] = useState(ROUTES.HOME);
	const [openedTransaction, setOpenedTransaction] = useState({});
	const [activeModal, setActiveModal] = useState(null);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);
	const modal = (
		<ModalRoot activeModal={activeModal}>
			<ModalPage  
			id={ROUTES.MODAL_OPEN}
			onClose={()=> setActiveModal(null)}>
				<Group>
					<h1>Confirm transactions</h1>
				</Group>
			</ModalPage>
		</ModalRoot>
	  );
	const setTransaction = (id,data) => {
		setOpenedTransaction(data)
		setActivePage(id)
	}
	return (
		<AdaptivityProvider>
			<AppRoot>
				<View popout={popout} modal={modal} activePanel={activePage}>
					<Panel id={ROUTES.HOME}>
						<PanelHeader>Bridge App</PanelHeader>
						<Group>
							<Tabs >
								<TabsItem
								onClick={() => setActivePanel(ROUTES.SEND)}
								selected={activePanel === ROUTES.SEND}
								>
								Bridge
								</TabsItem>
								<TabsItem
								onClick={() => setActivePanel(ROUTES.TRANSACTIONS)}
								selected={activePanel === ROUTES.TRANSACTIONS}
								>
								Transaction
								</TabsItem>
							
							</Tabs>
							<View activePanel={activePanel}>
								<Panel id={ROUTES.SEND}>
									<Send setActiveModal={setActiveModal}/>
								</Panel>
								<Panel id={ROUTES.TRANSACTIONS}>
									<Transactions setTransaction={setTransaction}/>
								</Panel>
							</View>
						</Group>
					</Panel>
					<Panel id={ROUTES.TRANSACTION_DETAILS}>
						<PanelHeader left={<div className='back-row' onClick={()=>setActivePage(ROUTES.HOME)}><Icon24Back fill='#818C99' />Back</div>}><p className='transaction-details-header'>{openedTransaction ? openedTransaction.type : ''}</p></PanelHeader>
						<TransactionDetails data={openedTransaction}/>
					</Panel>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
