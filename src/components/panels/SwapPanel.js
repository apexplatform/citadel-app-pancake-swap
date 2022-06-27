import React, {useState,useEffect} from 'react';
import { Content, CustomIcon, Modal, SwapBalanceCard, Tabbar, EditAmount, BigButtons, SelectToken, InfoCardBlock, InfoCardItem} from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { errorActions, panelActions, swapActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { formatByDecimals } from "../helpers/numberFormatter";
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
    const { rate, independentField, outAmout, fromUSD, toUSD, swapPools, amount, tokenIn,tokenOut } = useSelector(state => state.swap)
    const { activeWallet, tokens } = useSelector(state => state.wallet)
    const location = useLocation()
    const showModal = useSelector(state => state.errors.openConfirmModal)
    console.log(amount, outAmout)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(panelActions.setPreviousPanel(location.pathname))
        // eslint-disable-next-line
    },[wallets])
    const routes = [
        {
            code: 'cosmos',
            network: 'Cosmos'
        },
        {
            code: 'osmosis',
            network: 'Osmosis'
        }
    ]
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
        dispatch(swapActions.updateSwapInfo(formattedAmounts[dependentField], isExactIn));
      };
    const setAmount = (val, name) => {
        console.log(val,name)
    }
    const setSelectedOption = (token) => {
        navigate(ROUTES.SELECT_TOKEN + '?' + window.location.search.slice(1))
    }
    const checkAmount = (val,name) => {
        console.log(val,name)
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
        dispatch(swapActions.updateSwapInfo(amount, isExactIn));
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
                        name='INPUT'
                        checkAmount={checkAmount}
                        value={formattedAmounts["INPUT"]}  setValue={setAmount} 
                        selectedOption={tokenIn}  setSelectedOption={setSelectedOption} 
                        balanceView={balanceView} setBalanceView={setBalanceView} 
                        onClick={setSelectedOption}
                        />
                    <CustomIcon onClick={reverseTokens} icon='swap-icon' id='swap-center-btn' />
                    <SelectToken 
                            max={true} 
                            balance={true} 
                            usdPrice={toUSD * formattedAmounts["OUTPUT"]}
                            token={true} 
                            data={tokens} 
                            name='OUTPUT'
                            checkAmount={checkAmount}
                            value={formattedAmounts["OUTPUT"]}  setValue={setAmount} 
                            selectedOption={tokenOut}  setSelectedOption={setSelectedOption} 
                            balanceView={balanceView} setBalanceView={setBalanceView} 
                            onClick={setSelectedOption}
                        />
                </div>
            <InfoCardBlock>
                <InfoCardItem text={'Price'} amount={rate} symbol={'OSMO'} symbol2={'ATOM'}/>
                <InfoCardItem text={'Price impact'} amount={10} symbol={'%'}/>
                <InfoCardItem text={'Minimum received'} amount={1} symbol={'OSMO'}/>
                <InfoCardItem text={'Liquidity Provider Fee'} amount={5} symbol={'%'}/>
                <InfoCardItem text={'Route'} routes={routes}/>
            </InfoCardBlock>
            <EditAmount data={{code: '%'}} style={{marginTop: '20px'}} text={'Slippage tolerance'} value={slippage} minValue={1} saveValue={() => {}} maxValue={100}  setValue={setSlippage} />
            <div className='center'>
                <BigButtons text='SWAP' onClick={() => dispatch(errorActions.setConfirmModal(true))} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
            </div>
            </Content>
            <Modal show={showModal && !location.pathname.includes('/info')} showModal={() => dispatch(errorActions.setConfirmModal(false))}>
              <div>
                <div className='row'>
                    <SwapBalanceCard amount='32.432' bgColor='#B7F6FF' color='#00BFDB' token={{name: 'Citedel.one', code: 'XCT', network: 'bsc'}} />
                    <CustomIcon icon='arrow-swap' />
                    <SwapBalanceCard amount='1.3' bgColor='#C6D1FF' color='rgba(58, 94, 229, 1)' token={{name: 'Binance', code: 'BNB', network: 'bsc'}} />
                </div>
                <InfoCardBlock>
                    <InfoCardItem text={'Price'} amount={rate} symbol={'OSMO'} symbol2={'ATOM'}/>
                    <InfoCardItem text={'Price impact'} amount={10} symbol={'%'}/>
                    <InfoCardItem text={'Minimum received'} amount={1} symbol={'OSMO'}/>
                    <InfoCardItem text={'Liquidity Provider Fee'} amount={5} symbol={'%'}/>
                    <InfoCardItem text={'Route'} routes={routes}/>
                </InfoCardBlock>
                <div className='center'>
                    <BigButtons text='SWAP' disabled={true} style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
                </div>
              </div> 
            </Modal>
            <Tabbar config={config}/>
        </div>
    )
}

export default SwapPanel