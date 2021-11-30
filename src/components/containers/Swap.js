import { useEffect, useState } from 'react';
import { FormItem,Div,Group } from '@vkontakte/vkui';
import '../styles/panels/swap.css'
import AmountInput from '../uikit/AmountInput'
import TokenSelect from '../uikit/TokenSelect'
import {swapTokens,updateTradeInfo,checkTokenAllowance,checkSwapStatus,setIndependentField,setSwapStatus} from '../../store/actions/swapActions'
import Header from '../uikit/Header'
import {computeTradePriceBreakdown} from '../../networking/utils/price'
import {connect} from 'react-redux';
import Icon from '../uikit/Icon'
import Loader from '../uikit/Loader'
import {setLoader} from '../../store/actions/panelActions'
import {setFromToken,setToToken,setAmount,setFromAmount,setToAmount} from '../../store/actions/walletActions'
import FeeInfoBlock from '../uikit/FeeInfoBlock'
import SwapButton from '../uikit/SwapButton'
import Updater from '../../networking/utils/updater'
const Swap = (props) => {
	const [isExactIn,setExactIn] = useState(true)
	const {trade,parsedAmount,independentField,allowanceAmount} = props.swapReducer
	const {fromToken,toToken,currentWallet, amount} = props.walletReducer
	const showFee = fromToken?.symbol?.toLowerCase() === currentWallet?.code
	const showFee2 = toToken?.symbol?.toLowerCase() === currentWallet?.code
	const dependentField = independentField === 'INPUT' ? 'OUTPUT' : 'INPUT'
	const formattedPrice = trade?.executionPrice?.toSignificant(6)
	const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
	const parsedAmounts =  {
        'INPUT': independentField === 'INPUT' ? parsedAmount : trade?.inputAmount,
        'OUTPUT': independentField === 'OUTPUT' ? parsedAmount : trade?.outputAmount,
      }
	const formattedAmounts = {
		[independentField]: amount,
		[dependentField]: +amount != 0 ? parsedAmounts[dependentField]?.toSignificant(6) || 0 : '0',
	}
	const reverseTokens = () => {
		props.setIndependentField(dependentField)
		setExactIn(!isExactIn)
		props.setFromToken(toToken)
		props.setToToken(fromToken)
		props.updateTradeInfo(formattedAmounts[independentField], !isExactIn)
	}
	useEffect(() => {
		props.setFromAmount(formattedAmounts['INPUT'])
		props.setToAmount(formattedAmounts['OUTPUT'])
    	props.checkSwapStatus(formattedAmounts['INPUT'])
		if(!trade && +amount != 0){
			console.log('--update trade--')
			props.updateTradeInfo(amount, isExactIn)
		}
	},[fromToken,toToken,trade,allowanceAmount,amount])
	return (
		<Group className='swap-container'>
			<Header title="Swap"/>
		{/* { loader ?  */}
				<>
			<div className='swap-column'>
				<FormItem top={"From" + (independentField === 'OUTPUT' ? ' (estimated)' : '') } className='formTokenItem'>
					<div className='swap-row'>
						<TokenSelect selectedToken={fromToken} name='from'/>
						<AmountInput inputAmount={formattedAmounts['OUTPUT']} setExactIn={setExactIn}  name='INPUT' setField={setIndependentField} slippage={priceImpactWithoutFee} hideFee={!showFee} hideMax={true} amount={formattedAmounts['INPUT']} fee={realizedLPFee?.toSignificant(4) || 0.02} isExactIn={isExactIn}/>
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
				<FormItem top={"To" + (independentField === 'INPUT' ? ' (estimated)' : '')} className='formTokenItem' >
					<div className='swap-row'>
						<TokenSelect selectedToken={toToken} name='to'/>
						<AmountInput setExactIn={setExactIn} inputAmount={formattedAmounts['INPUT']} setField={setIndependentField} name='OUTPUT' slippage={priceImpactWithoutFee} isExactIn={isExactIn} isSecond={true} hideMax={false} hideFee={!showFee2}  fee={realizedLPFee?.toSignificant(4) || 0.02} amount={formattedAmounts['OUTPUT']}/>
					</div>
				</FormItem>
			</div>
			<FeeInfoBlock rate={formattedPrice} priceImpact={priceImpactWithoutFee} fee={realizedLPFee?.toSignificant(4) || 0}/>
			<SwapButton isExactIn={isExactIn}/>
			<Updater/>
			</>
		</Group>
	); 
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
	swapReducer: state.swapReducer,
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setLoader,checkSwapStatus,setSwapStatus,setIndependentField,checkTokenAllowance,setAmount,updateTradeInfo,swapTokens,setToAmount,setFromToken,setToToken,setFromAmount}) (Swap);
