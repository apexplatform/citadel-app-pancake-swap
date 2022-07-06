import React, {useState,useEffect} from 'react';
import { Content, CustomIcon, Tabbar, EditAmount, BigButtons, SelectToken, InfoCardBlock, InfoCardItem} from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { errorActions, panelActions, swapActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ONE_BIPS } from '../../networking/constants/constants'
import '../styles/panels/swap.css';
import ROUTES from '../../routes';
import BigNumber from "bignumber.js";
const SwapPanel = () => {
    const config = new Config()
    const navigate = useNavigate()
    const { wallets } = useSelector((state) => state.wallet)
    const [slippage, setSlippage] = useState(0)
    const [balanceView, setBalanceView] = useState('View Balance')
    const [isExactIn, setExactIn] = useState(true);
    const { independentField, minReceived, parsedAmount, amount, trade, tokenIn, tokenOut } = useSelector(state => state.swap)
    const { tokens } = useSelector(state => state.wallet)
    const formattedPrice = trade?.executionPrice?.toSignificant(6)
    const { priceImpactWithoutFee, realizedLPFee } = swapActions.getTradeFeePrice()
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
                logoURI: item.tokenInfo.logoURI,
                name: item.symbol
            }
        })
        isBNB = false
    }
    console.log(routes,'----routes')
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
        dispatch(swapActions.setTokenIn(tokenOut));
        dispatch(swapActions.setAmount(formattedAmounts[dependentField]));
        dispatch(swapActions.setTokenOut(tokenIn));
        dispatch(swapActions.updateSwapInfo(formattedAmounts[dependentField], isExactIn));
    };

    const setSelectedOption = (name) => {
        dispatch(swapActions.setSelectedToken(name))
        navigate(ROUTES.SELECT_TOKEN  + '?' + window.location.search.slice(1))
    }

    const setMaxValue = (val) => {
        setExactIn(val === "INPUT" ? true : false);
        formattedAmounts[val] = 100 // max balance
        dispatch(swapActions.setAmount(formattedAmounts[val]));
        dispatch(swapActions.updateSwapInfo(formattedAmounts[val],isExactIn));
    }

    const checkAmount = (val,name) => {
        // eslint-disable-next-line 
        val = val.replace(/[^0-9\.]/g, "");
        let amount = val
        if(val.split(".").length - 1 !== 1 && val[val.length-1] === '.') return
        if (
          val.length === 2 &&
          val[1] !== "." &&
          val[1] === "0"
        ) {
            dispatch(swapActions.setAmount(val));
            amount = val
        } else if (val[0] === "0" && val[1] !== ".") {
            amount = BigNumber(val).toFixed()
            dispatch(swapActions.setAmount(BigNumber(val).toFixed()));
        } else {
            dispatch(swapActions.setAmount(val));
        }
        dispatch(swapActions.setIndependentField(name));
        setExactIn(name === "INPUT" ? true : false);
        dispatch(swapActions.getSwapInfo(amount, isExactIn));
      };
    return (
        <div className='panel'>
            <Content>
                <div className='swap-inputs'>
                    <SelectToken 
                        max={true} 
                        balance={true} 
                        token={true} 
                        data={tokens} 
                        action={true}
                        name='INPUT'
                        title="From token"
                        onMaxClick={() => setMaxValue('INPUT')}
                        checkAmount={checkAmount}
                        value={formattedAmounts["INPUT"]} 
                        selectedOption={{...tokenIn, code: tokenIn.symbol }} 
                        balanceView={balanceView} setBalanceView={setBalanceView} 
                        onClick={() => setSelectedOption('INPUT')}
                        />
                    <CustomIcon onClick={reverseTokens} icon='swap-icon' id='swap-center-btn' />
                    <SelectToken 
                            max={true} 
                            balance={true} 
                            token={true} 
                            data={tokens} 
                            action={true}
                            name='OUTPUT'
                            title="To token"
                            onMaxClick={() => setMaxValue('OUTPUT')}
                            checkAmount={checkAmount}
                            value={formattedAmounts["OUTPUT"]}
                            selectedOption={{...tokenOut, code: tokenOut.symbol }} 
                            balanceView={balanceView} setBalanceView={setBalanceView} 
                            onClick={() => setSelectedOption('OUTPUT')}
                        />
                </div>
            <InfoCardBlock>
                <InfoCardItem text={'Price'} amount={formattedPrice || '-'} symbol={tokenIn.symbol} symbol2={tokenOut.symbol}/>
                <InfoCardItem text={'Price impact'} amount={priceImpactWithoutFee ? (priceImpactWithoutFee.lessThan(ONE_BIPS) ? '<0.01' : `${priceImpactWithoutFee.toFixed(2)}`) : '-'} symbol={'%'}/>
                <InfoCardItem text={'Minimum received'} amount={minReceived !== 0 ? minReceived?.toSignificant(4) : minReceived} symbol={tokenOut.symbol}/>
                <InfoCardItem text={'Liquidity Provider Fee'} amount={realizedLPFee?.toSignificant(4) || 0} symbol={priceImpactWithoutFee ? '%' : ''}/>
                <InfoCardItem text={'Route'} routes={routes}/>
            </InfoCardBlock>
            <EditAmount data={{code: '%'}} style={{marginTop: '20px'}} text={'Slippage tolerance'} value={slippage} minValue={0} saveValue={() => {}} maxValue={100000}  setValue={setSlippage} />
            <div className='center'>
                <BigButtons text='SWAP' onClick={() => dispatch(errorActions.setConfirmModal(true))} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
            </div>
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SwapPanel