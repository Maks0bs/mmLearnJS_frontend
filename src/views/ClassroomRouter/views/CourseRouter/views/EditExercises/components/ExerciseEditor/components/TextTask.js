import React, {Component} from 'react';
import TaskListItem from "./TaskListItem";
import {editTask } from "../../../services/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {v1 as uuidv1} from "uuid";
import PropTypes from "prop-types";
import TaskChoiceOption from "./TaskChoiceOption";
import {removeItemShallow} from "../../../../../../../../../services/helpers";

/**
 * A special version of
 * {@link components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor.TaskListItem}
 * to display a text task with an open answer
 * @memberOf components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor
 * @component
 */
class TextTask extends Component {

    addNewAnswer = (e) => {
        e.preventDefault();
        let { exerciseNum, taskNum, newExercises } = this.props;
        let { correctAnswers } = newExercises[exerciseNum].tasks[taskNum];
        let newAnswers = [...correctAnswers, 'New option'];
        this.props.editTask(
            { correctAnswers: newAnswers,  keepEditLast: true },
            exerciseNum, taskNum
        );
    }

    toggleMath = () => {
        let { exerciseNum, taskNum, newExercises } = this.props;
        this.props.editTask(
            { interpretMath: !newExercises[exerciseNum].tasks[taskNum].interpretMath },
            exerciseNum, taskNum
        );
    }

    onDelete = (correctAnswers, ansNum) => () => {
        this.props.editTask(
            {correctAnswers: removeItemShallow(correctAnswers, ansNum)},
            this.props.exerciseNum, this.props.taskNum
        );
    }

    onEditSubmit = (correctAnswers, ansNum) => (newText) => {
        let newAnswers = [...correctAnswers];
        console.log(correctAnswers);
        newAnswers[ansNum] = newText;
        this.props.editTask(
            { correctAnswers: newAnswers, keepEditLast: false},
            this.props.exerciseNum, this.props.taskNum
        );
    }

    render() {
        let { taskNum, exerciseNum, newExercises } = this.props;
        let { correctAnswers, keepEditLast, interpretMath } =
            newExercises[exerciseNum].tasks[taskNum]
        let inlineStyle = {display: 'flex', alignItems: 'center'}
        return (
            <TaskListItem {...this.props} taskName="Text task">
                {Array.isArray(correctAnswers) && correctAnswers.map((ans, i) => (
                    <TaskChoiceOption
                        key={uuidv1()}
                        keepEdit={(i === (correctAnswers.length - 1) && keepEditLast )}
                        option={ans}
                        onToggleCorrect={() => {}}
                        onEditSubmit={this.onEditSubmit(correctAnswers, i)}
                        onDelete={this.onDelete(correctAnswers, i)}
                    />
                ))}
                <div>
                    <a href="#void" onClick={this.addNewAnswer}>
                        <Icon icon={ faPlus } className="pr-1"/>
                        Add new possible answer
                    </a>
                </div>
                <div className="form-group my-3" style={inlineStyle}>
                    <label
                        htmlFor={"interpretMathCheckbox" + exerciseNum + '-' + taskNum}
                        className="text-muted px-2 my-0"
                    >
                        Interpret student answers as math statements
                    </label>
                    <input
                        id={"interpretMathCheckbox" + exerciseNum + '-' + taskNum}
                        type="checkbox"
                        value={interpretMath}
                        checked={interpretMath}
                        onChange={this.toggleMath}
                    />

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
TextTask.propTypes = {
    exerciseNum: PropTypes.number.isRequired,
    taskNum: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextTask);