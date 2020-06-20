import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link, Redirect} from "react-router-dom";
import DefaultUserAvatar from '../../../../../../res/images/DefaultUserAvatar.png'
import { REACT_APP_API_URL } from "../../../../../../constants"
import { updateUser, clearMessages } from '../../services/actions'
import { addToast } from '../../../../../../components/ToastRoot/services/actions'


class EditUser extends Component {

    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            fileSize: 0,
            about: "",
            photo: null,
            redirect: false
        }
    }


    componentDidMount() {
        let { name, email, about, photo} = this.props.user;
        this.setState({
            name,
            email,
            about: about || '',
            photo: photo || null
        })
    }

    handleChange = (name) => (event) => {
        if (name === 'photo' && !event.target.files[0]){
            return this.setState({
                photo: null,
                fileSize: 0
            })
        } else if (name === 'photo' && event.target.files[0]){
            return this.setState({
                photo: event.target.files[0],
                fileSize: event.target.files[0].size
            })
        }
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        this.props.clearMessages();
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(
            {
                ...this.state
            },
            this.props.user._id
        )
            .then(() => {
                console.log('props are good', this.props);
                if (!this.props.error){
                    this.setState({
                        redirect: true
                    })

                    this.props.addToast(
                        (
                            <div>
                                User info updated successfully
                            </div>
                        ),
                        {
                            type: 'success'
                        }
                    )
                } else {
                    this.props.addToast(
                        (
                            <div>
                                {this.props.error}
                            </div>
                        ),
                        {
                            type: 'error'
                        }
                    )
                }
            })
    }

    onCancel = (e) => {
        e.preventDefault();

        this.setState({
            redirect: true
        })
    }


    render() {
        let { name, email, about, newPassword, oldPassword, photo, fileSize, redirect } = this.state;
        let { error } = this.props;

        if (redirect){
            return (
                <Redirect to={`/classroom/user/${this.props.user._id}`}/>
            )
        }

        return (
            <div className="container">

                <div
                    className="alert alert-danger"
                    style={{display: error ? "" : "none"}}
                >
                    {error}
                </div>

                <img
                    className="img-thumbnail"
                    src={(fileSize > 0) ? URL.createObjectURL(photo) : `${REACT_APP_API_URL}/files/download/${this.props.user.photo}`}
                    alt={name}
                    style={{height: "200px", width: 'auto'}}
                    onError={e => (e.target.src = `${DefaultUserAvatar}`)}
                />

                <form>
                    <div className="form-group">
                        <label className="text-muted">Profile photo</label>
                        <input
                            onChange={this.handleChange("photo")}
                            type="file"
                            accept="image/*"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input
                            onChange={this.handleChange("name")/*can be changed to this.handleChane.bind(this, "name")*/}
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input
                            onChange={this.handleChange("email")}
                            type="email"
                            className="form-control"
                            value={email}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">About</label>
                        <textarea
                            onChange={this.handleChange("about")}
                            className="form-control"
                            value={about}
                        />
                    </div>
                    <p className="mt-4">Update password</p>
                    <div className="form-group">
                        <label className="text-muted">Old password</label>
                        <input
                            onChange={this.handleChange("oldPassword")}
                            type="oldPassword"
                            className="form-control"
                            value={oldPassword}
                        />
                        <label className="text-muted mt-5">New password</label>
                        <input
                            onChange={this.handleChange("newPassword")}
                            type="newpassword"
                            className="form-control"
                            value={newPassword}
                        />
                    </div>

                    <div>
                        <button
                            className="btn btn-raised btn-primary"
                            type="submit"
                            onClick={this.onSubmit}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-raised btn-danger ml-2"
                            type="button"
                            onClick={this.onCancel}
                        >
                            Cancel
                        </button>
                    </div>

                </form>

                <Link
                    to="/forgot-password"
                    className="text-danger mt-2"
                    target="_blank"
                >
                    Forgot Password?
                </Link>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.user
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data, id) => dispatch(updateUser(data, id)),
        clearMessages: () => dispatch(clearMessages()),
        addToast: (component, options) => dispatch(addToast(component, options))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser)