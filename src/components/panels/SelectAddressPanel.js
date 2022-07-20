import React, { useState } from 'react';
import { Content, Header, Tabbar, Search } from '@citadeldao/apps-ui-kit/dist/main';
import AddressBlock from '@citadeldao/apps-ui-kit/dist/components/uiKit/AddressBlock'
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { walletActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { formatByDecimals } from '../helpers/numberFormatter';
const SelectAddressPanel = () => {
    const config = new Config()
    const { wallets, activeWallet } = useSelector((state) => state.wallet)
    const [walletList, setWalletList] = useState(wallets)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const back = () => navigate(previousPanel)
    const searchWallet = (wallet) => {
        let arr = wallets.filter(
          (item) =>
            item.code.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase() ||
            item.name.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase() ||
            item.address.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase()
        );
        setWalletList(arr);
        if (wallet.length < 1) setWalletList(wallets);
      };
    const setActiveWallet = (wallet) => {
      dispatch(walletActions.setActiveWallet(wallet))
      back();
    }
    return (
        <div className='panel'>
            <Header border title="Select an address" style={{marginTop: '10px'}} onClick={() => back()} back={true}/>
            <Content>
                <Search style={{marginBottom: '10px'}} onChange={searchWallet} placeholder='Start typing..'/>
                {walletList?.map((elem,i) =>(
                  <AddressBlock onClick={() => setActiveWallet(elem)} active={activeWallet?.address === elem?.address} style={{marginBottom: '10px'}} data={{...elem, balance: formatByDecimals(elem?.balance,6)}} key={i}/>  
                ))}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SelectAddressPanel