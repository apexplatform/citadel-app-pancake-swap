import React, {useState,useEffect} from 'react';
import { Content, CustomIcon, Tabbar, EditAmount, SelectToken, InfoCardBlock, InfoCardItem} from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { panelActions, swapActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { formatByDecimals } from "../helpers/numberFormatter";
import '../styles/panels/swap.css';
import ROUTES from '../../routes';
import BigNumber from "bignumber.js";
import SwapButton from '../uikit/SwapButton';
import ConfirmModal from '../uikit/ConfirmModal';
const SwapPanel = () => {
    const config = new Config()
    const navigate = useNavigate()
    const { wallets } = useSelector((state) => state.wallet)
    const [slippage, setSlippage] = useState(0)
    const [balanceView, setBalanceView] = useState('View Balance')
    const [isExactIn, setExactIn] = useState(true);
    const { rate, independentField, routes, outAmout, fromUSD, toUSD, amount, tokenIn,tokenOut } = useSelector(state => state.swap)
    const { tokens } = useSelector(state => state.wallet)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(panelActions.setPreviousPanel(location.pathname))
        // eslint-disable-next-line
    },[wallets])
    const dependentField = independentField === "INPUT" ? "OUTPUT" : "INPUT";
    const parsedAmounts = {
        INPUT: independentField === "INPUT" ? amount : outAmout,
        OUTPUT: independentField === "OUTPUT" ? amount : outAmout,
    };
    const formattedAmounts = {
        [independentField]: formatByDecimals(amount,+tokenIn?.decimals),
        [dependentField]: formatByDecimals(parsedAmounts[dependentField],+tokenOut?.decimals),
    };
    const reverseTokens = () => {
        dispatch(swapActions.setTokenIn(tokenOut));
        dispatch(swapActions.setAmount(formattedAmounts[dependentField]));
        dispatch(swapActions.setTokenOut(tokenIn));
        dispatch(swapActions.getSwapInfo(formattedAmounts[dependentField], isExactIn));
    };
    const setSelectedOption = (name) => {
        dispatch(swapActions.setSelectedToken(name))
        navigate(ROUTES.SELECT_TOKEN  + '?' + window.location.search.slice(1))
    }

    const setMaxValue = (val) => {
        setExactIn(val === "INPUT" ? true : false);
        formattedAmounts[val] = 100 // max balance
        dispatch(swapActions.setAmount(formattedAmounts[val]));
        dispatch(swapActions.getSwapInfo(formattedAmounts[val],isExactIn));
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
                        usdPrice={fromUSD * formattedAmounts["INPUT"]} 
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
                        value={formattedAmounts["INPUT"]} 
                        selectedOption={tokenIn} 
                        balanceView={balanceView} setBalanceView={setBalanceView} 
                        onClick={() => setSelectedOption('INPUT')}
                        />
                    <CustomIcon onClick={reverseTokens} icon='swap-icon' id='swap-center-btn' />
                    <SelectToken 
                            max={true} 
                            balance={true} 
                            usdPrice={toUSD * formattedAmounts["OUTPUT"]}
                            token={true} 
                            data={tokens} 
                            action={true}
                            field='to'
                            name='OUTPUT'
                            title="To token"
                            onMaxClick={() => setMaxValue('OUTPUT')}
                            checkAmount={checkAmount}
                            value={formattedAmounts["OUTPUT"]}
                            selectedOption={tokenOut} 
                            balanceView={balanceView} setBalanceView={setBalanceView} 
                            onClick={() => setSelectedOption('OUTPUT')}
                        />
                </div>
            <InfoCardBlock   style={{marginTop: '10px'}}>
                <InfoCardItem text={'Price'} amount={rate} symbol={'OSMO'} symbol2={'ATOM'}/>
                <InfoCardItem text={'Price impact'} amount={10} symbol={'%'}/>
                <InfoCardItem text={'Minimum received'} amount={1} symbol={'OSMO'}/>
                <InfoCardItem text={'Liquidity Provider Fee'} amount={5} symbol={'%'}/>
                <InfoCardItem text={'Route'} routes={routes}/>
            </InfoCardBlock>
            <EditAmount data={{code: '%'}} style={{marginTop: '20px'}} text={'Slippage tolerance'} value={slippage} minValue={0} saveValue={() => {}} maxValue={100000}  setValue={setSlippage} />
            <SwapButton />
            </Content>
            <ConfirmModal />
            <Tabbar config={config}/>
        </div>
    )
}

export default SwapPanel