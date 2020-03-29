import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { signin } from './services/actions'
import { hideModal } from '../../../components/services/actions';//maybe pass hidemodal from upper class, not with redux
import { connect } from 'react-redux'


// make controlled components

class Signin extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
            redirectToClassroom: false
        }

        //this.renderSigninForm = this.renderSigninForm.bind(this);
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        let {email, password} = this.state;
        let user ={
            email: email,
            password: password
        }

        this.props.signin(user)
            .then((data) => {
                if (!this.props.error){
                    this.setState({
                        email: '',
                        password: '',
                        redirectToClassroom: true
                    })
                }
            })
    }


    renderSigninForm = (email, password) => {
        return (
            <form onSubmit={this.onSubmit}>
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
                    type="submit"
                >
                    Sign in
                </button>
            </form>
        );
    }

    render() {
        let {email, password, loading, redirectToClassroom} = this.state;
        let { error, message } = this.props;
        if (redirectToClassroom){
            this.props.hideModal();
            return <Redirect to="/classroom" />
        }
        return (
            //TODO: add social login
            <div>
                <div className="p-4 text-center">
                    <button 
                        onClick={() => this.props.hideModal()}
                        className="float-right close"
                    > 
                        <span aria-hidden="true">&times;</span>
                    </button>
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
                            onClick={(e) => this.props.hideModal()}
                        >
                            Forgot Password
                        </Link>
                    </p>
                    <p>
                        Don't have an account?{' '}
                        <Link 
                            to="/signup" 
                            className="text-info"
                            onClick={(e) => this.props.hideModal()}
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        signin: (user) => dispatch(signin(user)) 
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.public.components.signin
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);
