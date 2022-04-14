import io from 'socket.io-client'
import { SET_WALLETS, SET_SIGNED_MESSAGE } from '../../store/actions/types';
import store from "../../store/store";
import {getWalletConstructor} from '../../store/actions/walletActions'
const { auth_token } = store.getState().userReducer;
const socket = io(
	'https://api-websockets-apps.apps.citadel.okd.3ahtim54r.ru/apps',
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
	console.log('connected')
})

socket.on('message-from-front',(data)=>{
	console.log('message-from-front in app', data)
	if(data?.type == 'message'){
		store.dispatch({
			type: SET_SIGNED_MESSAGE,
			payload: data?.message,
		  });
	}
})


socket.on('address-balance-updated-app',(data)=>{
	console.log('address-balance-updated-app', data)
	const {wallets} = store.getState().walletReducer
	if(data.address && data.balance && data.net){
		wallets.map(item => {
			if(item.address == data.address && item.network == data.net){
				item.balance = data.balance
			}
		})
		store.dispatch({
			type: SET_WALLETS,
			payload: wallets,
		  });
		const wallet = getWalletConstructor()
		if(wallet){
		 	setTimeout(() => wallet.updateTokenBalances(), 3000)
		} 
	}
})

socket.on('mempool-add-tx-app',(data)=>{
	console.log('mempool-add-tx-app', data)
})

socket.on('mempool-remove-tx-app',(data)=>{
	console.log('mempool-remove-tx-app', data)
})

export default socket