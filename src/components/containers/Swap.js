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
			<Header title="Osmosis swap"/>
			<div className='swap-column'>
				<FormItem top="From token" className='formTokenItem' onClick={() => props.setSelectedToken('from')}>
					<div className='swap-row'>
						<TokenSelect selectedToken={fromToken}/>
						<AmountInput setDisabled={setDisabled} hideFee={!showFee} hideMax={true} isFirst={true} amount={fromTokenAmount}/>
					</div>
					<div className='usd-container'>
						<span>$</span>
						<b>0.05</b>
					</div>
				</FormItem>
			</div>
			<Div className='center swap-block'>
				<div className="delimeter"></div>
				<button className='swap-amount-btn' onClick={() => reverseTokens()}>
					<Icon icon='swap' fill={'#792EC0'}/>
				</button>
				<div className="delimeter"></div>
			</Div>
			<div className='swap-column'>
				<FormItem top="To token" className='formTokenItem' onClick={() => props.setSelectedToken('to')}>
					<div className='swap-row'>
						<TokenSelect selectedToken={toToken}/>
						<AmountInput setDisabled={setDisabled} isSecond={true} hideMax={false} hideFee={!showFee2} amount={toTokenAmount}/>
					</div>
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
