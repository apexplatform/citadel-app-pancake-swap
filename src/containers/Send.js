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
let bridge = [
	{
		label: 'ETH -> SCRT',
		value: 'eth'
	},
	{
		label: 'SCRT -> ETH',
		value: 'usdt'
	}
]
const Send = (props) => (
	<Group>
		<FormItem top="Bridge">
			<Select
			className='select-custom'
			options={bridge}
			renderOption={({ option, ...restProps }) => (
				<CustomSelectOption {...restProps} />
			)}
			/>
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
		
		<FormItem top="Amount">
			<div className='transactions-row'>
				<Input className='input-custom'/>
				<button className='max-btn'>Max</button>
			</div>
		</FormItem>
		<FormItem top="From">
			<Input type="text" />
		</FormItem>
		<FormItem top="To">
			<Input type="text" />
		</FormItem>
		<Div>
			<Button stretched size="l" className='swap-btn' onClick={()=> props.setActiveModal(ROUTES.MODAL_OPEN)}>
				Send
			</Button>
		</Div>
	</Group>
);

export default Send;
