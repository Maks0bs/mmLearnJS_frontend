import React, {Component} from 'react';
import NavDropdown from "../../../../../components/reusables/navbar/NavDropdown";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faBell as faBellSolid} from "@fortawesome/free-solid-svg-icons";
import {faBell as faBellHollow} from "@fortawesome/free-regular-svg-icons";
import NotificationItem from "../../../../../components/reusables/navbar/NotificationItem";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * A part of {@link components.views.classroom.ClassroomMenu}
 * for authenticated users
 * @memberOf components.views.classroom.ClassroomMenu
 * @component
 */
class ClassroomMenuUserActions extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.onLogout();
    }

    render() {
        let { notifications, userName, userId} = this.props;
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <NavDropdown
                    name={ notifications.length > 0 ? notifications.length : ''}
                    displayComponent={
                        <Icon
                            icon={notifications.length > 0 ?
                                faBellSolid : faBellHollow
                            }
                            size="2x"
                        />
                    }
                    tabIndex={0}
                >
                    {notifications.map((n, i) => (
                        <NotificationItem
                            key={i}
                            created={n.created}
                            title={n.title}
                            text={n.text}
                        />
                    ))}
                </NavDropdown>

                <NavDropdown name={userName || 'user'} tabIndex={0}>
                    <Link
                        className="dropdown-item text-right"
                        to={`/classroom/user/${userId}`}
                    >
                        Profile
                    </Link>
                    <Link
                        className="dropdown-item"
                        to="/classroom/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="dropdown-item"
                        to="/classroom/courses"
                    >
                        Courses
                    </Link>
                    <a
                        className="dropdown-item"
                        onClick={this.handleLogout}
                        tabIndex={0}
                        href="#void"
                    >
                        Log out
                    </a>
                </NavDropdown>
            </div>
        );
    }
}

ClassroomMenuUserActions.propTypes = {
    onLogout: PropTypes.func.isRequired,
    userName: PropTypes.string,
    userId: PropTypes.string.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({
        created: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string
    }))
}
export default ClassroomMenuUserActions;