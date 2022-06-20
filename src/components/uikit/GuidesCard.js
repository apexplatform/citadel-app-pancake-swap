import { useState } from 'react'
import '../styles/uiKit/guides.css'
import CustomIcon from '@citadeldao/apps-ui-kit/dist/components/uiKit/CustomIcons'
const GiudesCard = (props) => {
    const {text, children} = props
    const [open,setOpen] = useState(false)
    return(
        <div className="guides-card">
            <div className='guides-header' onClick={() => setOpen(!open)}>
                <div className='row'>
                    <CustomIcon icon="question" />
                    <p>{text}</p>
                </div>
                <CustomIcon icon={open ? "arrow-up" : "arrow-down"} />
            </div>
            {open && <div className='guides-content'>
                {children}
            </div>}
        </div>
    )
}

export default GiudesCard;
