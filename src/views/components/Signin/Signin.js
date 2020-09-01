import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { signin, clearMessages } from './services/actions'
import { addToast } from '../../../components/ToastRoot/services/actions'
import { hideModal } from "../../../components/ModalRoot/services/actions";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {getAuthenticatedUser} from "../../../services/main/actions";

/**
 * Used to display modals with any custom component inside
 * There should only be one ModalRoot per app
 *
 * @memberOf components.views.components
 * @component
 */
class Signin extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            reload: false
        }

    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
        this.props.clearMessages();
    }

    handleLeave = () => {
        this.props.clearMessages();
        this.props.shouldCloseModal && this.props.hideModal();
    }

    componentWillUnmount() {
        this.handleLeave();
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.signin({...this.state})
            .then(() => this.props.getAuthenticatedUser())
            .then(() => {
                if (!this.props.error){
                    this.setState({
                        reload: true
                    })
                    this.props.addToast(
                        (<div>You have signed in successfully</div>),
                        {type: 'success'}
                    )
                }
            })
    }

    renderSigninForm = (email, password) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        onChange={this.handleChange("email")}
                        type="email"
                        className="form-control"
                        value={email}
                        placeholder="example@email.com"
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input 
                        onChange={this.handleChange("password")}
                        type="password" 
                        className="form-control"
                        value={password}
                    />
                </div>

                <button 
                    className="btn btn-outline btn-raised"
                    onClick={this.onSubmit}
                >
                    Sign in
                </button>
            </form>
        );
    }

    render() {
        let {email, password, reload} = this.state;
        let { error, message } = this.props;
        let isMobileWidth = (window.innerWidth <= 1000)
        if (reload){
            this.handleLeave();
            if (this.props.shouldRedirect){
                return (<Redirect to={`/classroom/dashboard`} />)
            }

            return (<Redirect to={this.props.location.pathname} />)
        }
        return (
            <div>
                <div
                    className="container text-center my-3"
                    style={{width: isMobileWidth ? '90%' : '60%'}}
                >
                    <h1>Sign in</h1>
                    <div
                        className="alert alert-danger"
                        style={{display: error ? "" : "none"}}
                    >
                        {error}
                    </div>

                    <div
                        className="alert alert-info"
                        style={{display: message ? "" : "none"}}
                    >
                        {message}
                    </div>

                    {this.renderSigninForm(email, password)}
                </div>
                <div className="p-3">
                    <p>
                        <Link 
                            to="/forgot-password" 
                            className="text-danger"
                            onClick={this.handleLeave}
                        >
                            Forgot Password
                        </Link>
                    </p>
                    <p> Don't have an account?{' '}
                        <Link 
                            to="/signup" 
                            className="text-info"
                            onClick={this.handleLeave}
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}



let mapStateToProps = (state) => ({
    ...state.views.components.signin
})
let mapDispatchToProps = (dispatch) => ({
    clearMessages: () => dispatch(clearMessages()),
    signin: (user) => dispatch(signin(user)),
    addToast: (component, options) => dispatch(addToast(component, options)),
    getAuthenticatedUser: () => dispatch(getAuthenticatedUser()),
    hideModal: () => dispatch(hideModal())
})

Signin.propTypes = {
    /**
     * Set to true if the user should be redirected to `/classroom/dashboard`
     * after successfully singing in
     */
    shouldRedirect: PropTypes.bool,
    /**
     * True if the modal in {@link ModalRoot} should be closed
     * after successful sign in
     */
    shouldCloseModal: PropTypes.bool
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Signin));
