import { useEffect, useState } from 'react';
import { FormItem,Div,Group } from '@vkontakte/vkui';
import '../styles/panels/swap.css'
import AmountInput from '../uikit/AmountInput'
import TokenSelect from '../uikit/TokenSelect'
import {swapTokens,updateTradeInfo,checkTokenAllowance} from '../../store/actions/swapActions'
import {setSelectedToken} from '../../store/actions/walletActions'
import Header from '../uikit/Header'
import {computeTradePriceBreakdown} from '../../networking/utils/price'
import {connect} from 'react-redux';
import Icon from '../uikit/Icon'
import Loader from '../uikit/Loader'
import {setFromToken,setToToken,setAmount,setFromAmount,setToAmount} from '../../store/actions/walletActions'
import FeeInfoBlock from '../uikit/FeeInfoBlock'
import SwapButton from '../uikit/SwapButton'
const Swap = (props) => {
	const [isExactIn,setExactIn] = useState(true)
	const [loader, setLoader] = useState(true)
	const [independentField, setIndependentField] = useState('INPUT')
	const {trade,parsedAmount} = props.swapReducer
	const {fromToken,toToken,currentWallet, amount} = props.walletReducer
	const showFee = fromToken?.symbol?.toLowerCase() === currentWallet?.symbol
	const showFee2 = toToken?.symbol?.toLowerCase() === currentWallet?.symbol
	const dependentField = independentField === 'INPUT' ? 'OUTPUT' : 'INPUT'
	const formattedPrice = isExactIn ? trade?.executionPrice?.toSignificant(6) : trade?.executionPrice?.invert()?.toSignificant(6)
	const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
	const parsedAmounts =  {
        'INPUT': independentField === 'INPUT' ? parsedAmount : trade?.inputAmount,
        'OUTPUT': independentField === 'OUTPUT' ? parsedAmount : trade?.outputAmount,
      }
	const formattedAmounts = {
		[independentField]: amount,
		[dependentField]: +amount != 0 ? parsedAmounts[dependentField]?.toSignificant(6) : '0',
	}
	//console.log(formattedAmounts,'---formattedAmounts')
	const reverseTokens = () => {
		setIndependentField(dependentField)
		setExactIn(!isExactIn)
		props.setFromToken(toToken)
		props.setToToken(fromToken)
		props.updateTradeInfo(formattedAmounts[independentField], !isExactIn)
	}
	
	useEffect(() => {
		// props.updateTradeInfo(1,isExactIn)
		props.setFromAmount(formattedAmounts['INPUT'])
		props.setToAmount(formattedAmounts['OUTPUT'])
		console.log(fromToken.balance,toToken.balance ,'--fromToken.balance && toToken.balance ')
		//setLoader(fromToken.balance || toToken.balance ? true : false)
	},[fromToken,toToken])
	return (
		<Group className='swap-container'>
			<Header title="Swap"/>
		{ loader ? 
				<>
			<div className='swap-column'>
				<FormItem top={"From" + (independentField === 'OUTPUT' ? ' (estimated)' : '') } className='formTokenItem' onClick={() => props.setSelectedToken('from')}>
					<div className='swap-row'>
						<TokenSelect selectedToken={fromToken}/>
						<AmountInput setExactIn={setExactIn}  name='INPUT' setField={setIndependentField} slippage={priceImpactWithoutFee} hideFee={!showFee} hideMax={true} amount={formattedAmounts['INPUT']} fee={realizedLPFee?.toSignificant(4)} isExactIn={isExactIn}/>
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
				<FormItem top={"To" + (independentField === 'INPUT' ? ' (estimated)' : '')} className='formTokenItem' onClick={() => props.setSelectedToken('to')}>
					<div className='swap-row'>
						<TokenSelect selectedToken={toToken}/>
						<AmountInput setExactIn={setExactIn} setField={setIndependentField} name='OUTPUT' slippage={priceImpactWithoutFee} isExactIn={isExactIn} isSecond={true} hideMax={false} hideFee={!showFee2}  fee={realizedLPFee?.toSignificant(4)} amount={formattedAmounts['OUTPUT']}/>
					</div>
				</FormItem>
			</div>
			<FeeInfoBlock rate={formattedPrice} priceImpact={priceImpactWithoutFee} fee={realizedLPFee?.toSignificant(4) || 0}/>
			<SwapButton />
			</>
			: <Loader id='centered-loader'/> }
		</Group>
	); 
}
const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer,
	swapReducer: state.swapReducer
})

export default connect(mapStateToProps, {checkTokenAllowance,setAmount,updateTradeInfo,swapTokens,setToAmount,setSelectedToken,setFromToken,setToToken,setFromAmount}) (Swap);
