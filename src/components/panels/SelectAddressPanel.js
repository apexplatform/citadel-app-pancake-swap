import React from 'react';
import { Content, Header, Tabbar, Search } from '@citadeldao/apps-ui-kit/dist/main';
import AddressBlock from '@citadeldao/apps-ui-kit/dist/components/uiKit/AddressBlock'
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { walletActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
const SelectAddressPanel = () => {
    const config = new Config()
    const { wallets, activeWallet } = useSelector((state) => state.wallet)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const back = () => navigate(previousPanel + '?' + window.location.search.slice(1))
    return (
        <div className='panel'>
            <Header title="Select an address" style={{marginTop: '10px'}} onClick={() => back()} back={true}/>
            <Content>
                <Search style={{marginBottom: '10px'}} placeholder='Start typing..'/>
                {wallets?.map((elem,i) =>(
                    <AddressBlock onClick={() => dispatch(walletActions.setActiveWallet(elem))} active={activeWallet?.address === elem?.address} style={{marginBottom: '10px'}} data={elem} key={i} usdPrice='312'/>  
                ))}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SelectAddressPanel