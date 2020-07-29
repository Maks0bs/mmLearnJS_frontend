import React, {Component} from 'react';
import TaskListItem from "../TaskListItem";
import { editTask } from "../../../../services/actions";
import {connect} from "react-redux";
import OneChoiceOption from "./components/OneChoiceOption";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cloneDeep } from 'lodash'
import {v1 as uuidv1} from "uuid";

class OneChoiceTask extends Component {

    // requires num in props to work

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

    render() {
        let { tasks, num } = this.props;
        let task = tasks[num];
        let { options, correctAnswer, keepEditLast } = task
        let correctPos = -1;

        for (let i = 0; i < options.length; i++) {
            if (options[i].key === correctAnswer) {
                correctPos = i;
                break;
            }
        }

        return (
            <div className={this.props.className}>

                <TaskListItem num={num}>
                    [One-choice task]
                    <br />
                    Click on the option name to set it as the correct one
                    {options.map((option, i) => (
                        <div key={uuidv1()}>
                            <OneChoiceOption
                                taskNum={num}
                                optionNum={i}
                                correct={(i === correctPos)}
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
)(OneChoiceTask);