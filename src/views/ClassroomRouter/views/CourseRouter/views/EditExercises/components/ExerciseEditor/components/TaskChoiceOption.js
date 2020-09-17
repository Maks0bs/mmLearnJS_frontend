import React, {Component} from 'react';
import EditSymbol from "../../../../../../../../../components/reusables/EditSymbol";
import PropTypes from "prop-types";
import { v1 as uuidv1} from 'uuid'

/**
 * A general component for displaying correct answers / choice options in tasks
 * @memberOf components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor
 * @component
 */
class TaskChoiceOption extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false, editText: '',
            backgroundColor: '#dedede',
        }
    }

    componentDidMount() {
        this.textAreaId = uuidv1();
        if (this.props.keepEdit){
            this.textArea && this.textArea.focus && this.textArea.focus();
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
        this.props.onEditSubmit(this.state.editText);
        this.setState({ editing: false })
    }

    onDelete = () => {
        this.props.onDelete();
    }

    onToggleEdit = (e) => {
        let element = document.getElementById(this.textAreaId)
        element && element.focus && element.focus();
        this.setState({
            editing: true,
            editText: this.props.useTextProp ? this.props.option.text : this.props.option
        })
    }

    render() {
        let { option, keepEdit, useTextProp } = this.props;
        let { editing, backgroundColor, editText } = this.state;
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
                    borderStyle: 'solid',
                    padding: '5px',
                    margin: '5px',
                }}
            >
                {editing || keepEdit ? (
                    <form
                        onSubmit={this.onEditSubmit}
                        style={{ display: 'flex',  alignItems: 'center',  margin: 0 }}
                    >
                        <input
                            autoFocus
                            id={this.textAreaId}
                            value={editText}
                            type="text"
                            onChange={this.handleChange("editText")}
                            ref={(ta) => this.textArea = ta }
                        />
                        <EditSymbol
                            key={uuidv1()}
                            className="mx-1 float-right"
                            type="save"
                            onClick={this.onEditSubmit}
                        />
                    </form>
                ) : (
                    <span style={{ display: 'flex',  alignItems: 'center'}}>
                        <span
                            onClick={this.toggleCorrect}
                            className="mx-1"
                            style={{ cursor: 'pointer' }}
                        >
                            {useTextProp ? option.text : option}
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
TaskChoiceOption.propTypes = {
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
    onEditSubmit: PropTypes.func,
    /**
     * Action that should be performed when the given option gets deleted
     */
    onDelete: PropTypes.func,
    /**
     * The data about the option. Should at least contain the text
     * that should be displayed on this option
     */
    option: PropTypes.oneOfType([
        PropTypes.shape({text: PropTypes.string}),
        PropTypes.string
    ]),
    /**
     * Should be true if the displayed text should be `option.text`
     * and not `option`
     */
    useTextProp: PropTypes.bool
}
export default TaskChoiceOption