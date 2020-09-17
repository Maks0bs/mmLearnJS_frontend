import React, {Component} from 'react';
import EditSymbol from "../../../../../../../../../../../components/reusables/EditSymbol";
import PropTypes from "prop-types";
import { v1 as uuidv1} from 'uuid'

class ChoiceOption extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false, editText: '',
            backgroundColor: '#dedede',
        }
    }

    componentDidMount() {
        if (this.props.keepEdit){
            this.textArea.focus();
        }
        this.setState({ backgroundColor: this.props.correct ? '#2c8f31' : '#dedede'})
    }

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value })
    }

    toggleCorrect = (e) => {
        e.preventDefault();
        this.props.onToggleCorrect();
    }

    onEditSubmit = (e) => {
        e && e.preventDefault();
        let { editText } = this.state;
        if (!editText) {
            return this.onDelete();
        }
        this.props.onEditSubmit(this.state.editText);
        this.setState({ editing: false })
    }

    onDelete = () => {
        this.props.onDelete();
    }

    onInputEnterHandle = (e) => {
        if (e.key === 'Enter'){
            this.onEditSubmit(e);
        }
    }

    onToggleEdit = (e) => {
        this.setState({
            editing: true,
            editText: this.props.option.text
        })
    }

    render() {
        let { option, keepEdit } = this.props;
        let { editing, backgroundColor, editText } = this.state;
        console.log(this.state);
        return (
            <p
                onMouseEnter={() => this.setState({
                    backgroundColor: this.props.correct ? '#1ad924' : '#919191'
                })}
                onMouseLeave={() => this.setState({
                    backgroundColor: this.props.correct ? '#2c8f31' : '#dedede'
                })}
                style={{
                    background: backgroundColor,
                    alignItems: 'center',
                    display: 'inline-block',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '5px',
                }}
            >
                {editing || keepEdit ? (
                    <span
                        onSubmit={this.onEditSubmit}
                        style={{ display: 'flex',  alignItems: 'center',  margin: 0 }}
                    >
                        <textarea
                            value={editText}
                            onKeyPress={this.onInputEnterHandle}
                            onChange={this.handleChange("editText")}
                            ref={(ta) => this.textArea = ta }
                        />
                        <EditSymbol
                            key={uuidv1()}
                            className="mx-1 float-right"
                            type="save"
                            onClick={this.onEditSubmit}
                        />
                    </span>
                ) : (
                    <span style={{ display: 'flex',  alignItems: 'center'}}>
                        <span
                            onClick={this.toggleCorrect}
                            className="mx-1"
                            style={{ cursor: 'pointer' }}
                        >
                            {option.text}
                        </span>
                        <EditSymbol
                            className="mx-1 float-right"
                            type="delete"
                            onClick={this.onDelete}
                        />
                        <EditSymbol
                            className="mx-1 float-right"
                            type="edit"
                            onClick={this.onToggleEdit}
                        />
                    </span>
                )}
            </p>
        );
    }
}
ChoiceOption.propTypes = {
    /**
     * Set to true if this component should be in editable state
     * right after mounting
     */
    keepEdit: PropTypes.bool,
    /**
     * Should be true if the option in this component is correct for given task
     */
    correct: PropTypes.bool,
    /**
     * Action that should be performed when the option inside
     * this component is chosen to be correct for given task
     */
    onToggleCorrect: PropTypes.func,
    /**
     * Action that should be performed when the text on the option
     * inside this component is changed
     */
    onEditSubmit: PropTypes.func
}
export default ChoiceOption