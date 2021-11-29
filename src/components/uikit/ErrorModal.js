import { ModalRoot,ModalPage,ModalPageHeader } from '@vkontakte/vkui';
import {setActivePanel,setActiveModal} from '../../store/actions/panelActions'
import {connect} from 'react-redux';
import '../styles/components/errorModal.css'
import text from '../../text.json'
const ErrorModal = (props) => {
    const {activeModal} = props.panelReducer
    const {networkErrors,validationErrors} = props.errorsReducer
    return(
		<ModalRoot activeModal={activeModal}>
		  <ModalPage id="errors" dynamicContentHeight onClose={() => props.setActiveModal(null)}>
        <div id='modal-header'>
            <img src='/img/icons/errorModal.svg' alt='error' />
            <p className='error-title'>{networkErrors?.text ? text.ERROR_HEADER : 'Error!'}</p>
        </div>
			<p className='error-text'>{networkErrors?.text || validationErrors?.text}</p>
            <p className='error-description'>{networkErrors?.description || validationErrors?.description}</p>
        <div className='error-tips'>
            <img src='/img/icons/tips.svg' alt='error' />
            <div>
                <h4>{text.TIP}</h4>
                <span className='tips-description'>{networkErrors?.tip || validationErrors?.tip}</span>
            </div>
        </div>
        <button className='error-btn' onClick={() => props.setActiveModal(null)}>Ok</button>
		  </ModalPage>
		</ModalRoot>
	  );
}

const mapStateToProps=(state)=>({
	panelReducer: state.panelReducer,
    errorsReducer: state.errorsReducer
})

export default connect(mapStateToProps, {setActiveModal,setActivePanel}) (ErrorModal);
