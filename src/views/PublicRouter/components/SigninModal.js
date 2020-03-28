import React, { Component } from 'react';
import { hideModal } from '../../components/services/actions';
import { connect } from 'react-redux'


class SigninModal extends Component {
    render() {
        return (
            <div>
                <h1>Signin modal</h1>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

                <button onClick={() => this.props.hideModal()}> Close </button>
            </div>
        )
    }
}


export default connect(
    null,
    { hideModal }
)(SigninModal);
