import React, {useState,useEffect} from 'react';
import { Content, CustomIcon, Header, Tabbar, EditAmount, BigButtons, SelectToken, InfoCardBlock, InfoCardItem} from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { panelActions } from '../../store/actions'
import '../styles/panels/swap.css'
const SwapPanel = () => {
    const config = new Config()
    const { wallets } = useSelector((state) => state.wallet)
    const [value, setValue] = useState(0)
    const [balanceView, setBalanceView] = useState('View Balance')
    const data = [
        {
            network: 'Secret',
            name: 'SECRET',
            net: 'secret',
            code: 'SCRT',
            symbol: 'SCRT',
            balance: 20450.5,
            usdPrice: 450.05,
        },
        {
            network: 'Osmosis',
            code: 'OSMO',
            name: 'OSMOSIS',
            symbol: 'SCRT',
            net: 'osmosis',
            balance: 20450.5,
            usdPrice: 450.05
        },
        {
            network: 'Sifchain',
            code: 'ROWAN',
            name: 'SIFCHAIN',
            symbol: 'SCRT',
            net: 'sifchain',
            balance: 20450.5,
            usdPrice: 450.05
        },
        {
            network: 'Sifchain',
            name: 'SIFCHAIN',
            code: 'ROWAN',
            symbol: 'SCRT',
            net: 'sifchain',
            balance: 20450.5,
            usdPrice: 450.05,
        }
    ]
    const [selectedOption, setSelectedOption] = useState(data[0])
    const location = useLocation()
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
    return (
        <div className='panel'>
            <Header config={config}/>
            <Content>
                <div className='swap-inputs'>
                <SelectToken 
                    max={true} 
                    usdPrice='23' 
                    balance={true} 
                    token={true} 
                    data={data} 
                    value={value}  setValue={setValue} 
                    selectedOption={selectedOption}  setSelectedOption={setSelectedOption} 
                    balanceView={balanceView} setBalanceView={setBalanceView} 
                    onClick={() => console.log(value)}
                    />
            <CustomIcon icon='swap-icon' id='swap-center-btn' />
            <SelectToken 
                    max={true} 
                    balance={true} 
                    token={true} 
                    data={data} 
                    value={value}  setValue={setValue} 
                    selectedOption={selectedOption}  setSelectedOption={setSelectedOption} 
                    balanceView={balanceView} setBalanceView={setBalanceView} 
                    onClick={() => console.log(value)}
                    />
                </div>
            <InfoCardBlock>
                <InfoCardItem text={'Price'} amount={2.012} symbol={'OSMO'} symbol2={'ATOM'}/>
                <InfoCardItem text={'Price impact'} amount={10} symbol={'%'}/>
                <InfoCardItem text={'Minimum received'} amount={1} symbol={'OSMO'}/>
                <InfoCardItem text={'Liquidity Provider Fee'} amount={5} symbol={'%'}/>
                <InfoCardItem text={'Route'} routes={routes}/>
            </InfoCardBlock>
            <EditAmount data={{code: '%'}} style={{marginTop: '20px'}} text={'Slippage tolerance'} value={value} minValue={1} maxValue={100}  setValue={setValue} />
            <div className='center'>
                <BigButtons text='SWAP' style={{marginTop: '20px'}} textColor='#FFFFFF' bgColor='#7C63F5'  hideIcon={true}/>
            </div>
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SwapPanel