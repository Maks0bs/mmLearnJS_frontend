import React from "react";
import PropTypes from "prop-types";
import {transitionStyles} from "../../../services/helpers";
import {Transition} from "react-transition-group";

/**
 * Navigation element, which opens a dropdown list of inner components.
 * Displays `props.children` when open
 *
 * @memberOf components.common
 * @component
 */
class NavDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
    }
    hasFocus = false;

    toggleDropdown(e) {
        e && e.preventDefault();
        this.setState({
            isToggleOn: !this.state.isToggleOn
        })
    }

    componentDidMount() {
        /*
            When user clicks outside of dropdown, close it
            Also listener for enter press to open/close dropdown, when focused
         */
        document.addEventListener('mousedown', this.handleClick, false);
        document.addEventListener('keypress', this.handleKeyPress, false);
    }

    componentWillUnmount() {
        /*
            Cleanup to prevent memory leaks
         */
        document.removeEventListener('mousedown', this.handleClick, false);
        document.removeEventListener('keypress', this.handleKeyPress, false);
    }

    handleKeyPress = (e) => {
        if (e.key && e.key === 'Enter' && this.hasFocus){
            this.toggleDropdown();
        }
    }

    handleClick = (e) => {
        /*
            When user clicks outside of dropdown, close it
         */
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
        // class name specifies the state - if dropdown inner elements should be displayed
        let classDropdownMenu = 'dropdown-menu ' + (this.state.isToggleOn ? 'show' : '')
        return (
            <li
                className="nav-item dropdown"
                ref={node => (this.innerContentRef = node)}
            >
                <a
                    className="nav-link dropdown-toggle"
                    onClick={(e) => {this.toggleDropdown(e)}}
                    style={{
                        cursor: 'pointer',
                        textTransform: 'none',
                        alignItems: 'center'
                    }}
                    tabIndex={0}
                    onFocus={() => this.hasFocus = true}
                    onBlur={() => this.hasFocus = false}
                >
                    {this.props.name}
                    {this.props.displayComponent && this.props.displayComponent}
                </a>
                <Transition
                    in={this.state.isToggleOn}
                    timeout={70}
                    unmountOnExit
                    appear
                >
                    {state => (
                        <ul
                            className={`dropdown-menu show dropdown-menu-right`}
                            style={{
                                ...transitionStyles.scaleDownBottom[state],
                                overflow: 'auto',
                                //Don't let the dropdown overflow the screen size
                                maxHeight: window.innerHeight / 2
                            }}
                        >
                            {this.props.children}
                        </ul>
                    )}
                </Transition>

            </li>

        )
    }
}

NavDropdown.propTypes = {
    /**
     * The name that should primarily be displayed on the dropdown
     * (when it is closed in the first place)
     */
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    /**
     * The additional component that should be displayed apart
     * from the name
     */
    displayComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.string
    ])
}

export default NavDropdown;