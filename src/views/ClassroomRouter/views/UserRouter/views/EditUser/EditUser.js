import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import DefaultUserAvatar from '../../../../../../res/images/DefaultUserAvatar.png'
import { REACT_APP_API_URL } from "../../../../../../constants"
import { updateUser, clearError, getUser } from '../../services/actions'
import { addToast } from '../../../../../../components/ToastRoot/services/actions'
import { showModal, hideModal } from "../../../../../../components/ModalRoot/services/actions";
import EditFields from "./components/EditFields"
import DeleteUser from "./components/DeleteUser";

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
        if (!this.props.user){

        }
        let { name, email, about, photo } = this.props.user;
        this.setState({
            name,
            email,
            about: about || '',
            photo: photo || null
        })

        if (! this.props.authenticatedUser || (this.props.authenticatedUser._id !== this.props.user._id) ){
            this.setState({
                redirect: true
            })
        }
    }


    handleChange = (name) => (event) => {
        this.props.clearError();
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
    }

    onEditFields = (e) => {
        e.preventDefault();
        this.props.showModal(
            <EditFields
                onClose={this.props.hideModal}
            />
        )
    }

    onShowDeleteUser = (e) => {
        e.preventDefault();
        this.props.showModal(
            <DeleteUser
                onClose={this.props.hideModal}
                userId={this.props.user._id}
            />
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(
            {
                ...this.state,
                hiddenFields: this.props.newHiddenFields
            },
            this.props.user._id
        )
            .then(() => {
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
                    this.props.getUser(this.props.user._id)
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

        console.log(this.props);

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

                {/*
                    Using URL.createObjectURL on every render is very inefficient
                    TODO create additional state for photo preview
                */}
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
                            onChange={this.handleChange("name")}
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
                    <a
                        href="#void"
                        onClick={this.onEditFields}
                    >
                        <strong> Edit what others people see in your profile </strong>
                    </a>
                    <br />
                    <button
                        className="btn btn-raised btn-danger mt-3"
                        type="button"
                        onClick={this.onShowDeleteUser}
                    >
                        Delete User
                    </button>
                    <p className="mt-4">Update password</p>
                    <div className="form-group">
                        <label className="text-muted">Old password</label>
                        <input
                            onChange={this.handleChange("oldPassword")}
                            type="password"
                            className="form-control"
                            value={oldPassword}
                        />
                        <label className="text-muted mt-5">New password</label>
                        <input
                            onChange={this.handleChange("newPassword")}
                            type="password"
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
                            className="btn btn-raised btn-outline ml-2"
                            type="button"
                            onClick={this.onCancel}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.user,
        authenticatedUser: state.services.authenticatedUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data, id) => dispatch(updateUser(data, id)),
        getUser: (id) => dispatch(getUser(id)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        showModal: (component) => dispatch(showModal(component)),
        hideModal: () => dispatch(hideModal()),
        clearError: () => dispatch(clearError())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser)