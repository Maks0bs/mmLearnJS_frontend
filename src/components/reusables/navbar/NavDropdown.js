import React from "react";
import PropTypes from "prop-types";

class NavDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
    }
    showDropdown(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        const classDropdownMenu = 'dropdown-menu ' + (this.state.isToggleOn ? 'show' : '')
        return (
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    onClick={(e) => {this.showDropdown(e)}}
                    style={{
                        cursor: 'pointer',
                        textTransform: 'none'
                    }}
                >
                    {this.props.name}
                    {this.props.displayComponent && this.props.displayComponent}
                </a>
                <ul className={`${classDropdownMenu} dropdown-menu-right`}>
                    {this.props.children}
                </ul>
            </li>

        )
    }
}

NavDropdown.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    displayComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.string
    ])
}

export default NavDropdown;