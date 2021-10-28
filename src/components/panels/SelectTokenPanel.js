import ROUTES from '../../routes'
import { Panel,Search } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import TokenItem from '../uikit/TokenItem'
import { useState } from 'react';

const SelectTokenPanel = (props) => {
    const {tokenList,fromToken} = props.walletReducer
    console.log(fromToken,'---fromToken')
    const [list,setList] = useState(tokenList)
    const searchToken = (token) => {
        let arr = tokenList.filter(item => item.symbol.substr(0,token.length).toLowerCase() === token.toLowerCase() || item.name.substr(0,token.length).toLowerCase() === token.toLowerCase())
        setList(arr)
        if(token.length < 1) setList(tokenList)
    }
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select token to send" back={true} />
            <Search after={null} placeholder='Search' onChange={(e) => searchToken(e.target.value)}/>  
            {list.map(item => (
                <TokenItem item={item} withAmount={true} key={item.symbol}/>
            ))}
        </Panel>
    )
}

const mapStateToProps=(state)=>({
	walletReducer: state.walletReducer
})

export default connect(mapStateToProps, {}) (SelectTokenPanel);
