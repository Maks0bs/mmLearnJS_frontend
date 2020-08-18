import React from "react";
import PropTypes from "prop-types";

class NavDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
    }
    toggleDropdown(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if (!this.state.isToggleOn ||
            (this.innerContentRef && this.innerContentRef.contains(e.target))
        ){
            return;
        }
        this.setState({
            isToggleOn: false
        })
    }

    render() {
        const classDropdownMenu = 'dropdown-menu ' + (this.state.isToggleOn ? 'show' : '')
        return (
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    onClick={(e) => {this.toggleDropdown(e)}}
                    style={{
                        cursor: 'pointer',
                        textTransform: 'none'
                    }}
                >
                    {this.props.name}
                    {this.props.displayComponent && this.props.displayComponent}
                </a>
                <ul
                    className={`${classDropdownMenu} dropdown-menu-right`}
                    ref={node => (this.innerContentRef = node)}
                >
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