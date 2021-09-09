import React from 'react';
import { FormItem,Div, Button, Group } from '@vkontakte/vkui';
import ROUTES from '../routes'
import '../styles/panels/send.css'
import AddressInput from '../components/AddressInput'
import TokenSelect from '../components/TokenSelect'
import AmountInput from '../components/AmountInput'
import AlarmBlock from '../components/AlarmBlock'
import InfoView from '../components/InfoView'
import text from '../text.json'
import Header from '../components/Header'
import CustomSelect from '../components/CustomSelect'
let methods = [
	{
		label: 'ETH -> SCRT',
		value: 'eth'
	},
	{
		label: 'SCRT - ETH',
		value: 'usdt'
	}
]
const Bridge = (props) => (
	<Group className='bridge-container'>
		<Header title="Bridge"/>
		<FormItem>
			<div className='formItem-row'>
				<span>Bridge</span>
				<InfoView  text={text.INFO_TEXT}/>
			</div>
			<CustomSelect methods={methods}/>
		</FormItem>
		<FormItem top="Token">
			<TokenSelect />
		</FormItem>
		<FormItem top="To">
			<AddressInput />
		</FormItem>
		<FormItem top="Amount">
			<AmountInput />
		</FormItem>
		<AlarmBlock />
		<Div>
			<Button stretched size="l" className='send-btn' onClick={()=> props.setActiveModal(ROUTES.MODAL_OPEN)}>
				Send
			</Button>
		</Div>
	</Group>
);

export default Bridge;
