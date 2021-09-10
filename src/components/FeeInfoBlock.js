import '../styles/components/feeInfoBlock.css'
const FeeInfoBlock = (props) => {
    return(
        <div className='fee-info-block'>
           <div className='fee-row'>
                <span className='fee-text'>
                    Rate
                </span>
                <span>
                    <span className='fee-text'>1 </span>
                    SCRT =  
                    <span className='fee-text'> 6.12 </span>
                    SCRT
                </span>
           </div>
           <div className='fee-row'>
                <span className='fee-text'>
                    Swap fee
                </span>
                <span>
                    <span className='fee-text'> 3 </span>
                    %
                </span>
           </div>
           <div className='separator'></div>
           <div className='fee-row'>
                <span className='fee-text-bold'>
                    Estimated slippage
                </span>
                <span>
                    <span className='fee-amount-bold'>0.005 </span>
                    %
                </span>
           </div>
        </div>
    )
}

export default FeeInfoBlock