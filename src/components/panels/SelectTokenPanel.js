import React, { useState } from 'react';
import { Content, Header, Tabbar, Search } from '@citadeldao/apps-ui-kit/dist/main';
import AddressBlock from '@citadeldao/apps-ui-kit/dist/components/uiKit/AddressBlock'
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { swapActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
const SelectTokenPanel = () => {
    const config = new Config()
    const { tokens } = useSelector((state) => state.wallet)
    const { tokenIn, tokenOut, selectedToken } = useSelector((state) => state.swap)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeToken = selectedToken === 'INPUT' ? tokenIn : tokenOut
    const secondToken = selectedToken !== 'INPUT' ? tokenIn : tokenOut
    const [tokenList, setTokentList] = useState(tokens?.filter(elem => elem.code !== secondToken.code))
    const back = () => navigate(previousPanel + '?' + window.location.search.slice(1))
    const searchWallet = (wallet) => {
        let arr = tokens.filter(
          (item) =>
            (item.code.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase() ||
            item.name.substr(0, wallet.length).toLowerCase() ===
              wallet.toLowerCase()) && item.code !== secondToken.code
        );
        setTokentList(arr);
        if (wallet.length < 1) setTokentList(tokens?.filter(elem => elem.code !== secondToken.code));
      };
    return (
        <div className='panel'>
            <Header title="Select token" style={{marginTop: '10px'}} onClick={() => back()} back={true}/>
            <Content>
                <Search style={{marginBottom: '10px'}} onChange={searchWallet} placeholder='Start typing..'/>
                {tokenList?.map((elem,i) =>(
                  <AddressBlock onClick={() => dispatch(selectedToken === 'INPUT' ? swapActions.setTokenIn(elem) : swapActions.setTokenOut(elem))} active={activeToken?.code === elem?.code} style={{marginBottom: '10px'}} data={elem} key={i}/>  
                ))}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default SelectTokenPanel