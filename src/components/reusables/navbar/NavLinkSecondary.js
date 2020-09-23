import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

/**
 *
 * Simple Navigation link for secondary navigation bar
 * (not the main, sticky one)
 *
 * @memberOf components.common
 * @component
 */
class NavLinkSecondary extends Component {
    constructor(props) {
        super(props);
        this.state = {backgroundColor: ''}
    }


    onClick = (e) => {
        e.preventDefault();
        this.props.onClick();
    }

    render() {
        let {
            active, className: propClassName, path,
            style, text, highlightColor, textColor
        } = this.props;
        let className = 'nav-item nav-link' + (active ? ' active' : '')
        return (
            <li
                style={{
                    display: 'inline-block',
                    float: 'none',
                    background: this.state.backgroundColor,
                    borderRadius: '5px',
                }}
                onMouseEnter={() => this.setState({
                    backgroundColor: highlightColor || '#f0f0f0'
                })}
                onMouseLeave={() => this.setState({backgroundColor: ''})}
            >
                <Link
                    className={className + ' ' + propClassName}
                    style={style && {...style}}
                    href="#void"
                    to={path}
                >
                    {active ? (<strong>{text}</strong>) : text}
                </Link>
            </li>
        );
    }
}

NavLinkSecondary.propTypes = {
    /**
     * The path which the link leads to
     */
    path: PropTypes.string.isRequired,
    /**
     * Set true if we are currently on this page
     */
    active: PropTypes.bool,
    /**
     * Text that should be displayed on the link
     */
    text: PropTypes.string,
    highlightColor: PropTypes.string
}
export default NavLinkSecondary;