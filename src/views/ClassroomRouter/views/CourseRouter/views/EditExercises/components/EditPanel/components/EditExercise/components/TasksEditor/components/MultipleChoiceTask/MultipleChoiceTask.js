import React, {Component} from 'react';
import TaskListItem from "../TaskListItem";
import { editTask } from "../../../../services/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cloneDeep } from 'lodash'
import {v1 as uuidv1} from "uuid";
import MultipleChoiceOption from "./components/MultipleChoiceOption";

class MultipleChoiceTask extends Component {

    // requires num in props to work

    // TODO this function can be encapsulated from all other task views
    addNewOption = (e) => {
        e.preventDefault();
        let { num } = this.props;
        let { options } = this.props.tasks[num];
        let newOptions = cloneDeep(options);
        newOptions.push({
            text: 'New option',
            key: uuidv1()
        })
        this.props.editTask({
            options: newOptions,
            keepEditLast: true
        }, num)
    }

    toggleOnlyFull = (e) => {
        let { num } = this.props;
        this.props.editTask({
            onlyFull: !this.props.tasks[num].onlyFull
        }, num)
    }

    render() {
        let { tasks, num } = this.props;
        let task = tasks[num];
        let { options, correctAnswers, keepEditLast } = task
        let correctAnswersSet = {};

        for (let i of correctAnswers) {
            correctAnswersSet[i] = true;
        }

        return (
            <div className={this.props.className}>

                <TaskListItem num={num}>
                    [Multiple-choice task]
                    <br />
                    Click on the option name to set it as the correct one or to remove this selection
                    {options.map((option, i) => (
                        <div key={uuidv1()}>
                            <MultipleChoiceOption
                                taskNum={num}
                                optionNum={i}
                                correct={correctAnswersSet[option.key]}
                                keepEdit={(i === (options.length - 1) && keepEditLast )}
                            />
                        </div>
                    ))}

                    <div>
                        <a href="#void" onClick={this.addNewOption}>
                            <Icon
                                icon={ faPlus }
                                className="pr-1"
                            />
                            Add new option
                        </a>
                    </div>

                    <div className="my-3">
                        <input
                            id={"onlyFullCheckbox" + num}
                            type="checkbox"
                            value={task.onlyFull}
                            checked={task.onlyFull}
                            onChange={this.toggleOnlyFull}
                        />
                        <label
                            htmlFor={"onlyFullCheckbox" + num}
                            className="px-2"
                        >
                            Accept only answers, where all correct options are selected, don't give partial score
                        </label>

                    </div>
                </TaskListItem>
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
)(MultipleChoiceTask);