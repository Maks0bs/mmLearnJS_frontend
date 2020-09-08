import React, {Component} from 'react';
import {clearMessages} from "../services/actions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

/**
 * The form for putting user data in order to sign up
 * @property {Object} startingStateFromParams - starting state for the
 * signup form. Extracted from URI params.
 *
 * @memberOf components.views.public.SignupComponent
 * @component
 */
class SignupForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            /*
                Control the checkbox which specifies if the
                user wants to register a teacher account
            */
            teacherChecked: false,
            /*
                The password required to create the teacher account.
                See API docs for details regarding this password
            */
            teacherPassword: ''
        }
    }

    componentDidMount() {
        this.setState({
            ...this.props.startingState
        })
    }

    componentWillUnmount() {
        this.props.clearMessages();
    }

    handleChange = (name) => (event) => {
        this.props.clearMessages();
        this.setState({
            [name]: event.target.value
        })
    }

    handleTeacherCheck = () => {
        this.setState({
            teacherChecked: !this.state.teacherChecked,
            teacherPassword: ''
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state})
            .then(() => {
                if (!this.props.error){
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        teacherPassword: '',
                        teacherChecked: false
                    })
                }
            })
    }

    render() {
        let { name, email, password, teacherChecked, teacherPassword } = this.state;
        let inlineStyle = {display: 'flex', alignItems: 'center'}
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted m-2">Name</label>
                    <input
                        onChange={this.handleChange("name")}
                        type="text"
                        className="form-control"
                        value={name}
                    />
                </div>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted m-2">Email</label>
                    <input
                        onChange={this.handleChange("email")}
                        type="email"
                        className="form-control"
                        value={email}
                    />
                </div>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted m-2">Password</label>
                    <input
                        onChange={this.handleChange("password")}
                        type="password"
                        className="form-control"
                        value={password}
                    />
                </div>
                {(() => {
                    switch(this.props.invitation){
                        case 'teacher':
                            return (<p>You will be registered as a teacher</p>)
                        default:
                            return (
                                <div className="form-group" style={{alignItems: 'center'}}>
                                    <div className="form-group" style={inlineStyle}>
                                        <label
                                            className="text-muted my-0"
                                            htmlFor="signup-teacher-checkbox"
                                        >
                                            Sign up as a teacher?
                                        </label>
                                        <input
                                            id="signup-teacher-checkbox"
                                            type="checkbox"
                                            onChange={this.handleTeacherCheck}
                                            className="ml-3"
                                            checked={teacherChecked}
                                        />
                                    </div>

                                    <div
                                        className="form-group"
                                        style={{display: teacherChecked ? "flex" : "none"}}
                                    >
                                        <label className="text-muted m-2">
                                            Password for signing up as a teacher
                                        </label>
                                        <input
                                            onChange={this.handleChange("teacherPassword")}
                                            type="text"
                                            className="form-control"
                                            value={teacherPassword}
                                        />
                                    </div>
                                </div>
                            )
                    }
                })()}
                <button
                    className="btn btn-raised btn-outline"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    clearMessages: () => dispatch(clearMessages())
})
let mapStateToProps = (state) => ({
    ...state.views.public.signup
})
SignupForm.propTypes = {
    /**
     * Specifies with what kind of invitation the user wants to sign up
     * Currently there is only an invitation to register as a teacher
     */
    invitation: PropTypes.string,
    /**
     * The exact type of registration
     * that should happen when the form is submitted,
     * specified in the {@link components.views.public.SignupComponent}
     */
    onSubmit: PropTypes.func,
    /**
     * Initial values of the fields in the form
     */
    startingState: PropTypes.object
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);