import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import AttemptActions from "./components/AttemptActions";
import OneChoiceTask from "../OneChoiceTask";
import MultipleChoiceTask from "../MultipleChoiceTask";
import TextTask from "../TextTask";

class ActiveAttempt extends Component {

    render() {
        //TODO make a floating panel for saving / finishing attempt
        let { name, tasks } = this.props.exercise;
        return (
            <div className="container my-2">
                <div className="row">
                    <div className="col md-auto"
                        style={{
                            minWidth: '80%'
                        }}
                    >
                        <h1>{name}</h1>
                        <h2>Tasks</h2>
                        <ul
                            style={{
                                listStyleType: 'none'
                            }}
                        >
                            {tasks.map((task, i) => (
                                <li key={i}>
                                    {(() => {
                                        switch(task.kind){
                                            case 'OneChoiceExercise': {
                                                return (
                                                    <OneChoiceTask
                                                        num={i}
                                                    />
                                                )
                                            }
                                            case 'MultipleChoiceExercise': {
                                                return (
                                                    <MultipleChoiceTask
                                                        num={i}
                                                    />
                                                )
                                            }
                                            case 'TextExercise': {
                                                return (
                                                    <TextTask
                                                        num={i}
                                                    />
                                                )
                                            }
                                            default: {
                                                return (
                                                    'other type of exercse'
                                                )
                                            }
                                        }
                                    })()}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col md-auto">
                        <AttemptActions />
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.exercise.services,
        ...state.views.classroom.course.exercise.attempt,
        ...state.views.classroom.course.services,
        authenticatedUser: state.services.authenticatedUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveAttempt)