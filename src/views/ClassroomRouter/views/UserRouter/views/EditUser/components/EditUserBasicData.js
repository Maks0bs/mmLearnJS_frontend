import React, {Component} from 'react';
import { editUserData } from "../../../services/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

/**
 * This component is responsible for handling the editing
 * of basic user data (mostly text fields like name, email)
 * @memberOf components.views.classroom.user.EditUser
 * @component
 */
class EditUserBasicData extends Component {

    handleChange = (name) => (event) => {
        this.props.editUserData({
            [name]: event.target.value
        })
    }

    render() {
        let { name, about, email,
            newPassword, oldPassword
        } = this.props.newUserData
        let { onCancel, onSubmit, onShowEditFields,
            onShowDeleteUser
        } = this.props;
        return (
            <form onSubmit={onSubmit}>
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
                <hr/>
                <a href="#void" onClick={onShowEditFields}>
                    <strong> Edit what others people see in your profile </strong>
                </a>
                <hr/>
                <button
                    className="btn btn-raised btn-danger mt-3"
                    type="button"
                    onClick={onShowDeleteUser}
                >
                    Delete User
                </button>
                <hr />
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
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-raised btn-outline ml-2"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.user
})
let mapDispatchToProps = (dispatch) => ({
    editUserData: (data) => dispatch(editUserData(data))
})
EditUserBasicData.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onShowEditFields: PropTypes.func.isRequired,
    onShowDeleteUser: PropTypes.func.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserBasicData)