import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {REACT_APP_API_URL} from "../../constants";
import DefaultUserAvatar from '../../res/images/DefaultUserAvatar.png'
import PropTypes from "prop-types";

/**
 * User preview and link.
 * Mainly used in forums and grade tables
 *
 * @memberOf components.common
 * @component
 */
class UserPreview extends Component {
    render() {
        let { _id, name, photo } = this.props;
        return (
            <div
                style={{
                    display: 'flex'
                }}
            >
                <Link to={`/classroom/user/${_id}`} >
                    <img
                        style={{
                            borderRadius: '50%',
                            border: '1px solid black'
                        }}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        src={`${REACT_APP_API_URL}/files/download/${photo}`}
                        alt={name}
                        onError={i =>
                            //Display default avatar is user has no profile photo
                            (i.target.src=`${DefaultUserAvatar}`)
                        }
                    />
                    <p style={{display: 'flex'}}>
                        {name}
                    </p>
                </Link>
            </div>
        );
    }
}

UserPreview.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    /**
     * The _id of the user's photo file in the database
     */
    photo: PropTypes.string
}

export default UserPreview;