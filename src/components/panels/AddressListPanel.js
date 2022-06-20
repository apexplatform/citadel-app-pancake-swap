import React from 'react'
import Tabbar from '@citadeldao/apps-ui-kit/dist/components/uiKit/Tabbar'
import Header from '@citadeldao/apps-ui-kit/dist/components/uiKit/Header'
import text from '../../text.json'
import Content from '@citadeldao/apps-ui-kit/dist/components/uiKit/Content'
import NotificationCard from '@citadeldao/apps-ui-kit/dist/components/uiKit/NotificationCard'
//import { AddressCard } from '@citadeldao/apps-ui-kit/dist/main'
import { Config } from '../config/config';
import { useSelector } from 'react-redux'
const AddressListPanel = () => {
    const config = new Config()
    const { wallets } = useSelector((state) => state.wallet)
    console.log(wallets)
    return (
        <div className='panel'>
            <Header config={config}/>
            <Content>
                <NotificationCard text={text.AUTORESTAKE_ALERT} iconColor='#00B2FE' textColor='#026573' bgColor='#F3FCFD'/>
                <NotificationCard text={text.LEDGER_ALERT_TEXT} description={text.LEDGER_ALERT_DESCRIPTION} iconColor='#FAA305' textColor='#000' bgColor='#FFEDCD'/> 
                {/* {wallets?.map((elem,i) =>(
                    <AddressCard data={elem} key={i}/>  
                ))} */}
            </Content>
            <Tabbar config={config}/>
        </div>
    )
}

export default AddressListPanel