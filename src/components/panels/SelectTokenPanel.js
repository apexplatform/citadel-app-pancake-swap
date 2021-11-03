import ROUTES from '../../routes'
import { Panel,Search } from '@vkontakte/vkui';
import Header from '../uikit/Header'
import {connect} from 'react-redux';
import TokenItem from '../uikit/TokenItem'
import { useState } from 'react';
import {sortList} from '../helpers'
import Loader from '../uikit/Loader'
const SelectTokenPanel = (props) => {
    const {tokenList} = props.walletReducer
    const [list,setList] = useState(sortList(tokenList))
    const searchToken = (token) => {
        let arr = tokenList.filter(item => item.symbol.substr(0,token.length).toLowerCase() === token.toLowerCase() || item.name.substr(0,token.length).toLowerCase() === token.toLowerCase())
        setList(sortList(arr))
        if(token.length < 1) setList(sortList(tokenList))
    }
    return(
        <Panel id={ROUTES.SELECT_ADDRESS}>
            <Header title="Select token" showTitle={true}  back={true} />
            <Search after={null} placeholder='Search' onChange={(e) => searchToken(e.target.value)}/>  
            {list.length ? list.map(item => (
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
