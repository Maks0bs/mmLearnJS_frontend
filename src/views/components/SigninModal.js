import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { hideModal } from '../../components/ModalRoot/services/actions';//maybe pass hidemodal from upper class, not with redux
import { connect } from 'react-redux'
import Signin from './Signin'


// make controlled components

class SigninModal extends Component {
    render() {
        return (
            <div>
                <Signin onClose={this.props.hideModal}/>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal())
    }
}


export default connect(
    null,
    mapDispatchToProps
)(SigninModal);
