import React from 'react'
import { GuidesCard } from '@citadeldao/apps-ui-kit/dist/main'
import text from '../../text.json'
const GuidesPanel = () => {
    return (
        <div className='guides-panel'>
            <div>
                <h3 className='heading-text-h3'>Guides & Questions</h3>
                <p className='description-text'>Learn more about autorestaking</p>
            </div>
            <GuidesCard text={text.GUIDES_HEADER_1}>
                <p>{text.GUIDES_DESCRIPTION_1}</p>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_2}>
                <div className='row guide-content-1'>
                    <p>{text.GUIDES_DESCRIPTION_2}</p>
                    <img src='img/guides/guide1.svg' alt='quide1' />
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_3}>
                <div className='row guide-content-2'>
                    <p>{text.GUIDES_DESCRIPTION_3}</p>
                    <img src='img/guides/guide2.svg' alt='quide1' />
                </div>
                <div className='row guide-content-2'>
                    <p>{text.GUIDES_DESCRIPTION_3_2}</p>
                    <img src='img/guides/guide3.svg' alt='quide1' />
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_4}>
                <div className='row guide-content-3'>
                    <p>{text.GUIDES_DESCRIPTION_4}</p>
                    <img src='img/guides/guide4.svg' alt='quide1' />
                </div>
            </GuidesCard>
            <GuidesCard text={text.GUIDES_HEADER_5}>
                <div className='row guide-content-4'>
                    <p>{text.GUIDES_DESCRIPTION_5}</p>
                    <img src='img/guides/guide5.svg' alt='quide1' />
                </div>
            </GuidesCard>
        </div>
    )
}

export default GuidesPanel