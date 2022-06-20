import React, {useState} from 'react'
// eslint-disable-next-line
import Tab from '@citadeldao/apps-ui-kit/dist/components/uiKit/Tab'
// eslint-disable-next-line
import Tablist from '@citadeldao/apps-ui-kit/dist/components/uiKit/Tablist'
import Header from '@citadeldao/apps-ui-kit/dist/components/uiKit/Header'
import GuidesPanel from './GuidesPanel'
import Content from '@citadeldao/apps-ui-kit/dist/components/uiKit/Content'
import { Config } from '../config/config';
const InfoPanel = () => {
    // eslint-disable-next-line
    const [active, setActive] = useState('Guides')
    const config = new Config()
    return (
        <section id='info-panel'>
            <Header config={config}/>
            <Content>
                <GuidesPanel/>
                {/* <Tablist active={active} setActive={setActive} type="button">
                    <Tab label='Guides'><GuidesPanel/></Tab>
                    <Tab label='Assets'>Content of Assets</Tab>
                    <Tab label='Charts'>Content of Charts</Tab>
                </Tablist>  */}
            </Content> 
        </section>
    )
}

export default InfoPanel