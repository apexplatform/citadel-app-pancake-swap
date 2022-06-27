import React, { useState } from 'react';
import { Content, Header, Tabbar, Search } from '@citadeldao/apps-ui-kit/dist/main';
import AddressBlock from '@citadeldao/apps-ui-kit/dist/components/uiKit/AddressBlock'
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { walletActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
const SelectTokenPanel = () => {
    const config = new Config()
    const { tokens, activeWallet } = useSelector((state) => state.wallet)
    const [tokenList, setTokentList] = useState(tokens)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const back = () => navigate(previousPanel + '?' + window.location.search.slice(1))
    const searchWallet = (wallet) => {
        let arr = tokens.filter(
          (item) =>
            item.code.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase() ||
            item.name.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase() ||
            item.address.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase()
        );
        setTokentList(arr);
        if (wallet.length < 1) setTokentList(tokens);
      };
      console.log(tokenList)
    return (
        <div className='panel'>
            <Header title="Select token" style={{marginTop: '10px'}} onClick={() => back()} back={true}/>
            <Content>
                <Search style={{marginBottom: '10px'}} onChange={searchWallet} placeholder='Start typing..'/>
                {tokenList?.map((elem,i) =>(
                    <AddressBlock onClick={() => dispatch(walletActions.setActiveWallet(elem))} active={activeWallet?.address === elem?.address} style={{marginBottom: '10px'}} data={elem} key={i}/>  
                ))}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SelectTokenPanel