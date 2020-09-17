import React, {Component} from 'react';
import TaskListItem from "./TaskListItem";
import { editTask } from "../../../services/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {v1 as uuidv1} from "uuid";
import {removeItemShallow} from "../../../../../../../../../services/helpers";
import PropTypes from "prop-types";
import TaskChoiceOption from "./TaskChoiceOption";

/**
 * A special version of
 * {@link components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor.TaskListItem}
 * to display a multiple-choice task
 * @memberOf components.views.classroom.course.EditExercises.ExerciseContainer.ExerciseEditor
 * @component
 */
class MultipleChoiceTask extends Component {

    addNewOption = (e) => {
        e.preventDefault();
        let { exerciseNum, taskNum, newExercises } = this.props;
        let { options } = newExercises[exerciseNum].tasks[taskNum];
        let newOptions = [...options, { text: 'New option',  key: uuidv1() }];
        this.props.editTask(
            { options: newOptions,  keepEditLast: true },
            exerciseNum, taskNum
        );
    }

    toggleOnlyFull = () => {
        let { exerciseNum, taskNum, newExercises } = this.props;
        this.props.editTask(
            { onlyFull: !newExercises[exerciseNum].tasks[taskNum].onlyFull },
            exerciseNum, taskNum
        );
    }

    onToggleCorrect = (correctAnswers, key) => () => {
        let correctPos = correctAnswers.indexOf(key), newCorrectAnswers;
        console.log(this.props.newExercises[this.props.exerciseNum].tasks[this.props.taskNum]);
        if (correctPos < 0){
            // add a correct option
            newCorrectAnswers = [...correctAnswers, key]
        } else {
            // remove a correct option
            newCorrectAnswers = removeItemShallow(correctAnswers, correctPos);
        }
        this.props.editTask(
            {correctAnswers: newCorrectAnswers},
            this.props.exerciseNum, this.props.taskNum
        );
    }

    onDelete = (options, correctAnswers, key, optionNum) => () => {
        this.props.editTask(
            {
                options: removeItemShallow(options, optionNum),
                // leave only potions, the keys of which are not equal to the deleted one
                correctAnswers: correctAnswers.filter(a => a !== key)
            },
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

    render() {
        let { taskNum, exerciseNum, newExercises } = this.props, correctAnswersSet = {};
        let { options, correctAnswers, keepEditLast, onlyFull } =
            newExercises[exerciseNum].tasks[taskNum]
        if (Array.isArray(correctAnswers)){
            for (let i of correctAnswers) {
                correctAnswersSet[i] = true;
            }
        }
        return (
            <TaskListItem {...this.props} taskName="Multiple-choice task">
                <p>
                    Click on the option name to set it as the correct one
                    or to remove this selection
                </p>
                {Array.isArray(options) && options.map((option, i) => (
                    <div key={uuidv1()}>
                        <TaskChoiceOption
                            onToggleCorrect={this.onToggleCorrect(correctAnswers, option.key)}
                            onDelete={this.onDelete(options, correctAnswers, option.key, i)}
                            onEditSubmit={this.onEditSubmit(options, i)}
                            correct={correctAnswersSet[option.key]}
                            keepEdit={(i === (options.length - 1) && keepEditLast )}
                            useTextProp
                            option={option}
                        />
                    </div>
                ))}
                <div>
                    <a href="#void" onClick={this.addNewOption}>
                        <Icon icon={ faPlus } className="pr-1"/>
                        Add new option
                    </a>
                </div>
                <div className="my-3" style={{alignItems: 'center', display: 'flex'}}>
                    <label
                        htmlFor={"onlyFullCheckbox" + exerciseNum + '-' + taskNum}
                        className="text-muted mx-2 my-0"
                    >
                        Give score for all correctly selected options, no partial score
                    </label>
                    <input
                        id={"onlyFullCheckbox" + exerciseNum + '-' + taskNum}
                        type="checkbox"
                        value={onlyFull}
                        checked={onlyFull}
                        onChange={this.toggleOnlyFull}
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
MultipleChoiceTask.propTypes = {
    exerciseNum: PropTypes.number.isRequired,
    taskNum: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleChoiceTask);