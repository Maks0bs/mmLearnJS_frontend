import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { signin, clearMessages } from './services/actions'
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

    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })

        this.props.clearMessages();
    }

    handleLeave = () => {
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
        let {email, password, loading, redirectToClassroom} = this.state;
        let { error, message } = this.props;
        if (redirectToClassroom){
            this.handleLeave()
            return <Redirect to="/classroom" />
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
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        clearMessages: () => dispatch(clearMessages()),
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
