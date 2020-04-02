import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { hideModal } from './ModalRoot/services/actions';//maybe pass hidemodal from upper class, not with redux
import { connect } from 'react-redux'
import Signin from './Signin'


// make controlled components

class SigninModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRender: true
        }

    }

    handleClose = () => {
        this.setState({
            shouldRender: false
        })

    }

    render() {
        if (!this.state.shouldRender) {
            this.props.hideModal();
            return null;
        }
        return (
            <div>
                <button 
                    onClick={() => this.props.hideModal()}
                    className="float-right close m-2"
                > 
                    <span aria-hidden="true">&times;</span>
                </button>
                <Signin onClose={this.handleClose}/>
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
