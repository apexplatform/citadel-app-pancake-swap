import io from 'socket.io-client'
import { store } from "../../store/store";
import { types } from '../../store/actions/types';
import { swapActions, walletActions } from '../../store/actions';

const { auth_token } = store.getState().user;
const socket = io(
	process.env.REACT_APP_SOCKET_URL,
	{
		transports: ['websocket'],
		upgrade: false,
		query: {
			token: auth_token
		},
		reconnection: true
	}
);

socket.on('connect',()=>{
	console.log('socket is connected')
})

socket.on('message-from-front',async(data)=>{
	console.log('message-from-front in app', data)
	if(data.type === 'view-scrt-balance'){
		// update secret token balance
	}
})


socket.on('address-balance-updated-app',async(data)=>{
	console.log('address-balance-updated-app', data)
	const { wallets, activeWallet } = store.getState().wallet
	if(data.address && data.balance && data.net){
		wallets.forEach(item => {
			if(item.address === data.address && item.network === data.net){
				item.balance = data.balance?.mainBalance
			}
		})
		store.dispatch({
			type: types.SET_WALLETS,
			payload: wallets,
		});
	}	
	if(activeWallet.address === data.address){
		store.dispatch(walletActions.loadTokenBalances(activeWallet))
	}
})


socket.on('mempool-add-tx-app', (data) => {
	console.log('mempool-add-tx-app', data)
})

socket.on('mempool-remove-tx-app',async (data) => {
	console.log('mempool-remove-tx-app', data)
	const { tokenIn } = store.getState().swap;
	const { activeWallet, transactionResponse } = store.getState().wallet
	if(activeWallet.address === data.from){
		if(transactionResponse && transactionResponse.type === "Approve"){
			store.dispatch(swapActions.setTokenIn(tokenIn))
		}else{
			store.dispatch(walletActions.loadTokenBalances(activeWallet))
		}
	}
})

export default socket