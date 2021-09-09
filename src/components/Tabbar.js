import '../styles/components/tabbar.css'
import {setActivePanel} from '../store/actions/panelActions'
import {connect} from 'react-redux';
import uiConfig from '../ui-config.json'
import ROUTES from '../routes'
const Tabbar = (props) => {
    const {activePanel} = props.panelReducer
    const config = {
        background: uiConfig.TABBAR.BACKGROUND_COLOR || '#3C356D'
    }
    return(
        <div className='tabbar' style={{background: config.background }}>
            {
                uiConfig.TABBAR.TABBAR_ITEMS.map(item => (
                <div className='tabbar-item' id={activePanel === item.ROUTES && 'active-bar'} onClick={() => props.setActivePanel(item.ROUTES)}>
                    <img src={item.ICON} alt='tab-icon' />
                    <p style={{color: uiConfig.TABBAR.DEFAULT_ITEM_COLOR || "#979EFE"}}>{item.TITLE}</p>
                </div>
                ))
            }
            <div className='tabbar-item' id={activePanel === ROUTES.TRANSACTIONS && 'active-bar'} onClick={() => props.setActivePanel(ROUTES.TRANSACTIONS)}>
                {/* <img src="/img/tabbar/transactions.svg" className='rrr' alt='nav-icon' /> */}
                <svg width="40" className='rrr' height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                <g clip-path="url(#clip0)">
                <path d="M20.6389 5.4641L11.8017 16.903L11.3799 13.5513C11.3328 13.1773 10.9914 12.9123 10.6174 12.9594C10.2434 13.0064 9.97835 13.3478 10.0254 13.7218L10.6537 18.714C10.6537 18.7144 10.6538 18.7146 10.6538 18.7149C10.7014 19.0884 11.0439 19.3541 11.4185 19.3057C11.4188 19.3057 11.4191 19.3057 11.4194 19.3056L16.4085 18.6532C16.7822 18.6043 17.0457 18.2618 16.9968 17.8879C16.9479 17.5141 16.6053 17.2507 16.2315 17.2996L12.8819 17.7376L21.7192 6.29868C21.9497 6.00036 21.8947 5.57172 21.5964 5.34126C21.298 5.11079 20.8694 5.16579 20.6389 5.4641Z" fill="#979EFE"/>
                </g>
                <g clip-path="url(#clip1)">
                <path d="M19.3171 24.7981L28.1544 13.3592L28.5762 16.7109C28.6233 17.0849 28.9646 17.3499 29.3387 17.3029C29.7127 17.2558 29.9777 16.9144 29.9306 16.5404L29.3023 11.5482C29.3023 11.5479 29.3022 11.5476 29.3022 11.5473C29.2547 11.1738 28.9121 10.9081 28.5376 10.9565C28.5373 10.9565 28.537 10.9565 28.5367 10.9566L23.5476 11.609C23.1739 11.6579 22.9104 12.0004 22.9593 12.3743C23.0081 12.7481 23.3507 13.0115 23.7245 12.9626L27.0741 12.5246L18.2368 23.9635C18.0064 24.2618 18.0614 24.6905 18.3597 24.921C18.658 25.1514 19.0866 25.0964 19.3171 24.7981Z" fill="#979EFE"/>
                </g>
                </g>
                <defs>
                <filter id="filter0_d" x="0" y="0" width="39.9558" height="38.262" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                <clipPath id="clip0">
                <rect width="17.4733" height="17.4733" fill="white" transform="translate(4 13.8276) rotate(-52.3117)"/>
                </clipPath>
                <clipPath id="clip1">
                <rect width="17.4733" height="17.4733" fill="white" transform="translate(35.9561 16.4346) rotate(127.688)"/>
                </clipPath>
                </defs>
                </svg>

                <p style={{color: uiConfig.TABBAR.DEFAULT_ITEM_COLOR || "#979EFE"}}>Transaction</p>
            </div>
            <div className='tabbar-item' id={activePanel === ROUTES.TRANSACTIONS && 'active-bar'} onClick={() => props.setActivePanel(ROUTES.TRANSACTIONS)}>
                <img src="/img/tabbar/Settings.svg" alt='nav-icon' />
                <p style={{color: uiConfig.TABBAR.DEFAULT_ITEM_COLOR || "#979EFE"}}>Setting</p>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer
})

export default connect(mapStateToProps, {setActivePanel}) (Tabbar);
