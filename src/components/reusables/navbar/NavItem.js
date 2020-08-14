import {Link} from "react-router-dom";
import React from "react";

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
            >
                {props.name}
            </Link>
        </li>
    );
}

export default NavItem;