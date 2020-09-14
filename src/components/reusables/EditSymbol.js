import React, {Component} from 'react';
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
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
        let { del } = this.props;
        return (
            <Icon
                {...this.props}
                icon={this.props.del ? faTrashAlt : faPencilAlt}
                onClick={this.onClick}
                style={{
                    ...this.props.style,
                    cursor: 'pointer',
                    color: this.state.editSymbolColor
                }}
                onMouseEnter={() =>
                    this.setState({
                        editSymbolColor: del ? 'red' : 'blue'
                    })
                }
                onMouseLeave={() => this.setState({editSymbolColor: ''})}
            />
        );
    }
}

EditSymbol.propTypes = {
    onClick: PropTypes.func,
    /**
     * Should be true if activation of this symbol
     * causes deletion of some kind
     */
    del: PropTypes.bool
}
export default EditSymbol;