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
        let inlineStyle = {display: 'flex', alignItems: 'center'}
        return (
            <form onSubmit={onSubmit}>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted my-0 mx-2">Name</label>
                    <input
                        onChange={this.handleChange("name")}
                        type="text"
                        className="form-control"
                        value={name}
                    />
                </div>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted my-0 mx-2">Email</label>
                    <input
                        onChange={this.handleChange("email")}
                        type="email"
                        className="form-control"
                        value={email}
                        readOnly
                    />
                </div>
                <div className="form-group" style={inlineStyle}>
                    <label className="text-muted my-0 mx-2">About</label>
                    <textarea
                        style={{
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderColor: 'gray'
                        }}
                        onChange={this.handleChange("about")}
                        className="form-control"
                        value={about}
                    />
                </div>
                <hr/>
                <div style={{...inlineStyle, flexFlow: 'row wrap'}}>
                    <a href="#void" onClick={onShowEditFields}>
                        <strong> Edit what others people see in your profile </strong>
                    </a>
                    <button
                        className="btn btn-raised btn-danger mx-3"
                        type="button"
                        onClick={onShowDeleteUser}
                    >
                        Delete User
                    </button>
                </div>
                <hr/>

                <p className="mt-4">Update password</p>
                <div style={{...inlineStyle, flexFlow: 'row wrap'}}>
                    <div className="form-group" style={inlineStyle}>
                        <label className="text-muted my-0 mx-2">Old password</label>
                        <input
                            onChange={this.handleChange("oldPassword")}
                            type="password"
                            className="form-control"
                            value={oldPassword}
                        />
                    </div>
                    <div className="form-group" style={inlineStyle}>
                        <label className="text-muted mx-2 my-2">New password</label>
                        <input
                            onChange={this.handleChange("newPassword")}
                            type="password"
                            className="form-control"
                            value={newPassword}
                        />
                    </div>
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