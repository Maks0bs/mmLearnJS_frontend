import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {REACT_APP_API_URL} from "../constants";
import DefaultUserAvatar from '../res/images/DefaultUserAvatar.png'


class UserPreview extends Component {
    render() {
        let { user } = this.props;
        console.log(user);
        return (
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
                <p>{user.name}</p>
            </Link>
        );
    }
}

export default UserPreview;