import React, {useState} from 'react';
import { Content, Tabbar, Search, Tablist, Tab, PoolItemInfo } from '@citadeldao/apps-ui-kit/dist/main';
import PoolItem from '@citadeldao/apps-ui-kit/dist/components/uiKit/PoolItem'
import { Config } from '../config/config';
import { useSelector } from 'react-redux';
// import { walletActions } from '../../store/actions';
// import { useNavigate } from 'react-router-dom';
const PoolsPanel = () => {
    const config = new Config()
    const [active, setActive] = useState('tab1')
    const { bottomInset } = useSelector(state => state.panels)
    const pool = {
        id: 1,
        apr: 0.32,
        poolAssets: [
            {
                symbol: "1inch",
                denom: "c1inch",
                base_denom: "c1inch",
                amount: "54364364",
                swap_price: "123.321432",
                decimals: 6,
            },
            {
                symbol: "1inch",
                denom: "c1inch",
                base_denom: "c1inch",
                amount: "54364364",
                swap_price: "123.321432",
                decimals: 6,
            }
        ],
        poolTVL: "421435",
        myLiquidity: '2423',
        fee: '5',
        isSuperfluidPool: true,
        superFluidAPR: "7.3"
    }

    return (
        <div className='panel'>
            <Content>
                  <Tablist active={active} setActive={setActive} type="button">
                    <Tab id='tab1' label='All'>
                        <Search style={{margin: '10px 0 16px'}} placeholder='Start typing..'/>
                        <PoolItem  
                            id={pool.id}
                            apr={pool.apr}
                            poolAssets={pool.poolAssets}
                            isSuperfluidPool={pool.isSuperfluidPool}
                            superFluidAPR={pool.superFluidAPR}
                            network={'osmosis'}
                            style={{marginBottom: "16px"}}
                            poolInfo>
                            <PoolItemInfo text='My liquidity' amount={pool.myLiquidity} symbol='%' textColor='#D900AB' symbolColor='#3C5B7E'/>
                            <PoolItemInfo text='Rewards APR' amount={1} symbol='%' textColor='#D900AB' symbolColor='#3C5B7E'/>
                            <PoolItemInfo text='Swap fee' amount={4} symbol='%' textColor='#D900AB' symbolColor='#3C5B7E'/>
                        </PoolItem>
                        <PoolItem  
                            id={pool.id}
                            apr={pool.apr}
                            poolAssets={pool.poolAssets}
                            isSuperfluidPool={pool.isSuperfluidPool}
                            superFluidAPR={pool.superFluidAPR}
                            style={{marginBottom: "16px"}}
                            network={'osmosis'}
                            poolInfo>
                            <PoolItemInfo text='Rewards APR' amount={1} symbol='%' textColor='#D900AB' symbolColor='#3C5B7E'/>
                            <PoolItemInfo text='Swap fee' amount={4} symbol='%' textColor='#D900AB' symbolColor='#3C5B7E'/>
                        </PoolItem>
                    </Tab>
                    <Tab id='tab2' label='Incentivized Pools'>
                        <Search style={{margin: '10px 0'}} placeholder='Start typing..'/>
                    </Tab>
                    <Tab id='tab3' label='My Pools'>
                        <Search style={{margin: '10px 0'}} placeholder='Start typing..'/>
                    </Tab>
                </Tablist> 
            </Content>
            <Tabbar config={config}  bottomInset={bottomInset}/>
        </div>
    )
}

export default PoolsPanel