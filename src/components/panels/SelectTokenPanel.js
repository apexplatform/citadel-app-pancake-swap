import ROUTES from '../../routes'
import { Panel,Search } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import TokenItem from '../uikit/TokenItem'
import { useEffect, useState } from 'react';
import {sortList} from '../helpers'
import Loader from '../uikit/Loader'
const SelectTokenPanel = (props) => {
    const {tokenList,currentToken,fromToken,toToken} = props.walletReducer
    const [list,setList] = useState(sortList(tokenList))
    const [loader, setLoader] = useState(tokenList.length > 10)
    const [token,searchToken] = useState('')
    useEffect(()=>{
        if(token.length > 0) {
            let arr = tokenList.filter(item => item.symbol.substr(0,token.length).toLowerCase() === token.toLowerCase() || item.name.substr(0,token.length).toLowerCase() === token.toLowerCase())
            setList(sortList(arr))
        } else if(currentToken === 'from'){
            setList(sortList(tokenList.filter(token => token.symbol !== toToken.symbol)))
        } else {
            setList(sortList(tokenList.filter(token => token.symbol !== fromToken.symbol)))
        }
        setLoader(tokenList.length > 15)
    },[loader,tokenList,token])
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select token" showTitle={true}  back={true} />
            <Search after={null} placeholder='Search' onChange={(e) => searchToken(e.target.value)}/>  
            {loader ? list.map(item => (
                <TokenItem item={item} withAmount={true} key={item.symbol}/>
            )):
            <Loader id='centered-loader'/>}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {}) (SelectTokenPanel);
