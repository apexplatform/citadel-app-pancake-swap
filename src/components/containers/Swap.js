import React, { useEffect, useState } from 'react';
import { FormItem,Div, Button, Group } from '@vkontakte/vkui';
import '../styles/panels/swap.css'
import AmountInput from '../uikit/AmountInput'
import TokenSelect from '../uikit/TokenSelect'
import {prepareSwapTransfer,swapTokens} from '../../store/actions/swapActions'
import {setSelectedToken} from '../../store/actions/walletActions'
import Header from '../uikit/Header'
import {formatNumber} from '../helpers/numberFormatter'
import {connect} from 'react-redux';
import Icon from '../uikit/Icon'
import {setFromToken,setToToken,setFromAmount,setToAmount} from '../../store/actions/walletActions'
import FeeInfoBlock from '../uikit/FeeInfoBlock'
const Swap = (props) => {
	const [disabled,setDisabled] = useState(true)
	const [swaped,setSwaped] = useState(false)
	const {poolInfo,initialRate,rate,slippage,slippageTolerance} = props.swapReducer
	const {fromToken,toToken,fromTokenAmount,toTokenAmount,currentWallet} = props.walletReducer
    const feeProcent = poolInfo?.fee || 1
	const balanceSwaped = toTokenAmount * +initialRate * (100 - feeProcent) / 100
    const balance = fromTokenAmount * +initialRate * (100 + feeProcent) / 100
	const showFee = fromToken.network.toLowerCase() === currentWallet.network
	const showFee2 = toToken.network.toLowerCase() === currentWallet.network
	const reverseTokens = () => {
		props.setFromToken(toToken)
		props.setToToken(fromToken)
		if(swaped){
			props.setFromAmount(toTokenAmount)
			props.setToAmount(formatNumber(balanceSwaped))
		}else{
			props.setToAmount(fromTokenAmount)
			props.setFromAmount(formatNumber(balance))
		}
		// props.swapTokens(fromTokenAmount)
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
					<AmountInput setDisabled={setDisabled} hideFee={!showFee} hideMax={true} isFirst={true} amount={fromTokenAmount}/>
				</FormItem>
			</div>
			<Div className='center'>
				<div className="delimeter"></div>
				<button className='swap-amount-btn' onClick={() => reverseTokens()}>
					<Icon icon='swap' fill={'#792EC0'}/>
				</button>
				<div className="delimeter"></div>
			</Div>
			<div className='swap-row'>
				<FormItem top="To token" className='formTokenItem' onClick={() => props.setSelectedToken('to')}>
					<TokenSelect selectedToken={toToken}/>
				</FormItem>
				<FormItem top="Amount to receive" className='formAddressItem'>
					<AmountInput setDisabled={setDisabled} isSecond={true} hideMax={false} hideFee={!showFee2} amount={toTokenAmount}/>
				</FormItem>
			</div>
			<FeeInfoBlock rate={rate} fee={feeProcent}/>
			<Div>
				<Button stretched size="l" className='swap-btn' onClick={() => props.prepareSwapTransfer()} id={disabled ? "disabled-btn" : undefined}>
					Swap
				</Button>
			</Div>
		</Group>
	);
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
	swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {swapTokens,prepareSwapTransfer,setFromAmount,setToAmount,setSelectedToken,setFromToken,setToToken}) (Swap);
