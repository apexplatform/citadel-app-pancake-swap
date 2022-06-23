import React, {useState} from 'react';
import { Content, Tabbar, Search, Tablist, Tab } from '@citadeldao/apps-ui-kit/dist/main';
import PoolItem from '@citadeldao/apps-ui-kit/dist/components/uiKit/PoolItem'
import { Config } from '../config/config';
import { useSelector, useDispatch } from 'react-redux';
import { walletActions } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
const PoolsPanel = () => {
    const config = new Config()
    const [active, setActive] = useState('All')
    const { wallets, activeWallet } = useSelector((state) => state.wallet)
    const previousPanel = useSelector(state => state.panels.previousPanel)
    const poolData = {
        name: 'Pool #1',
        nativeAsset: {
            symbol: 'OSMO',
            net: 'osmosis'

        },
        externalAsset: {
            symbol: 'ATOM',
            net: 'cosmos'
        },
        apr: 0.03,
        fee: 13,
        liquidity_provider: {
            liquidity_provider_amount: 0.03,
            my_liquidity: 140000,
            pool_liquidity: 140000
        },
        tvl: 5687457
    }

    return (
        <div className='panel'>
            <Content>
                  <Tablist active={active} setActive={setActive} type="button">
                    <Tab label='All'>
                        <Search style={{margin: '10px 0'}} placeholder='Start typing..'/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                    </Tab>
                    <Tab label='Incentivized Pools'>
                        <Search style={{margin: '10px 0'}} placeholder='Start typing..'/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                    </Tab>
                    <Tab label='My Pools'>
                        <Search style={{margin: '10px 0'}} placeholder='Start typing..'/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                        <PoolItem data={poolData} poolInfo style={{margin: '10px 0'}}/>
                    </Tab>
                </Tablist> 
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default PoolsPanel