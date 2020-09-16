import React, {Component} from 'react';
import {
    faPencilAlt, faTrashAlt, faArrowCircleDown, faArrowCircleUp, faTimes, faCheck
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types'

/**
 * Interactive pencil symbol. Normally used to open some edit fields / forms
 * @memberOf components.common
 * @component
 */
class EditSymbol extends Component {
    constructor(props) {
        super(props);
        this.state = { editSymbolColor: '', icon: faTimes}
    }

    componentDidMount() {
        // get color that should be displayed on hover / focus depending on type
        switch(this.props.type){
            case 'edit': {
                this.activeColor = 'blue';
                this.setState({icon: faPencilAlt});
                break;
            }
            case 'delete': {
                this.activeColor = 'red';
                this.setState({icon: faTrashAlt});
                break;
            }
            case 'move-down': {
                this.activeColor = 'lightblue';
                this.setState({icon: faArrowCircleDown});
                break;
            }
            case 'move-up': {
                this.activeColor = 'lightblue';
                this.setState({icon: faArrowCircleUp});
                break;
            }
            case 'save': {
                this.activeColor = 'green';
                this.setState({icon: faCheck});
                break;
            }
        }
    }


    onClick = (e) => {
        e.preventDefault();
        this.props.onClick && this.props.onClick();
    }

    onColorIn = () => {
        this.setState({editSymbolColor: this.activeColor})
    }
    onColorOut = () => {
        this.setState({ editSymbolColor: '' })
    }

    render() {
        let { type } = this.props;
        return (
            <a
                title={type.split('-').join(' ')/* type comes separated by '-' */}
                href="#void"
                onClick={this.onClick}
                style={{ color: 'black'}}
                onFocusCapture={this.onColorIn}
                onBlur={this.onColorOut}
                onMouseEnter={this.onColorIn}
                onMouseLeave={this.onColorOut}
            >
                <Icon
                    className={this.props.className}
                    icon={this.state.icon}
                    style={{
                        ...this.props.style,
                        cursor: 'pointer',
                        color: this.state.editSymbolColor
                    }}
                />
            </a>
        );
    }
}

EditSymbol.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired
}
export default EditSymbol;