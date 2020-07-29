import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faPencilAlt, faCheck} from "@fortawesome/free-solid-svg-icons";

//TODO add docs / explanations for all props needed in this component

class ChoiceOption extends Component {
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            backgroundColor: '#dedede',
            editText: ''
        }
    }

    componentDidMount() {
        if (this.props.keepEdit){
            this.textArea.focus();
        }
        this.setState({
            backgroundColor: this.props.correct ? '#2c8f31' : '#dedede'
        })
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    toggleCorrect = (e) => {
        e.preventDefault();
        this.props.onToggleCorrect();
    }

    onEditSubmit = (e) => {
        e.preventDefault();
        this.props.onEditSubmit(this.state.editText);
        this.setState({
            editing: false
        })
    }

    handleMouseEnter = (e) => {
        e.preventDefault();
        this.setState({
            backgroundColor: this.props.correct ? '#1ad924' : '#919191'
        })
    }

    handleMouseLeave = (e) => {
        e.preventDefault();
        this.setState({
            backgroundColor: this.props.correct ? '#2c8f31' : '#dedede'
        })
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.onDelete();
    }

    onInputEnterHandle = (e) => {
        if (e.key === 'Enter'){
            this.onEditSubmit(e);
        }
    }

    onToggleEdit = (e) => {
        e.preventDefault();
        this.setState({
            editing: true,
            editText: this.props.option.text || this.props.option
        })
    }

    render() {
        let { option, keepEdit } = this.props;
        let { editing, backgroundColor, editText } = this.state;
        return (
            <p
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{
                    background: backgroundColor,
                    alignItems: 'center',
                    display: 'inline-block',
                    borderRadius: '5px',
                    padding: '3px',
                    margin: '2px',
                }}
            >
                {editing || keepEdit ? (
                    <span>
                        <span
                            onSubmit={this.onEditSubmit}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: 0
                            }}
                        >
                            <textarea
                                value={editText}
                                onKeyPress={this.onInputEnterHandle}
                                onChange={this.handleChange("editText")}
                                ref={(ta) => this.textArea = ta }
                            />
                            <Icon
                                className="mx-1"
                                onClick={this.onEditSubmit}
                                icon={ faCheck }
                                style={{
                                    float: 'right',
                                    cursor: 'pointer',
                                    color: 'green'
                                }}
                            />

                        </span>
                    </span>
                ) : (
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <span
                            onClick={this.toggleCorrect}
                            className="mx-1"
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            {option.text || option}
                        </span>
                        <Icon
                            className="mx-1"
                            icon={faTrashAlt}
                            style={{
                                float: 'right',
                                cursor: 'pointer'
                            }}
                            onClick={this.onDelete}
                        />
                        <Icon
                            className="mx-1"
                            icon={faPencilAlt}
                            style={{
                                float: 'right',
                                cursor: 'pointer'
                            }}
                            onClick={this.onToggleEdit}
                        />
                    </span>
                )}
            </p>
        );
    }
}

export default ChoiceOption