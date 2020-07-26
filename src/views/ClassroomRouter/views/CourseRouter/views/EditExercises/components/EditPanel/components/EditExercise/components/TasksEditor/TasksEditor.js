import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { addNewTask } from "../../services/actions";
import { faDiceOne, faTasks, faFeather } from "@fortawesome/free-solid-svg-icons";
import OneChoiceTask from "./components/OneChoiceTask";
import MultipleChoiceTask from "./components/MultipleChoiceTask/MultipleChoiceTask";
import TextTask from "./components/TextTask/TextTask";

class TasksEditor extends Component {

    onNewTask = (type) => (e) => {
        e.preventDefault();
        this.props.addOneChoiceTask(type);
    }

    render() {
        let { tasks } = this.props;
        return (
            <div>
                <div>
                    {tasks.map((task, i) => {
                        switch(task.kind){
                            case 'OneChoiceExercise': {
                                return (
                                    <OneChoiceTask
                                        className="my-1"
                                        num={i} key={i}
                                    />
                                )
                            }
                            case 'MultipleChoiceExercise': {
                                return (
                                    <MultipleChoiceTask
                                        className="my-1"
                                        num={i} key={i}
                                    />
                                )
                            }
                            case 'TextExercise': {
                                return (
                                    <TextTask
                                        className="my-1"
                                        num={i} key={i}
                                    />
                                )
                            }
                            default: {
                                return (
                                    <div key={i}>
                                        other tasks
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
                <div className="mt-2">
                    <a href="#void" onClick={this.onNewTask('OneChoice')}>
                        <Icon
                            icon={faDiceOne}
                            className="pr-1"
                        />
                        Add one choice task
                    </a>
                    <br/>

                    <a href="#void" onClick={this.onNewTask('MultipleChoice')}>
                        <Icon
                            icon={ faTasks }
                            className="pr-1"
                        />
                        Add multiple choice task
                    </a>
                    <br/>

                    <a href="#void" onClick={this.onNewTask('Text')}>
                        <Icon
                            icon={ faFeather }
                            className="pr-1"
                        />
                        Add text task
                    </a>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.services,
        ...state.views.classroom.course.editExercises.editor
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addOneChoiceTask: (type) => dispatch(addNewTask(type))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksEditor);