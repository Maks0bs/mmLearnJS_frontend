import React, {Component} from 'react';
import {connect} from "react-redux";
import AttemptActions from "./components/AttemptActions";
import OneChoiceTask from "../OneChoiceTask";
import MultipleChoiceTask from "../MultipleChoiceTask";
import TextTask from "../TextTask";

/**
 * This component displays the student all tasks in an exercise
 * and allows to submit new answers and save exercise progress
 * @memberOf components.views.classroom.course.exercise.Attempt
 * @component
 */
class ActiveAttempt extends Component {

    render() {
        //TODO make a floating panel for saving / finishing attempt
        // TODO make it with react-beautiful dnd
        let { name, tasks } = this.props.exercise;
        return (
            <div className="container my-2">
                <div className="row">
                    <div className="col md-auto" style={{ minWidth: '80%'}}>
                        <h1>{name}</h1>
                        <ul style={{listStyleType: 'none'}}>
                            {Array.isArray(tasks) && tasks.map((task, i) => (
                                <li key={i}>
                                    {(() => {
                                        switch(task.kind){
                                            case 'OneChoiceTask': {
                                                return (<OneChoiceTask num={i}/>)
                                            }
                                            case 'MultipleChoiceTask': {
                                                return (<MultipleChoiceTask num={i}/>)
                                            }
                                            case 'TextTask': {
                                                return (<TextTask num={i}/>)
                                            }
                                            default: {
                                                return 'other type of task';
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
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.exercise.services,
    ...state.views.classroom.course.exercise.attempt,
    ...state.views.classroom.course.services
})
export default connect(
    mapStateToProps
)(ActiveAttempt)