import React, {Component} from 'react';
import {REACT_APP_API_URL} from "../../../../../../../constants";
import DefaultUserAvatar from "../../../../../../../res/images/DefaultUserAvatar.png";
import { editUserData } from "../../../services/actions";
import {connect} from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * This component is responsible for handling the upload
 * of new user profile photos
 * @memberOf components.views.classroom.user.EditUser
 * @component
 */
class EditUserPhoto extends Component {

    handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            return this.props.editUserData({
                photo: e.target.files[0],
                photoSize: e.target.files[0].size
            })
        }
    }

    handleRemovePhoto = (e) => {
        e.preventDefault();
        return this.props.editUserData({
            photo: null,
            photoSize: 0
        })
    }

    handleRestorePrevPhoto = (e) => {
        e.preventDefault();
        return this.props.editUserData({
            photo: this.props.user.photo,
            photoSize: 0
        })
    }

    render() {
        let { photoSize, photo } = this.props.newUserData;
        let inlineStyle = {
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'row wrap'
        }
        return (
            <div style={inlineStyle}>
                <img
                    className="img-thumbnail"
                    src={(photoSize > 0) ? URL.createObjectURL(photo) :
                        `${REACT_APP_API_URL}/files/download/${photo}`}
                    alt={this.props.user.name}
                    style={{height: "200px", width: 'auto'}}
                    onError={e => (e.target.src = `${DefaultUserAvatar}`)}
                />
                <div>
                    <div className="form-group mx-2 my-2" style={inlineStyle}>
                        <label className="text-muted my-0">
                            Upload new profile photo
                        </label>
                        <input
                            onChange={this.handlePhotoChange}
                            type="file"
                            accept="image/*"
                            className="form-control"
                        />
                    </div>
                    <div style={inlineStyle}>
                        <a
                            className="mx-2"
                            style={{...inlineStyle, color: 'grey'}}
                            href="#void"
                            onClick={this.handleRestorePrevPhoto}
                        >
                            <Icon className="mx-1" icon={faUndoAlt} />
                            Restore previous photo (before changes)
                        </a>
                        <a
                            className="mx-2"
                            style={{...inlineStyle, color: 'red'}}
                            href="#void"
                            onClick={this.handleRemovePhoto}
                        >
                            <Icon className="mx-1" icon={faTimes} />
                            Remove photo
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.user
})
let mapDispatchToProps = (dispatch) => ({
    editUserData: (data) => dispatch(editUserData(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserPhoto)