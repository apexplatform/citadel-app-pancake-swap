import React from 'react';
import { Content, Tabbar } from '@citadeldao/apps-ui-kit/dist/main';
import { Config } from '../config/config';
// import { useSelector } from 'react-redux';
// import { walletActions } from '../../store/actions';
// import { useNavigate } from 'react-router-dom';
const AddPoolPanel = () => {
    const config = new Config()
  //  const { wallets, activeWallet } = useSelector((state) => state.wallet)
    return (
        <div className='panel'>
            <Content>
                
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default AddPoolPanel