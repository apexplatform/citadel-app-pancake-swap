import React from 'react'
import { GuidesCard } from '@citadeldao/apps-ui-kit/dist/main'
import text from '../../text.json'
import '../styles/uiKit/guides.css'
import { ReactComponent as Guide1 } from '../guides/guide1.svg'
import { ReactComponent as Guide2 } from '../guides/guide2.svg'
import { ReactComponent as Guide3 } from '../guides/guide3.svg'
import { ReactComponent as Guide4 } from '../guides/guide4.svg'
import { ReactComponent as Guide5 } from '../guides/guide5.svg'
import { ReactComponent as Guide6 } from '../guides/guide6.svg'
const GuidesPanel = () => {
    return (
        <div className='guides-panel'>
            <div>
                <h3 className='heading-text-h3'>Guides & Questions</h3>
                <p className='description-text'>Learn more about Pancakeswap</p>
            </div>
            <GuidesCard text={text.GUIDES_HEADER_1}>
                <p>{text.GUIDES_DESCRIPTION_1}</p>
                <Guide1 className='quide-img'/>
                <p>{text.GUIDES_DESCRIPTION_1_2}</p>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_2}>
                <div>
                    <p style={{marginBottom : '10px'}}>{text.GUIDES_DESCRIPTION_2}</p>
                    <Guide2 style={{marginBottom : '10px'}} className='quide-img' />
                    <p>{text.GUIDES_DESCRIPTION_2_2}</p>
                    <Guide3 className='quide-img' />
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_3}>
                <div>
                    <p>{text.GUIDES_DESCRIPTION_3}</p>
                    <Guide4 className='quide-img' />
                    <p>{text.GUIDES_DESCRIPTION_3_2}</p>
                    <Guide5 className='quide-img' />
                    <p>{text.GUIDES_DESCRIPTION_3_3}</p>
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_4}>
                <div>
                    <p style={{marginBottom : '10px'}}>{text.GUIDES_DESCRIPTION_4}</p>
                    <Guide6 style={{marginBottom : '10px'}} className='quide-img' />
                    <p>{text.GUIDES_DESCRIPTION_4_2}</p>
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_5}>
                <div className='row guide-content-4'>
                    <p>{text.GUIDES_DESCRIPTION_5}</p>
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_6}>
                <div className='row guide-content-4'>
                    <p>{text.GUIDES_DESCRIPTION_6}</p>
                </div>
            </GuidesCard>
        </div>
    )
}

export default GuidesPanel