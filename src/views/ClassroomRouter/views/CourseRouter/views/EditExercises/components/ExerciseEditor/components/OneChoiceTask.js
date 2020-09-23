import React, {Component} from 'react';
import TaskListItem from "./TaskListItem";
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {v1 as uuidv1} from "uuid";
import {editTask} from "../../../services/actions";
import PropTypes from "prop-types";
import TaskChoiceOption from "./TaskChoiceOption";
import {removeItemShallow} from "../../../../../../../../../services/helpers";

/**
 * A special version of
 * {@link components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor.TaskListItem}
 * to display a one-choice task
 * @memberOf components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor
 * @component
 */
class OneChoiceTask extends Component {

    addNewOption = (e) => {
        e.preventDefault();
        let { exerciseNum, taskNum, newExercises } = this.props;
        let { options } = newExercises[exerciseNum].tasks[taskNum];
        let newOptions = [...options, { text: 'New option', key: uuidv1() }]
        this.props.editTask({
            options: newOptions, keepEditLast: true},
            exerciseNum, taskNum
        )
    }

    onToggleCorrect = (key) => () => {
        this.props.editTask(
            {correctAnswer: key},
            this.props.exerciseNum, this.props.taskNum
        );
    }

    onEditSubmit = (options, optionNum) => (newText) => {
        let newOptions = [...options];
        newOptions[optionNum].text = newText;
        this.props.editTask(
            {options: newOptions, keepEditLast: false},
            this.props.exerciseNum, this.props.taskNum
        );
    }

    onDelete = (options, correctAnswer, key, optionNum) => () => {
        this.props.editTask(
            {
                options: removeItemShallow(options, optionNum),
                correctAnswer: (correctAnswer === key) ? null : correctAnswer
            },
            this.props.exerciseNum, this.props.taskNum
        );
    }

    render() {
        let { taskNum, exerciseNum, newExercises } = this.props;
        let { options, correctAnswer, keepEditLast } =
            newExercises[exerciseNum].tasks[taskNum];
        let correctPos = Array.isArray(options) ?
            options.findIndex(o => o.key === correctAnswer) : -1
        return (
            <TaskListItem {...this.props} taskName="One-choice task">
                <p>Click on the option name to set it as the correct one</p>
                {Array.isArray(options) && options.map((option, i) => (
                    <div key={uuidv1()}>
                        <TaskChoiceOption
                            onToggleCorrect={this.onToggleCorrect(option.key)}
                            onEditSubmit={this.onEditSubmit(options, i)}
                            onDelete={this.onDelete(options, correctAnswer, option.key, i)}
                            correct={(i === correctPos)}
                            keepEdit={(i === (options.length - 1) && keepEditLast)}
                            option={option}
                            useTextProp
                        />
                    </div>
                ))}
                <div>
                    <a href="#void" onClick={this.addNewOption}>
                        <Icon icon={ faPlus } className="pr-1"/>
                        Add new option
                    </a>
                </div>
            </TaskListItem>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises
})
let mapDispatchToProps = (dispatch) => ({
    editTask: (task, exerciseNum, taskNum) => dispatch(editTask(task, exerciseNum, taskNum))
})
OneChoiceTask.propTypes = {
    exerciseNum: PropTypes.number.isRequired,
    taskNum: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneChoiceTask);