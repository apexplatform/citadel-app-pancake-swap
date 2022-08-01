import React, {useState,useEffect} from 'react';
import { Content, CustomIcon, Tabbar, EditAmount, SelectToken, InfoCardBlock, InfoCardItem} from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { panelActions, swapActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ONE_BIPS } from '../../networking/constants/constants';
import '../styles/panels/swap.css';
import SwapButton from '../uikit/SwapButton';
import ROUTES from '../../routes';
import BigNumber from "bignumber.js";
import ConfirmModal from '../uikit/ConfirmModal';
import { prettyNumber } from '../helpers/numberFormatter';
const SwapPanel = () => {
    const config = new Config()
    const navigate = useNavigate()
    const { wallets } = useSelector((state) => state.wallet)
    const [balanceView, setBalanceView] = useState('View Balance')
    const { independentField, minReceived, slippageTolerance, isExactIn, parsedAmount, amount, trade, tokenIn, tokenOut } = useSelector(state => state.swap)
    const [slippage, setSlippage] = useState(slippageTolerance)
    const [isExact, setExactIn] = useState(isExactIn);
    const { tokens } = useSelector(state => state.wallet)
    const formattedPrice = trade?.executionPrice?.toSignificant(6)
    const { priceImpactWithoutFee, realizedLPFee } = swapActions.getTradeFeePrice(trade)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(panelActions.setPreviousPanel(location.pathname))
        // eslint-disable-next-line
    },[wallets])
    const dependentField = independentField === "INPUT" ? "OUTPUT" : "INPUT";
    const parsedAmounts =  {
        'INPUT': independentField === 'INPUT' ? parsedAmount : trade?.inputAmount,
        'OUTPUT': independentField === 'OUTPUT' ? parsedAmount : trade?.outputAmount,
    }
    let isBNB = false
    let routes = []
    if(tokenIn.symbol === 'BNB' && tokenOut.symbol === 'WBNB'){
        routes.push({logoURI: tokenIn.logoURI, name: tokenIn.symbol})
        routes.push({logoURI: tokenOut.logoURI, name: tokenOut.symbol})
        isBNB = true
    }else if(tokenIn.symbol === 'WBNB' && tokenOut.symbol === 'BNB'){
        routes.push({logoURI: tokenIn.logoURI, name: tokenIn.symbol})
        routes.push({logoURI: tokenOut.logoURI, name: tokenOut.symbol})
        isBNB = true
    }else if(trade?.route?.path){
        routes = trade?.route?.path.map(item => {
            return {
                logoURI: item.tokenInfo?.logoURI,
                name: item.symbol
            }
        })
        isBNB = false
    }
    let formattedAmounts = {}
	if(isBNB){
		formattedAmounts = {
			[independentField]: amount,
			[dependentField]: amount,
		}
	}else{
		formattedAmounts = {
			[independentField]: amount,
			[dependentField]: +amount !== 0 ? parsedAmounts[dependentField]?.toSignificant(6) || 0 : '0',
		}
	}

    const reverseTokens = () => {
        dispatch(swapActions.setIndependentField(dependentField));
        dispatch(swapActions.setTokenIn(tokenOut));
        dispatch(swapActions.setTokenOut(tokenIn));
        dispatch(swapActions.setAmount(formattedAmounts[independentField],!isExact));
        dispatch(swapActions.getSwapInfo(formattedAmounts[independentField],!isExact));
        setExactIn(!isExact)
    };
    const setSelectedOption = (name) => {
        dispatch(swapActions.setIndependentField("INPUT"));
        setExactIn(true)
        dispatch(swapActions.setAmount(formattedAmounts["INPUT"],true));
        dispatch(swapActions.setSelectedToken(name))
        navigate(ROUTES.SELECT_TOKEN)
    }

    const setMaxValue = (val) => {
        setExactIn(val === "INPUT" ? true : false);
        dispatch(swapActions.setIndependentField(val));
        formattedAmounts[val] = val === "INPUT" ? tokenIn.balance : tokenOut.balance
        if(formattedAmounts[val] === 0 || formattedAmounts[val] === '~0'){
            dispatch(swapActions.setSwapStatus('insufficientBalance'))
            formattedAmounts[val] = 0
        }
        let currentToken = val === "INPUT" ? tokenIn : tokenOut
        if(currentToken.symbol === 'BNB' && formattedAmounts[val] > 0.01){
            formattedAmounts[val] = formattedAmounts[val] - 0.01
        }
        dispatch(swapActions.setAmount(formattedAmounts[val],val === "INPUT" ? true : false));
        dispatch(swapActions.getSwapInfo(formattedAmounts[val],val === "INPUT" ? true : false));
    }
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
    useEffect(() => { 
        function handleResize() {
            const { innerWidth: width } = window;
            setWindowDimensions(width);
        }
        window.addEventListener('resize', handleResize);

        let interval = null;
		if (!trade && +amount !== 0) {
			interval = setInterval(() => {
                dispatch(swapActions.getSwapInfo(amount,isExact));
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => { clearInterval(interval); window.removeEventListener('resize', handleResize)};

        // eslint-disable-next-line 
    },[amount,tokenIn,tokenOut,trade])

    const checkAmount = (val,name) => {
        // eslint-disable-next-line 
        val = val.replace(/[^0-9\.]/g, "");
        if(val.split(".").length - 1 !== 1 && val[val.length-1] === '.') return
        if (
          val.length === 2 &&
          val[1] !== "." &&
          val[1] === "0"
        ) {
            dispatch(swapActions.setAmount(val,name === "INPUT" ? true : false));
        } else if (val[0] === "0" && val[1] !== ".") {
            dispatch(swapActions.setAmount(BigNumber(val).toFixed(),name === "INPUT" ? true : false));
        } else {
            dispatch(swapActions.setAmount(val,name === "INPUT" ? true : false));
        }
        dispatch(swapActions.setIndependentField(name));
        setExactIn(name === "INPUT" ? true : false);
        dispatch(swapActions.getSwapInfo(val,name === "INPUT" ? true : false));
      };

    const setSlippageTolerance = (val) => {
        setSlippage(val)
        dispatch(swapActions.setSlippageTolerance(val))
    }
    return (
        <div className='panel swap-panel'>
            <Content>
                <div className='swap-inputs'>
                    <SelectToken 
                        max={true} 
                        balance={true} 
                        token={true} 
                        data={tokens} 
                        style={{marginBottom: '30px'}}
                        action={true}
                        field='from'
                        name='INPUT'
                        title="From token"
                        onMaxClick={() => setMaxValue('INPUT')}
                        checkAmount={checkAmount}
                        checkValue={() => {}}
                        value={formattedAmounts["INPUT"]} 
                        selectedOption={{...tokenIn, code: tokenIn.symbol, balance: prettyNumber(tokenIn?.balance)}} 
                        balanceView={balanceView} setBalanceView={setBalanceView} 
                        onClick={() => setSelectedOption('INPUT')}
                        />
                    <CustomIcon onClick={reverseTokens} icon='swap-icon' id='swap-center-btn' size={windowDimensions < 500 ? 'small' : 'big'} />
                    <SelectToken 
                            max={true} 
                            balance={true} 
                            token={true} 
                            data={tokens} 
                            action={true}
                            field='to'
                            checkValue={() => {}}
                            name='OUTPUT'
                            title="To token"
                            onMaxClick={() => setMaxValue('OUTPUT')}
                            checkAmount={checkAmount}
                            value={formattedAmounts["OUTPUT"]}
                            selectedOption={{...tokenOut, code: tokenOut.symbol, balance: prettyNumber(tokenOut?.balance)}} 
                            balanceView={balanceView} setBalanceView={setBalanceView} 
                            onClick={() => setSelectedOption('OUTPUT')}
                        />
                </div>
            <InfoCardBlock style={{marginTop: '10px'}}>
                <InfoCardItem text={'Price'} symbol={tokenOut.symbol} symbol2={tokenIn.symbol}><span className='purple-text'>{formattedPrice || '-'}</span></InfoCardItem>
                <InfoCardItem text={'Price impact'} symbol={'%'}><span className='green-text'>{priceImpactWithoutFee ? (priceImpactWithoutFee.lessThan(ONE_BIPS) ? '<0.01' : `${priceImpactWithoutFee.toFixed(2)}`) : '-'}</span></InfoCardItem>
                <InfoCardItem text={'Minimum received'} symbol={tokenOut.symbol}><span className='purple-text'>{minReceived !== 0 ? minReceived?.toSignificant(4) : minReceived}</span></InfoCardItem>
                <InfoCardItem text={'Liquidity Provider Fee'} symbol={tokenIn.symbol}><span className='pink-text'>{realizedLPFee?.toSignificant(4) || 0}</span></InfoCardItem>
                <InfoCardItem text={'Route'} routes={routes}/>
            </InfoCardBlock>
            <EditAmount data={{code: '%'}} style={{marginTop: '20px'}} text={'Slippage tolerance'} value={slippage} minValue={0} saveValue={() => {}} maxValue={100000}  setValue={setSlippageTolerance} />
            <SwapButton isBNB={isBNB}/>
            </Content>
            <ConfirmModal />
            <Tabbar config={config}/>
        </div>
    )
}

export default SwapPanel