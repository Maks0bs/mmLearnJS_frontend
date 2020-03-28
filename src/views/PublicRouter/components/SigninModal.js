import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { hideModal } from '../../components/services/actions';
import { connect } from 'react-redux'


// make controlled components

class SigninModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            loading: false
        }

        //this.renderSigninForm = this.renderSigninForm.bind(this);
    }

    handleChange = (name) => (event) => {
        this.setState({
            error: "",
            [name]: event.target.value
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
                    className="btn btn-raised btn-primary"
                >
                    Sign in
                </button>
            </form>
        );
    }

    componentWillUnmount(){
        console.log('will unmount');
    }

    render() {
        let {email, password, error, loading} = this.state;
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


export default connect(
    null,
    { hideModal }
)(SigninModal);
