import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faPencilAlt, faCheck} from "@fortawesome/free-solid-svg-icons";
import { editTask } from "../../../../../services/actions";
import {connect} from "react-redux";

class OneChoiceOption extends Component {
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            backgroundColor: '#dedede',
            editText: ''
        }
    }

    toggleCorrect = (e) => {
        e.preventDefault();
        let { taskNum, optionNum } = this.props;
        let { key } = this.props.tasks[taskNum].options[optionNum];
        console.log()
        this.props.editTask({
            correctAnswer: key
        }, taskNum);
    }

    componentDidMount() {
        this.setState({
            backgroundColor: this.props.correct ? '#2c8f31' : '#dedede'
        })
    }

    handleChange = (name) => (event) => {
        console.log(event);
        this.setState({
            [name]: event.target.value
        })
    }

    onEditSubmit = (e) => {
        e.preventDefault();
        let newOptions = this.props.tasks[this.props.taskNum].options;
        newOptions[this.props.optionNum].text = this.state.editText;
        this.props.editTask({
            options: newOptions
        }, this.props.taskNum);
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

        let newOptions = this.props.tasks[this.props.taskNum].options;
        newOptions.splice(this.props.optionNum, 1);
        this.props.editTask({
            options: newOptions
        }, this.props.taskNum);
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
            editText: this.props.tasks[this.props.taskNum].options[this.props.optionNum].text
        })
    }

    render() {
        let option = this.props.tasks[this.props.taskNum].options[this.props.optionNum];
        let { editing, backgroundColor } = this.state;
        return (
            <div>
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
                    ref={element => this.choiceRef = element}
                >
                    {editing ? (
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
                                    value={this.state.editText}
                                    onKeyPress={this.onInputEnterHandle}
                                    onChange={this.handleChange("editText")}
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
                                {option.text}
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
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.editor
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        editTask: (task, num) => dispatch(editTask(task, num))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneChoiceOption);