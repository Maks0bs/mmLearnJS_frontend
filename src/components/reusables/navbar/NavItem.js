import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import NavDropdown from "./NavDropdown";

let NavItem = props => {
    if (props.brand){
        return (
            <Link className="navbar-brand" to={props.path}
            >
                {props.name}
            </Link>
        )
    }
    return (
        <li className={(props.path === props.pageURI) ? 'nav-item active' : 'nav-item'}>
            <Link
                to={props.path}
                className={props.disabled ? 'nav-link disabled' : 'nav-link'}
                style={{
                    textTransform: props.dynamic ? 'none' : ''

                }}
            >
                {props.dynamic ? (
                    <i>{props.name}</i>
                ) : (
                    props.name
                )}
            </Link>
        </li>
    );
}

NavItem.propTypes = {
    path: PropTypes.string,
    pageURI: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    brand: PropTypes.bool,
    dynamic: PropTypes.bool
}

export default NavItem;