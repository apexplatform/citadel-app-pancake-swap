const Icon = (props) => {
    const width = props.width || 30
    const height = props.height || 30
    const icon = props.icon ? props.icon.toLowerCase() : ''
    const fill = props.fill || '#fff'
    return(
        <span style={{ width: `${width}px`, height: `${height}px` }} className="app-icon center">
            {
                icon === 'transaction' &&
                <svg width={width} height={height} viewBox={'0 0 '+width+' '+height} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                    <path d="M7.26349 14.2759C7.96605 14.2759 8.64515 14.2306 9.28776 14.1461V7.10245C8.64521 7.01804 7.96605 6.97266 7.26349 6.97266C3.25198 6.97266 0 8.44757 0 10.267V10.9815C0 12.8009 3.25198 14.2759 7.26349 14.2759Z" fill={fill}/>
                    <path d="M7.26349 17.9541C7.96605 17.9541 8.64515 17.9087 9.28776 17.8243V15.7597C8.64502 15.8441 7.96624 15.8901 7.26349 15.8901C3.76188 15.8901 0.839266 14.7663 0.152764 13.2705C0.0527887 13.4884 0 13.714 0 13.9452V14.6597C0 16.4792 3.25198 17.9541 7.26349 17.9541Z" fill={fill}/>
                    <path d="M9.28776 19.5984V19.438C8.64502 19.5224 7.96624 19.5684 7.26349 19.5684C3.76188 19.5684 0.839266 18.4445 0.152764 16.9487C0.0527887 17.1665 0 17.3921 0 17.6234V18.3379C0 20.1574 3.25198 21.6323 7.26349 21.6323C8.06572 21.6323 8.83732 21.5732 9.55887 21.4642C9.38002 21.0984 9.28776 20.7125 9.28776 20.3128V19.5984Z" fill={fill}/>
                    <path d="M17.7371 1.39307C13.7256 1.39307 10.4736 2.86798 10.4736 4.68745V5.4019C10.4736 7.22137 13.7256 8.69629 17.7371 8.69629C21.7486 8.69629 25.0006 7.22137 25.0006 5.4019V4.68745C25.0006 2.86798 21.7486 1.39307 17.7371 1.39307Z" fill={fill}/>
                    <path d="M17.7371 10.3101C14.2355 10.3101 11.3129 9.18626 10.6264 7.69043C10.5264 7.90825 10.4736 8.13384 10.4736 8.36517V9.07962C10.4736 10.8991 13.7256 12.374 17.7371 12.374C21.7486 12.374 25.0006 10.8991 25.0006 9.07962V8.36517C25.0006 8.13384 24.9478 7.90825 24.8478 7.69043C24.1613 9.18626 21.2387 10.3101 17.7371 10.3101Z" fill={fill}/>
                    <path d="M17.7371 13.9888C14.2355 13.9888 11.3129 12.8649 10.6264 11.3691C10.5264 11.587 10.4736 11.8126 10.4736 12.0439V12.7583C10.4736 14.5779 13.7256 16.0528 17.7371 16.0528C21.7486 16.0528 25.0006 14.5779 25.0006 12.7583V12.0439C25.0006 11.8126 24.9478 11.587 24.8478 11.3691C24.1613 12.865 21.2387 13.9888 17.7371 13.9888Z" fill={fill}/>
                    <path d="M17.7371 17.8648C14.2355 17.8648 11.3129 16.7409 10.6264 15.2451C10.5264 15.463 10.4736 15.6885 10.4736 15.9198V16.6343C10.4736 18.4538 13.7256 19.9287 17.7371 19.9287C21.7486 19.9287 25.0006 18.4538 25.0006 16.6343V15.9198C25.0006 15.6885 24.9478 15.4629 24.8478 15.2451C24.1613 16.7408 21.2387 17.8648 17.7371 17.8648Z" fill={fill}/>
                    <path d="M17.7371 21.543C14.2355 21.543 11.3129 20.4192 10.6264 18.9234C10.5264 19.1413 10.4736 19.3669 10.4736 19.5981V20.3125C10.4736 22.132 13.7256 23.6069 17.7371 23.6069C21.7486 23.6069 25.0006 22.132 25.0006 20.3125V19.598C25.0006 19.3668 24.9478 19.1411 24.8478 18.9233C24.1613 20.4191 21.2387 21.543 17.7371 21.543Z" fill={fill}/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width={width} height={height} fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            }
            {
                icon === 'settings' &&
                <svg width={width} height={height} viewBox={'0 0 '+width+' '+height} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                    <path d="M23.2895 15.176C23.2885 15.175 23.2865 15.174 23.2855 15.172L21.7475 13.759C21.7995 13.333 21.8265 12.911 21.8265 12.5C21.8265 12.089 21.7995 11.667 21.7475 11.241L23.2895 9.824C23.7985 9.345 23.9145 8.585 23.5695 7.969L21.8725 5.035C21.5325 4.43 20.7935 4.142 20.1165 4.353L18.1205 4.983C17.4435 4.456 16.7135 4.032 15.9455 3.72L15.4845 1.671C15.3335 0.993 14.7205 0.5 14.0265 0.5H10.6265C9.93252 0.5 9.31952 0.993 9.16852 1.67L8.70752 3.72C7.93952 4.032 7.20952 4.456 6.53252 4.983L4.53452 4.353C3.86152 4.144 3.12052 4.429 2.78452 5.029L1.08052 7.975C0.73852 8.585 0.85452 9.345 1.36852 9.828L2.90652 11.241C2.85352 11.667 2.82652 12.089 2.82652 12.5C2.82652 12.911 2.85352 13.333 2.90552 13.759L1.36352 15.176C0.85452 15.655 0.73852 16.415 1.08352 17.03L2.78052 19.964C3.12052 20.57 3.85852 20.857 4.53652 20.647L6.53252 20.017C7.20952 20.544 7.93952 20.968 8.70752 21.28L9.16852 23.328C9.31952 24.007 9.93252 24.5 10.6265 24.5H14.0265C14.7205 24.5 15.3335 24.007 15.4845 23.33L15.9455 21.28C16.7135 20.968 17.4435 20.545 18.1205 20.017L20.1185 20.647C20.7935 20.858 21.5325 20.57 21.8695 19.97L23.5735 17.024C23.9145 16.415 23.7985 15.655 23.2895 15.176ZM12.3265 17.5C9.56952 17.5 7.32652 15.257 7.32652 12.5C7.32652 9.743 9.56952 7.5 12.3265 7.5C15.0835 7.5 17.3265 9.743 17.3265 12.5C17.3265 15.257 15.0835 17.5 12.3265 17.5Z" fill={fill}/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width={width} height={height} fill="white" transform="translate(0.32666 0.5)"/>
                    </clipPath>
                    </defs>
                </svg>
            }
            {
                icon === 'bridge' &&
                <svg style={{ width: `${width}px`, height: `${height}px` }} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                    <g clipPath="url(#clip0)">
                    <path d="M20.6389 5.4641L11.8017 16.903L11.3799 13.5513C11.3328 13.1773 10.9914 12.9123 10.6174 12.9594C10.2434 13.0064 9.97835 13.3478 10.0254 13.7218L10.6537 18.714C10.6537 18.7144 10.6538 18.7146 10.6538 18.7149C10.7014 19.0884 11.0439 19.3541 11.4185 19.3057C11.4188 19.3057 11.4191 19.3057 11.4194 19.3056L16.4085 18.6532C16.7822 18.6043 17.0457 18.2618 16.9968 17.8879C16.9479 17.5141 16.6053 17.2507 16.2315 17.2996L12.8819 17.7376L21.7192 6.29868C21.9497 6.00036 21.8947 5.57172 21.5964 5.34126C21.298 5.11079 20.8694 5.16579 20.6389 5.4641Z" fill={fill}/>
                    </g>
                    <g clipPath="url(#clip1)">
                    <path d="M19.3171 24.7981L28.1544 13.3592L28.5762 16.7109C28.6233 17.0849 28.9646 17.3499 29.3387 17.3029C29.7127 17.2558 29.9777 16.9144 29.9306 16.5404L29.3023 11.5482C29.3023 11.5479 29.3022 11.5476 29.3022 11.5473C29.2547 11.1738 28.9121 10.9081 28.5376 10.9565C28.5373 10.9565 28.537 10.9565 28.5367 10.9566L23.5476 11.609C23.1739 11.6579 22.9104 12.0004 22.9593 12.3743C23.0081 12.7481 23.3507 13.0115 23.7245 12.9626L27.0741 12.5246L18.2368 23.9635C18.0064 24.2618 18.0614 24.6905 18.3597 24.921C18.658 25.1514 19.0866 25.0964 19.3171 24.7981Z" fill={fill}/>
                    </g>
                    </g>
                    <defs>
                    <filter id="filter0_d" x="0" y="0" width="39.9558" height="38.262" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                    </filter>
                    </defs>
                </svg>
            }
            {
                ['cosmos','osmo','ion','akt','dvpn'].includes(icon) &&
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0246 1.53125C10.7293 1.53125 9.67896 6.22949 9.67896 12.0251C9.67896 17.8207 10.7293 22.519 12.0246 22.519C13.3199 22.519 14.3703 17.8207 14.3703 12.0251C14.3703 6.22949 13.3199 1.53125 12.0246 1.53125ZM12.1866 21.9267C12.0384 22.1243 11.8903 21.9761 11.8903 21.9761C11.2938 21.2849 10.9955 20.0008 10.9955 20.0008C9.95208 16.6428 10.2004 9.43291 10.2004 9.43291C10.6908 3.70901 11.5828 2.35685 11.8864 2.05666C11.9174 2.02602 11.9582 2.00729 12.0017 2.00378C12.0451 2.00028 12.0884 2.0122 12.1239 2.03746C12.5643 2.34955 12.9337 3.65477 12.9337 3.65477C14.0246 7.70415 13.9258 11.5066 13.9258 11.5066C14.0246 14.8153 13.3792 18.5189 13.3792 18.5189C12.8824 21.3337 12.1866 21.9267 12.1866 21.9267Z" fill={fill}/>
                <path d="M21.1269 6.80296C20.482 5.67899 15.8844 7.10613 10.8549 9.99016C5.82534 12.8742 2.27757 16.1235 2.92202 17.247C3.56646 18.3705 8.16448 16.9438 13.194 14.0598C18.2236 11.1758 21.7713 7.92645 21.1269 6.80296ZM3.51702 17.0928C3.27011 17.0617 3.32589 16.8588 3.32589 16.8588C3.62877 15.9976 4.59261 15.0998 4.59261 15.0998C6.98714 12.5235 13.365 9.15112 13.365 9.15112C18.5734 6.72789 20.1912 6.83013 20.6016 6.94312C20.6437 6.95488 20.6803 6.98116 20.7049 7.01733C20.7295 7.05349 20.7405 7.09719 20.736 7.14069C20.6866 7.67829 19.7359 8.64789 19.7359 8.64789C16.7684 11.6104 13.4208 13.4173 13.4208 13.4173C10.6 15.1501 7.06624 16.4325 7.06624 16.4325C4.37738 17.4015 3.51712 17.0928 3.51712 17.0928H3.51702Z" fill={fill}/>
                <path d="M21.1042 17.2841C21.7541 16.1631 18.2153 12.8989 13.2034 9.99316C8.19154 7.08743 3.59458 5.64263 2.94524 6.76555C2.29589 7.88846 5.83417 11.1507 10.8489 14.0565C15.8637 16.9622 20.4549 18.4071 21.1042 17.2841ZM3.37589 7.1987C3.27989 6.97108 3.48255 6.91627 3.48255 6.91627C4.37977 6.74683 5.64005 7.13294 5.64005 7.13294C9.06869 7.91371 15.1825 11.7433 15.1825 11.7433C19.8896 15.0372 20.6115 16.488 20.7197 16.8999C20.7308 16.9421 20.7265 16.9869 20.7076 17.0263C20.6889 17.0657 20.6568 17.0972 20.617 17.1152C20.1262 17.3399 18.8115 17.0051 18.8115 17.0051C14.7597 15.9187 11.5192 13.9281 11.5192 13.9281C8.60761 12.3577 5.72857 9.94142 5.72857 9.94142C3.54092 8.09947 3.37657 7.20119 3.37657 7.20119L3.37589 7.1987Z" fill={fill}/>
                <path d="M11.9999 13.2347C12.6817 13.2347 13.2345 12.682 13.2345 12.0002C13.2345 11.3184 12.6817 10.7656 11.9999 10.7656C11.3181 10.7656 10.7654 11.3184 10.7654 12.0002C10.7654 12.682 11.3181 13.2347 11.9999 13.2347Z" fill={fill}/>
                <path d="M17.0618 8.00002C17.4572 8.00002 17.7778 7.66838 17.7778 7.25929C17.7778 6.8502 17.4572 6.51855 17.0618 6.51855C16.6662 6.51855 16.3457 6.8502 16.3457 7.25929C16.3457 7.66838 16.6662 8.00002 17.0618 8.00002Z" fill={fill}/>
                <path d="M5.30859 10.5186C5.70406 10.5186 6.02466 10.1869 6.02466 9.77785C6.02466 9.36875 5.70406 9.03711 5.30859 9.03711C4.91312 9.03711 4.59253 9.36875 4.59253 9.77785C4.59253 10.1869 4.91312 10.5186 5.30859 10.5186Z" fill={fill}/>
                <path d="M10.5432 19.6045C10.9386 19.6045 11.2593 19.2728 11.2593 18.8638C11.2593 18.4547 10.9386 18.123 10.5432 18.123C10.1478 18.123 9.82715 18.4547 9.82715 18.8638C9.82715 19.2728 10.1478 19.6045 10.5432 19.6045Z" fill={fill}/>
            </svg>
            }
            {
                icon === 'secret' &&
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.49843 0.0983764C7.09592 0.462524 4.85818 1.57608 3.17323 3.2596C1.669 4.75841 0.648466 6.65303 0.143513 8.87486C0.0053153 9.49232 0 9.57676 0 10.9964C0 12.4161 0.0053153 12.5005 0.143513 13.118C0.898285 16.4533 2.83837 19.0604 5.74583 20.649C7.32447 21.5039 9.23798 22 10.9973 22C11.7946 22 12.8205 21.8733 13.5487 21.6886C14.1174 21.5461 15.3453 21.1239 15.6748 20.9603C16.2595 20.6701 17.0196 20.2268 17.3225 19.9998C17.9391 19.546 18.072 19.4351 18.6088 18.9338C19.7569 17.8677 20.6765 16.5167 21.2718 15.0337C21.8512 13.5771 22 12.7538 22 10.9964C22 9.239 21.8512 8.41571 21.2718 6.95912C20.6765 5.47615 19.7569 4.12511 18.6088 3.05906C18.072 2.55769 17.9391 2.44687 17.3225 1.993C17.0196 1.76607 16.2595 1.32276 15.6748 1.0325C15.3453 0.868893 14.1174 0.446691 13.5487 0.304199C12.3209 -0.00717373 10.7475 -0.0863361 9.49843 0.0983764ZM12.273 1.04833C13.4105 1.17499 13.9367 1.32276 15.2124 1.86106C16.9026 2.56825 18.6567 4.13039 19.7197 5.87724C19.9536 6.25722 20.4586 7.34966 20.5861 7.75075C20.7243 8.17295 20.9369 9.07012 21.0273 9.59787C21.1123 10.1151 21.1123 11.8778 21.0273 12.3949C20.9369 12.9227 20.7243 13.8199 20.5861 14.2421C20.4586 14.6432 19.9536 15.7356 19.7197 16.1156C18.6567 17.8624 16.9026 19.4246 15.2124 20.1318C13.9367 20.6701 13.4105 20.8178 12.273 20.9445C11.1462 21.0764 10.8485 21.0764 9.72167 20.9445C8.56294 20.8126 8.12708 20.6912 6.71853 20.1001C6.31457 19.9365 5.43223 19.4193 5.04421 19.129C3.68881 18.1105 2.57792 16.7858 1.91882 15.4031C1.3554 14.2157 1.18531 13.6668 1.03117 12.5586C0.892969 11.5558 0.892969 10.437 1.03117 9.43427C1.18531 8.326 1.3554 7.77714 1.91882 6.5897C2.57792 5.207 3.68881 3.88235 5.04421 2.86379C5.43223 2.57353 6.31457 2.05633 6.71853 1.89273C8.09519 1.3122 8.57357 1.18027 9.65257 1.04833C10.7263 0.921668 11.1887 0.921668 12.273 1.04833Z" fill={fill}/>
                <path d="M10.6093 4.5839C8.91907 4.795 7.57962 5.5444 6.83016 6.69489C6.44214 7.29125 6.37836 7.52346 6.37836 8.33092C6.37836 8.93783 6.3943 9.09088 6.4953 9.37586C6.74511 10.0778 7.22881 10.7005 7.90385 11.2072C8.2334 11.4552 9.67384 12.1782 10.2107 12.3629C10.4392 12.4421 10.9708 12.6796 11.396 12.8854C12.0338 13.202 12.2199 13.3234 12.5175 13.6084C12.9215 14.0042 13.065 14.247 13.15 14.7009C13.2936 15.5136 12.8258 16.0519 11.6618 16.4108C10.7582 16.6905 9.48781 16.4952 8.30781 15.8989C8.0261 15.7616 7.34574 15.2392 6.96836 14.8856L6.71854 14.6428L6.41557 14.9278C6.24548 15.0861 6.10196 15.2181 6.09133 15.2233C5.95314 15.2761 6.93115 16.1416 7.54241 16.5058C8.4779 17.0705 9.02006 17.2604 10.0619 17.4135C10.7103 17.5032 11.6405 17.4452 12.4856 17.2552C14.3354 16.8435 15.6535 15.7616 15.9672 14.4053C16.0681 13.9726 16.0097 13.1387 15.8449 12.7007C15.3772 11.4235 14.3885 10.6372 11.9063 9.56585C10.6093 9.00116 9.71636 8.3573 9.42934 7.77678C9.25393 7.42846 9.21673 6.74239 9.34961 6.47851C9.48781 6.20936 9.68979 6.01937 10.0406 5.8241C10.8698 5.36496 11.885 5.37024 13.0544 5.83466C13.6231 6.06159 14.1174 6.39935 14.6968 6.95877C14.9413 7.19098 15.1539 7.37569 15.1752 7.37041C15.1911 7.35986 15.3453 7.22792 15.5154 7.07487L15.8183 6.80044L15.51 6.46796C14.9094 5.8241 14.3991 5.44412 13.6018 5.04304C12.8896 4.68945 11.497 4.47835 10.6093 4.5839ZM8.34502 6.69489C8.2706 7.14876 8.37159 7.66595 8.63204 8.22009C8.87655 8.72145 9.21673 9.0856 9.88114 9.53946C10.2479 9.79278 11.6033 10.4736 12.3793 10.7955C12.5547 10.8694 13.0065 11.1069 13.3786 11.3285C14.4363 11.9513 14.9307 12.5582 15.0689 13.3973C15.1805 14.0992 14.9998 14.6745 14.4948 15.1969C14.0483 15.6666 14.0058 15.6772 14.0749 15.313C14.144 14.9383 14.0536 14.3473 13.8623 13.8459C13.74 13.5398 13.6444 13.4079 13.3148 13.0807C12.9055 12.6743 12.5069 12.3893 12.0498 12.1571C11.6086 11.9407 9.98213 11.2335 9.91303 11.2335C9.82267 11.2335 9.24862 10.9433 8.74367 10.6372C8.29187 10.3628 7.87196 9.98277 7.6434 9.65029C7.44142 9.34947 7.28196 8.64229 7.31917 8.17259C7.36169 7.56568 7.51583 7.22792 7.95169 6.76878C8.15898 6.5524 8.34502 6.37824 8.36096 6.37824C8.38223 6.37824 8.37691 6.52073 8.34502 6.69489Z" fill={fill}/>
            </svg>
            }
            {
                icon === 'icon' &&
                <svg width={width} height={height} viewBox={'0 0 '+width+' '+height} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7132 7.84906C11.7132 9.96226 9.96226 11.7132 7.84906 11.6528C7.18491 11.6528 6.46038 11.4717 5.91698 11.1094L4.22642 12.8C7.00377 14.8528 10.8679 14.2491 12.8604 11.4717C14.4906 9.29811 14.4906 6.33962 12.8604 4.10565L11.1698 5.79622C11.5321 6.46037 11.7132 7.12453 11.7132 7.84906ZM11.5321 2.83773L9.84151 4.5283C8.03019 3.44151 5.67547 4.04528 4.58868 5.8566C3.86415 7.06415 3.86415 8.57358 4.58868 9.78113L2.89811 11.4717C0.905661 8.69434 1.44906 4.83019 4.22642 2.83773C6.4 1.26792 9.35849 1.26792 11.5321 2.83773ZM16 1.63019C16 2.53585 15.2755 3.26037 14.3698 3.26037C13.4642 3.26037 12.7396 2.53585 12.7396 1.63019C12.7396 0.724526 13.4642 0 14.3698 0C15.2755 0 16 0.724526 16 1.63019ZM3.26038 14.3698C3.26038 15.2755 2.53585 16 1.63019 16C0.724528 16 0 15.2755 0 14.3698C0 13.4641 0.724528 12.7396 1.63019 12.7396C2.53585 12.7396 3.26038 13.4641 3.26038 14.3698Z" fill={fill}/>
                </svg>
            }
            {
                icon === 'tezos' && 
                <svg width={width} height={height} viewBox={'0 0 '+width+' '+height} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.45631 20C7.19417 20 6.24757 19.6416 5.67961 18.9964C5.11165 18.2796 4.79612 17.5627 4.79612 16.7742C4.79612 16.4875 4.85922 16.2724 4.98544 16.0573C5.11165 15.8423 5.23786 15.6989 5.36408 15.6272C5.5534 15.4839 5.74272 15.4122 5.99514 15.4122C6.24757 15.4122 6.43689 15.4839 6.62621 15.6272C6.81553 15.7706 6.94175 15.914 7.00485 16.0573C7.13107 16.2724 7.19417 16.4875 7.19417 16.7742C7.19417 17.1326 7.13107 17.4194 6.94175 17.6344C6.81553 17.8495 6.62621 17.9928 6.43689 18.0645C6.62621 18.3513 6.87864 18.4946 7.25728 18.638C7.63592 18.7814 8.01456 18.8531 8.3932 18.8531C8.89806 18.8531 9.40291 18.7097 9.84466 18.3513C10.2864 18.0645 10.6019 17.5627 10.7913 16.9176C10.9806 16.2724 11.1068 15.5556 11.1068 14.767C11.1068 13.9068 10.9806 13.19 10.7913 12.5448C10.5388 11.8996 10.2864 11.4695 9.84466 11.1828C9.40291 10.8961 8.96116 10.7527 8.45631 10.7527C8.14078 10.7527 7.76214 10.8961 7.25728 11.1828L6.37379 11.6846V11.1828L10.3495 5.0896H4.79612V11.3979C4.79612 11.8996 4.92233 12.3297 5.11165 12.6882C5.30097 13.0466 5.6165 13.19 6.05825 13.19C6.37379 13.19 6.68932 13.0466 7.00485 12.8315C7.32039 12.5448 7.57281 12.2581 7.76214 11.9713C7.82524 11.8996 7.82524 11.828 7.88835 11.828C7.95146 11.7563 7.95146 11.7563 8.01456 11.7563C8.07767 11.7563 8.20388 11.828 8.26699 11.8996C8.3932 12.043 8.3932 12.1864 8.3932 12.3297C8.3932 12.4014 8.3301 12.5448 8.3301 12.6165C8.07767 13.19 7.82524 13.6201 7.38349 13.9785C6.94175 14.3369 6.56311 14.4086 6.05825 14.4086C4.85922 14.4086 4.03883 14.1219 3.53398 13.6201C3.09223 13.1183 2.83981 12.3297 2.83981 11.4695V5.16129H0V3.94265H2.83981V1.29032L2.20874 0.573476V0H4.10194L4.79612 0.430106V4.01434H12.1165L12.8107 4.80287L8.3301 9.89248C8.58252 9.74911 8.89806 9.67742 9.15048 9.67742C9.65534 9.67742 10.1602 9.89247 10.7913 10.1792C11.4223 10.5376 11.8641 10.9677 12.1796 11.6129C12.4951 12.1864 12.7476 12.7599 12.8107 13.3333C12.9369 13.9068 13 14.3369 13 14.8387C13 15.8423 12.8107 16.7025 12.432 17.5627C12.0534 18.4229 11.5485 19.0681 10.7913 19.4265C10.0971 19.7849 9.3398 20 8.45631 20Z" fill={fill}/>
                </svg>
            }
            {
                icon === 'iost' &&
                <svg width={width} height={height} viewBox={'0 0 '+width+' '+height} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25 18L0 12.7133V10.1958L9.125 15.4825L13.5 12.965L10.5 11.2028L9.375 11.8322L7.25 10.6993L8.375 10.0699L6.875 9.18881L6 9.69232L3.875 8.55944L4.75 8.05595L0.375 5.16085L9.125 0L17.375 4.78322L15.125 6.04196L9 2.51748L4.625 5.03496L7.125 6.41959L8.375 5.66433L10.5 6.92308L9.25 7.67833L10.75 8.55944L11.75 7.93007L13.875 9.06295L12.875 9.69232L18 12.7133L9.25 18Z" fill={fill}/>
                </svg>
            }
            {
                icon === 'eth' &&
                <svg width="13" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.30607 13.8145H6.30527L0.166992 10.1856L6.30527 0H6.30607L12.4443 10.1856L6.30607 13.8145ZM12.4483 11.35L6.30606 20H6.30526L0.166992 11.35L6.30606 14.9764L12.4483 11.35Z" fill={fill}/>
                </svg>
            }
            {
                icon === 'bsc' &&
                <svg width='24' height='24' viewBox='0 0 24 24' fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.11567 8.40416L9.99963 4.5203L13.8857 8.40621L16.1456 6.14622L9.99963 0L3.85571 6.14417L6.11567 8.40416Z"  fill={fill}/>
                <path d="M4.51993 9.99921L2.26001 7.73926L-2.11017e-05 9.99932L2.2599 12.2593L4.51993 9.99921Z"  fill={fill}/>
                <path d="M6.11582 11.5961L9.99978 15.48L13.8856 11.5942L16.1469 13.853L16.1458 13.8542L9.99978 20.0003L3.8557 13.8563L3.85254 13.8531L6.11582 11.5961Z"  fill={fill}/>
                <path d="M17.74 12.261L20 10.001L17.7401 7.74102L15.48 10.0011L17.74 12.261Z"  fill={fill}/>
                <path d="M12.2923 9.99889H12.2932L9.99996 7.70557L8.30519 9.40036H8.30503L8.11042 9.59513L7.70873 9.99683L7.70557 9.99999L7.70873 10.0033L9.99996 12.2946L12.2932 10.0013L12.2944 9.99999L12.2923 9.99889Z"  fill={fill}/>
                </svg>
            }
            {
                icon === 'swap' &&
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.36112 17.9402L5.36112 7.28878H2.49346L2.49346 17.9402H0.327148L3.82569 24L7.32428 17.9402H5.36112Z" fill={fill}/>
                    <path d="M11.5061 16.7109V6.05951H13.6724L10.1738 -0.000240326L6.67529 6.05951H8.6384V16.7109H11.5061Z" fill={fill}/>
                </svg>
            }
            {
                icon === 'pancake' &&
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.67508 4.0625C4.26498 1.95 5.90536 0 8.03786 0C9.92429 0 11.4826 1.54375 11.4826 3.4125V7.6375C11.9748 7.6375 12.4669 7.55625 12.959 7.55625C13.4511 7.55625 13.8612 7.55625 14.3533 7.6375V3.4125C14.3533 1.54375 15.9117 0 17.7981 0C19.9306 0 21.571 1.95 21.2429 4.0625L20.3407 9.01875C23.5394 10.4 26 12.8375 26 15.8438V17.7125C26 20.2312 24.3596 22.3438 21.9811 23.725C19.6025 25.1875 16.4858 26 12.959 26C9.43218 26 6.31546 25.1875 3.93691 23.725C1.64038 22.3438 0 20.2312 0 17.7125V15.8438C0 12.8375 2.37855 10.4 5.57729 9.01875L4.67508 4.0625ZM19.1104 9.66875L20.1767 3.81875C20.4227 2.35625 19.3565 0.975 17.7981 0.975C16.4858 0.975 15.4196 2.03125 15.4196 3.33125V8.69375C15.0915 8.6125 14.6814 8.6125 14.3533 8.6125C13.8612 8.6125 13.4511 8.53125 12.959 8.53125C12.4669 8.53125 11.9748 8.53125 11.4826 8.6125C11.1546 8.6125 10.7445 8.69375 10.4164 8.69375V3.4125C10.4164 2.1125 9.35016 1.05625 8.03786 1.05625C6.56151 1.05625 5.41325 2.4375 5.74132 3.9L6.80757 9.75C3.36278 11.05 1.06625 13.325 1.06625 15.925V17.7937C1.06625 21.775 6.39748 25.025 12.959 25.025C19.5205 25.025 24.8517 21.775 24.8517 17.7937V15.925C24.9338 13.2438 22.6372 10.9688 19.1104 9.66875Z" fill={fill}/>
                <path d="M24.9339 17.7125C24.9339 21.6937 19.6027 24.9438 13.0412 24.9438C6.47967 24.9438 1.14844 21.6937 1.14844 17.7125V15.8438H25.0159V17.7125H24.9339Z" fill="#138A8F"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5.7415 3.90039C5.41342 2.43789 6.56169 1.05664 8.03803 1.05664C9.35033 1.05664 10.4166 2.11289 10.4166 3.41289V8.77539C11.2368 8.69414 12.057 8.61289 12.9592 8.61289C13.7794 8.61289 14.5995 8.69414 15.4197 8.77539V3.41289C15.4197 2.11289 16.486 1.05664 17.7983 1.05664C19.2746 1.05664 20.4229 2.43789 20.1768 3.90039L19.1106 9.75039C22.5554 11.0504 24.9339 13.3254 24.9339 15.9254C24.9339 19.9066 19.6027 23.1566 13.0412 23.1566C6.47967 23.1566 1.14844 19.9066 1.14844 15.9254C1.14844 13.3254 3.44497 11.0504 6.88976 9.75039L5.7415 3.90039Z" fill="#6DF1F7"/>
                <path d="M9.67929 15.3562C9.67929 16.4125 9.10516 17.3062 8.36699 17.3062C7.62882 17.3062 7.05469 16.4125 7.05469 15.3562C7.05469 14.3 7.62882 13.4062 8.36699 13.4062C9.10516 13.4062 9.67929 14.3 9.67929 15.3562Z" fill={fill}/>
                <path d="M18.7809 15.3562C18.7809 16.4125 18.2067 17.3062 17.4686 17.3062C16.7304 17.3062 16.1562 16.4125 16.1562 15.3562C16.1562 14.3 16.7304 13.4062 17.4686 13.4062C18.2067 13.4062 18.7809 14.3 18.7809 15.3562Z" fill={fill}/>
                </svg>
                
            }
        </span>
    )
}

export default Icon