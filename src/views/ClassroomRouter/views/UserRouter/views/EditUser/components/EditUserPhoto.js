import React, {Component} from 'react';
import {REACT_APP_API_URL} from "../../../../../../../constants";
import DefaultUserAvatar from "../../../../../../../res/images/DefaultUserAvatar.png";
import { editPhoto } from "../../../services/actions";
import {connect} from "react-redux";

/**
 * This component is responsible for handling the upload
 * of new user profile photos
 * @memberOf components.views.classroom.user.EditUser
 * @component
 */
class EditUserPhoto extends Component {

    handlePhotoChange = (event) => {
        if (!event.target.files[0]){
            //If file selection was canceled, remove file refs and size
            return this.props.editPhoto({
                photo: null,
                fileSize: 0
            })
        } else {
            return this.props.editPhoto({
                photo: event.target.files[0],
                fileSize: event.target.files[0].size
            })
        }
    }

    render() {
        let { fileSize, photo } = this.props.newPhotoData;
        return (
            <div>
                <img
                    className="img-thumbnail"
                    src={(fileSize > 0) ? URL.createObjectURL(photo) :
                        `${REACT_APP_API_URL}/files/download/${this.props.user.photo}`}
                    alt={this.props.user.name}
                    style={{height: "200px", width: 'auto'}}
                    onError={e => (e.target.src = `${DefaultUserAvatar}`)}
                />
                <div className="form-group">
                    <label className="text-muted">Profile photo</label>
                    <input
                        onChange={this.handlePhotoChange}
                        type="file"
                        accept="image/*"
                        className="form-control"
                    />
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.user
})
let mapDispatchToProps = (dispatch) => ({
    editPhoto: (data) => dispatch(editPhoto(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserPhoto)