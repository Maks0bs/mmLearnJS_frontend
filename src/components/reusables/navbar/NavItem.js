import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

/**
 *
 * Simple Navigation item for navigation bars
 * @return {JSX.Element}
 *
 * @memberOf components.common
 * @component
 */
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
    /**
     * The path to compare to in order to find out, if this NavItem
     * has a link to the page, that is currently active
     */
    path: PropTypes.string.isRequired,
    /**
     * The URL of the current active page
     */
    pageURI: PropTypes.string.isRequired,
    /**
     * The NavItem is displayed with muted/dimmed text
     */
    disabled: PropTypes.bool,
    /**
     * The name that should primarily be displayed on the item
     */
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    /**
     * Set true to specify, that this NavItem should be displayed bigger
     * normally put to the left or to the right of the navigation bar
     */
    brand: PropTypes.bool,
    /**
     * Set true if this NavItem isn't always present on the navigation bar
     */
    dynamic: PropTypes.bool
}

export default NavItem;