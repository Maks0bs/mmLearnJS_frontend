import React, {Component} from 'react';
import {REACT_APP_API_URL} from "../../../../../../../constants";
import DefaultUserAvatar from "../../../../../../../res/images/DefaultUserAvatar.png";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

/**
 * Displays basic information about the user (if it should be displayed)
 * and the actions that the authenticated user can perform with their account
 * @memberOf components.views.classroom.user.User
 * @component
 */
class UserBasicInfoAndActions extends Component {
    render() {
        let { photo, name, email, created,
            isAuthenticated, activated, _id
        } = this.props;
        return (
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`${REACT_APP_API_URL}/files/download/${photo}`}
                        alt={name}
                        className="card-img-top"
                        style={{width: 'auto', height: '200px'}}
                        onError={e => (e.target.src = `${DefaultUserAvatar}`)}
                    />
                </div>
                <div className="col-md-8">
                    <div className="lead mt-2">
                        {name && (<p>{name}</p>)}
                        {email && (<p>Email: {email}</p>)}
                        {created && (<p>{`Joined ${new Date(created).toDateString()}`}</p>)}
                    </div>
                    {isAuthenticated && (
                        <div className="d-inline-block">
                            <Link
                                className="btn btn-raised btn-success mr-5"
                                to={`/classroom/user/${_id}/edit`}
                            >
                                Edit profile
                            </Link>
                            <a
                                href="#void"
                                style={{display: activated ? 'none' : '',
                                    color: 'red'
                                }}
                                onClick={this.props.resendActivation}
                            >
                                <strong>Resend activation link</strong>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
UserBasicInfoAndActions.propTypes = {
    /**
     * The URI to the user's photo
     */
    photo: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    /**
     * The string with formatted date on which the user was created
     */
    created: PropTypes.string,
    /**
     * true if the displayed user is authenticated
     */
    isAuthenticated: PropTypes.bool,
    _id: PropTypes.string,
    /**
     * True if user is activated
     */
    activated: PropTypes.bool,
    resendActivation: PropTypes.func.isRequired
}
export default UserBasicInfoAndActions;