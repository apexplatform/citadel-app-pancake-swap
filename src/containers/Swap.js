import React, { useState } from 'react';
import { FormItem,Div, Button, Group } from '@vkontakte/vkui';
import ROUTES from '../routes'
import '../styles/panels/swap.css'
import AmountInput from '../components/AmountInput'
import TokenSelect from '../components/TokenSelect'
import {setSelectedToken} from '../store/actions/addressActions'
import Header from '../components/Header'
import {connect} from 'react-redux';
import Icon from '../components/Icon'
import {setFromToken,setToToken,setFromAmount,setToAmount} from '../store/actions/addressActions'
import FeeInfoBlock from '../components/FeeInfoBlock'
const Swap = (props) => {
	const [disabled,setDisabled] = useState(true)
	const [swaped,setSwaped] = useState(false)
	const {fromToken,toToken,fromTokenAmount,toTokenAmount,selectedAddress} = props.addressReducer
	const rate = 0.5
    const feeProcent = 1
	const balanceSwaped = toTokenAmount * rate * (100-feeProcent) / 100
    const balance = fromTokenAmount * rate * (100+feeProcent) / 100
	const showFee = fromToken.network === selectedAddress.network
	const showFee2 = toToken.network === selectedAddress.network
	const reverseTokens = () => {
		props.setFromToken(toToken)
		props.setToToken(fromToken)
		if(swaped){
			props.setFromAmount(toTokenAmount)
			props.setToAmount(balanceSwaped)
		}else{
			props.setToAmount(fromTokenAmount)
			props.setFromAmount(balance)
		}
		setSwaped(!swaped)
	}
	return (
		<Group className='swap-container'>
			<Header title="Swap"/>
			<div className='swap-row'>
				<FormItem top="From token" className='formTokenItem' onClick={() => props.setSelectedToken('from')}>
					<TokenSelect selectedToken={fromToken}/>
				</FormItem>
				<FormItem top="Amount to swap" className='formAddressItem'>
					<AmountInput hideFee={!showFee} isFirst={true} amount={fromTokenAmount}/>
				</FormItem>
			</div>
			<Div className='center'>
				<button className='swap-amount-btn' onClick={() => reverseTokens()}>
					<Icon icon='swap' fill={'#792EC0'}/>
				</button>
			</Div>
			<div className='swap-row'>
				<FormItem top="To token" className='formTokenItem' onClick={() => props.setSelectedToken('to')}>
					<TokenSelect selectedToken={toToken}/>
				</FormItem>
				<FormItem top="Amount to receive" className='formAddressItem'>
					<AmountInput isSecond={true} hideMax={false} hideFee={!showFee2} amount={toTokenAmount}/>
				</FormItem>
			</div>
			<FeeInfoBlock rate={rate} fee={feeProcent}/>
			<Div>
				<Button stretched size="l" className='swap-btn' id={disabled ? "disabled-btn" : undefined} onClick={()=> props.setActiveModal(ROUTES.MODAL_OPEN)}>
					Swap
				</Button>
			</Div>
		</Group>
	);
}
const mapStateToProps=(state)=>({
	addressReducer: state.addressReducer
})

export default connect(mapStateToProps, {setFromAmount,setToAmount,setSelectedToken,setFromToken,setToToken}) (Swap);
