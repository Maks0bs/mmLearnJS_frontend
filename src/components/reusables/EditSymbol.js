import React, {Component} from 'react';
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
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
        this.state = { editSymbolColor: '' }
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.onClick && this.props.onClick();
    }

    render() {
        return (
            <Icon
                {...this.props}
                icon={faPencilAlt}
                onClick={this.onClick}
                style={{ cursor: 'pointer', color: this.state.editSymbolColor}}
                onMouseEnter={() => this.setState({editSymbolColor: 'blue'})}
                onMouseLeave={() => this.setState({editSymbolColor: ''})}
            />
        );
    }
}

EditSymbol.propTypes = {
    onClick: PropTypes.func
}
export default EditSymbol;