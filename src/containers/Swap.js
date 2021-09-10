import React, { useState } from 'react';
import { FormItem,Div, Button, Group } from '@vkontakte/vkui';
import ROUTES from '../routes'
import '../styles/panels/swap.css'
import AmountInput from '../components/AmountInput'
import TokenSelect from '../components/TokenSelect'
import Header from '../components/Header'
import Icon from '../components/Icon'
import FeeInfoBlock from '../components/FeeInfoBlock'
const Swap = (props) => {
	const [disabled,setDisabled] = useState(true)
	return (
		<Group className='swap-container'>
			<Header title="Swap"/>
			<div className='swap-row'>
				<FormItem top="From token" className='formTokenItem'>
					<TokenSelect />
				</FormItem>
				<FormItem top="Amount to swap" className='formAddressItem'>
					<AmountInput />
				</FormItem>
			</div>
			<Div className='center'>
				<button className='swap-amount-btn'>
					<Icon icon='swap' fill={'#792EC0'}/>
				</button>
			</Div>
			<div className='swap-row'>
				<FormItem top="To token" className='formTokenItem'>
					<TokenSelect />
				</FormItem>
				<FormItem top="Amount to receive" className='formAddressItem'>
					<AmountInput />
				</FormItem>
			</div>
			<FeeInfoBlock />
			<Div>
				<Button stretched size="l" className='swap-btn' id={disabled ? "disabled-btn" : undefined} onClick={()=> props.setActiveModal(ROUTES.MODAL_OPEN)}>
					Swap
				</Button>
			</Div>
		</Group>
	);
}
export default Swap;
