import React from 'react';
import { FormItem,Div, Button, Input, Select, CustomSelectOption, Avatar, Group } from '@vkontakte/vkui';
import ROUTES from '../routes'
import '../styles/send.css'
let tokens = [
	{
		label: 'ETH',
		value: 'eth'
	},
	{
		label: 'USDT',
		value: 'usdt'
	}
]
const Swap = (props) => (
	<Group>
		<FormItem top="Receiver address">
			<Input type="text" />
		</FormItem>
		<FormItem top="Token">
			<Select
			className='select-custom'
			options={tokens}
			renderOption={({ option, ...restProps }) => (
				<CustomSelectOption {...restProps}  before={<Avatar size={24} src={'./img/'+option.value+'.svg'} />} />
			)}
			/>
		</FormItem>
		<FormItem top="Swap to token">
			<Select
			options={tokens}
			renderOption={({ option, ...restProps }) => (
				<CustomSelectOption {...restProps} before={<Avatar size={24} src={'./img/'+option.value+'.svg'} />} />
			)}
			/>
		</FormItem>
		<FormItem top="Amount">
			<div className='transactions-row'>
				<Input className='input-custom'/>
				<button className='max-btn'>Max</button>
			</div>
		</FormItem>
		<Div>
			<div className='transactions-row'>
				<h5 className='send-fee'>Including the default network fee -</h5>
				<span className='send-amount'>0.343</span>
				<h5 className='send-fee'>ETH</h5>
			</div>
			<div className='transactions-row'>
				<h5 className='send-fee'>Amount to get:</h5>
				<span className='send-amount'>2.343</span>
				<h5 className='send-fee'>ETH</h5>
			</div>
		</Div>
		<Div>
			<Button stretched size="l" className='swap-btn' onClick={()=> props.setActiveModal(ROUTES.MODAL_OPEN)}>
				Swap
			</Button>
		</Div>
	</Group>
);

export default Swap;
