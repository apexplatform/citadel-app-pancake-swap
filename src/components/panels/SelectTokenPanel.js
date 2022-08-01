import React, { useState } from 'react';
import { Content, Header, Tabbar, Search } from '@citadeldao/apps-ui-kit/dist/main';
import AddressBlock from '@citadeldao/apps-ui-kit/dist/components/uiKit/AddressBlock'
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { swapActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { sortList } from '../helpers';
import { prettyNumber } from '../helpers/numberFormatter';
const SelectTokenPanel = () => {
    const config = new Config()
    const { tokens } = useSelector((state) => state.wallet)
    const { tokenIn, tokenOut, selectedToken } = useSelector((state) => state.swap)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeToken = selectedToken === 'INPUT' ? tokenIn : tokenOut
    const secondToken = selectedToken !== 'INPUT' ? tokenIn : tokenOut
    const [tokenList, setTokentList] = useState(sortList(tokens?.filter(elem => elem.symbol !== secondToken.symbol)))
    const back = () => navigate(previousPanel + '?' + window.location.search.slice(1))
    const searchWallet = (wallet) => {
        let arr = tokens.filter(
          (item) =>
            (item.symbol.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase() ||
            item.name.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase()) && item.symbol !== secondToken.symbol
        );
        setTokentList(sortList(arr));
        if (wallet.length < 1) setTokentList(sortList(tokens?.filter(elem => elem.symbol !== secondToken.symbol)));
      };
     
    const setToken = (token) => {
      dispatch(selectedToken === 'INPUT' ? swapActions.setTokenIn(token) : swapActions.setTokenOut(token));
      back();
    }
    return (
        <div className='panel'>
            <Content>
                <Header border title="Select token" style={{margin: '8px 0 16px 0'}} onClick={() => back()} back={true}/>
                <Search style={{marginBottom: '10px'}} onChange={searchWallet} placeholder='Start typing..'/>
                {tokenList?.map((elem,i) =>(
                  <AddressBlock 
                    logoURI={elem.logoURI} 
                    onClick={() => setToken(elem)} 
                    active={activeToken?.symbol === elem?.symbol} 
                    style={{marginBottom: '10px'}} 
                    data={{...elem, code: elem.symbol, balance: prettyNumber(elem?.balance)}} 
                    key={i}
                />  
                ))}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SelectTokenPanel