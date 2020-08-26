import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {REACT_APP_API_URL} from "../../constants";
import DefaultUserAvatar from '../../res/images/DefaultUserAvatar.png'
import PropTypes from "prop-types";

/**
 * User preview and link.
 * Mainly used in forums and grade tables
 * @component
 */
class UserPreview extends Component {
    render() {
        let { user } = this.props;
        return (
            <div
                style={{
                    display: 'flex'
                }}
            >
                <Link to={`/classroom/user/${user._id}`} >
                    <img
                        style={{
                            borderRadius: '50%',
                            border: '1px solid black'
                        }}
                        className="float-left mr-2"
                        height="30px"
                        width="30px"
                        src={`${REACT_APP_API_URL}/files/download/${user.photo}`}
                        alt={user.name}
                        onError={i =>
                            (i.target.src=`${DefaultUserAvatar}`)
                        }
                    />
                    <p
                        style={{
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {user.name}
                    </p>
                </Link>
            </div>
        );
    }
}

UserPreview.propTypes = {
    /**
     * The whole user date, necessary to display the preview:
     * `_id`, `name`, `photo`
     * See API docs for details
     */
    user: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        photo: PropTypes.string
    })
}

export default UserPreview;