import React, {Component} from 'react';
import TaskListItem from "../TaskListItem";
import { editTask } from "../../../../services/actions";
import {connect} from "react-redux";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cloneDeep } from 'lodash'
import {v1 as uuidv1} from "uuid";
import TextOption from "./components/TextOption";

class TextTask extends Component {

    // requires num in props to work

    // TODO this function can be encapsulated from all other task views
    addNewAnswer = (e) => {
        e.preventDefault();
        let { num } = this.props;
        let { correctAnswers } = this.props.tasks[num];
        let newCorrectAnswers = cloneDeep(correctAnswers);
        newCorrectAnswers.push('New option')
        this.props.editTask({
            correctAnswers: newCorrectAnswers,
            keepEditLast: true
        }, num)
    }

    toggleMath = (e) => {
        let { num } = this.props;
        this.props.editTask({
            interpretMath: !this.props.tasks[num].interpretMath
        }, num)
    }

    render() {
        let { tasks, num } = this.props;
        let task = tasks[num];
        let { correctAnswers, keepEditLast } = task

        return (
            <div className={this.props.className}>

                <TaskListItem num={num}>
                    [Text task]
                    <br />
                    {correctAnswers.map((ans, i) => (
                        <TextOption
                            taskNum={num}
                            optionNum={i}
                            correct={false}
                            key={uuidv1()}
                            keepEdit={(i === (correctAnswers.length - 1) && keepEditLast )}
                        />
                    ))}

                    <div>
                        <a href="#void" onClick={this.addNewAnswer}>
                            <Icon
                                icon={ faPlus }
                                className="pr-1"
                            />
                            Add new possible answer
                        </a>
                    </div>

                    <div className="my-3">
                        <input
                            id={"onlyFullCheckbox" + num}
                            type="checkbox"
                            value={task.interpretMath}
                            checked={task.interpretMath}
                            onChange={this.toggleMath}
                        />
                        <label
                            htmlFor={"onlyFullCheckbox" + num}
                            className="px-2"
                        >
                            Interpret student answers as math statements
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
)(TextTask);