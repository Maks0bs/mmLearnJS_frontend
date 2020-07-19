import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { addOneChoiceTask } from "../../services/actions";
import { faDiceOne, faTasks, faFeather } from "@fortawesome/free-solid-svg-icons";
import OneChoiceTask from "./components/OneChoiceTask";

class TasksEditor extends Component {

    onNewOneChoice = (e) => {
        e.preventDefault();
        this.props.addOneChoiceTask();
    }
    onNewMultipleChoice = (e) => {
        e.preventDefault();
    }
    onNewText = (e) => {
        e.preventDefault();
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
                                    <OneChoiceTask num={i} key={i}/>
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
                    <a href="#void" onClick={this.onNewOneChoice}>
                        <Icon
                            icon={faDiceOne}
                            className="pr-1"
                        />
                        Add one choice task
                    </a>
                    <br/>

                    <a href="#void" onClick={this.onNewMultipleChoice}>
                        <Icon
                            icon={ faTasks }
                            className="pr-1"
                        />
                        Add multiple choice task
                    </a>
                    <br/>

                    <a href="#void" onClick={this.onNewText}>
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
        addOneChoiceTask: () => dispatch(addOneChoiceTask())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksEditor);