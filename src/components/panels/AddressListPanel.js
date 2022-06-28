import React, {useState,useEffect} from 'react';
import { Content, CustomIcon, Header, Tabbar, SelectToken, DropdownSearch } from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { panelActions } from '../../store/actions'
import '../styles/panels/swap.css'
const AddressListPanel = () => {
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
          
                {/* <NotificationCard text={text.AUTORESTAKE_ALERT} iconColor='#00B2FE' textColor='#026573' bgColor='#F3FCFD'/>
                <NotificationCard text={text.LEDGER_ALERT_TEXT} description={text.LEDGER_ALERT_DESCRIPTION} iconColor='#FAA305' textColor='#000' bgColor='#FFEDCD'/>  */}
                {/* {wallets?.map((elem,i) =>(
                    <AddressCard data={elem} key={i}/>  
                ))} */}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default AddressListPanel