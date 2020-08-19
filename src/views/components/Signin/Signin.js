import React, { Component, PureComponent } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { signin, clearMessages } from './services/actions'
import { getAuthenticatedUser } from "../../../services/actions";
import { addToast } from '../../../components/ToastRoot/services/actions'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'


// make controlled components

class Signin extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            reload: false
        }

    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })

        this.props.clearMessages();
    }

    handleLeave = () => {

        // this.setState({
        //     reload: false
        // })
        this.props.clearMessages();
        this.props.onClose && this.props.onClose();
    }

    onSubmit = (event) => {
        event.preventDefault();

        let {email, password} = this.state;
        let user ={
            email: email,
            password: password
        }

        this.props.signin(user)
            .then(() => {
                return this.props.getAuthenticatedUser();
            })
            .then(() => {
                if (!this.props.error){
                    this.setState({
                        reload: true
                    })

                    this.props.addToast(
                        (
                            <div>
                                You have signed in successfully
                            </div>
                        ),
                        {
                            type: 'success'
                        }
                    )
                }
            })
    }

    componentWillUnmount(){
        this.handleLeave();
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
        if (reload){
            this.handleLeave();
            if (this.props.shouldRedirect){
                return (
                    <Redirect to={`/classroom/dashboard`} />
                )
            }

            return (
                <Redirect 
                    to={{
                        pathname: '/reload',
                        state: {
                            page: this.props.location.pathname
                        }
                    }}
                />
            )
        }
        return (
            //TODO: add social login
            <div>
                <div className="p-4 text-center">
                    
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
                            onClick={(e) => this.handleLeave()}
                        >
                            Forgot Password
                        </Link>
                    </p>
                    <p>
                        Don't have an account?{' '}
                        <Link 
                            to="/signup" 
                            className="text-info"
                            onClick={(e) => this.handleLeave()}
                        >
                            Signup
                        </Link>
                    </p>
                </div>
                {/*this.state.reload && (<Redirect to={this.props.location.pathname} />)*/}
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        clearMessages: () => dispatch(clearMessages()),
        signin: (user) => dispatch(signin(user)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.components.signin
    }
}

Signin.propTypes = {
    shouldRedirect: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.string
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Signin));
