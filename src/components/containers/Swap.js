import React, { useEffect, useState } from 'react';
import { FormItem,Div, Button, Group } from '@vkontakte/vkui';
import '../styles/panels/swap.css'
import AmountInput from '../uikit/AmountInput'
import TokenSelect from '../uikit/TokenSelect'
import {prepareSwapTransfer,swapTokens} from '../../store/actions/swapActions'
import {setSelectedToken} from '../../store/actions/walletActions'
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import {Dec,IntPretty} from '@keplr-wallet/unit'
import Icon from '../uikit/Icon'
import {setFromToken,setToToken,setFromAmount,setToAmount} from '../../store/actions/walletActions'
import FeeInfoBlock from '../uikit/FeeInfoBlock'
const Swap = (props) => {
	const [disabled,setDisabled] = useState(true)
	const [swaped,setSwaped] = useState(false)
	const {poolInfo,initialRate,rate} = props.swapReducer
	console.log(initialRate,'----rate')
	const {fromToken,toToken,fromTokenAmount,toTokenAmount,currentWallet} = props.walletReducer
    const feeProcent = (+poolInfo?.poolParams?.swapFee * 100) || 1
	const balanceSwaped = +toTokenAmount !== 0 ? new Dec((toTokenAmount * +initialRate * (100 - feeProcent) / 100).toString()) : toTokenAmount
    const balance = +fromTokenAmount !== 0 ? new Dec((fromTokenAmount * +initialRate * (100 + feeProcent) / 100).toString()) : fromTokenAmount
	const showFee = fromToken.network === currentWallet.network
	const showFee2 = toToken.network === currentWallet.network
	const reverseTokens = () => {
		props.setFromToken(toToken)
		props.setToToken(fromToken)
		if(swaped){
			props.setFromAmount(toTokenAmount)
			const intval = +balanceSwaped !== 0 ? new IntPretty(balanceSwaped).maxDecimals(3).toString() : balanceSwaped
			props.setToAmount(intval.toString().replaceAll(',',''))
		}else{
			props.setToAmount(fromTokenAmount)
			const intval2 = +balance !== 0 ? new IntPretty(balance).maxDecimals(3).toString() : balance
			props.setFromAmount(intval2.toString().replaceAll(',',''))
		}
		props.swapTokens(fromTokenAmount)
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
				<Button stretched size="l" className='swap-btn' id={disabled ? "disabled-btn" : undefined} onClick={()=> props.prepareSwapTransfer()}>
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
