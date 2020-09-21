import React, {Component} from 'react';
import {connect} from "react-redux";
import TaskBase from "./TaskContainer";
import { toggleAttemptValue } from "../services/actions";

/**
 * Specialized version of
 * {@link components.views.classroom.course.exercise.Attempt.TaskContainer}
 * to display one-choice tasks with an open answer
 * @memberOf components.views.classroom.course.exercise.Attempt
 * @component
 */
class MultipleChoiceTask extends Component {

    onSelectOption = (e) => {
        this.props.toggleAttemptValue(this.props.num, e.target.value);
    }

    render() {
        let { exercise, attempt, oldAttempt, num } = this.props;
        let { options, _id, score: maxScore, description } = exercise.tasks[num]
        let { values } = attempt.answers[num];
        let { values: oldValues } = oldAttempt.answers[num]
        return (
            <TaskBase
                {...this.props}
                changed={JSON.stringify(values) !== JSON.stringify(oldValues)}
                maxScore={maxScore}
                description={description}
            >
                <ul style={{listStyleType: 'none'}}>
                    {Array.isArray(options) && options.map((option, i) => (
                        <li key={i}>
                            <input
                                id={_id + '-' + i}
                                type="checkbox"
                                value={option.key}
                                checked={values.indexOf(option.key) >= 0}
                                onChange={this.onSelectOption}
                                disabled={!!this.props.disabled}
                            />
                            <label className="ml-1" htmlFor={_id + '-' + i}>
                                {option.text}
                            </label>
                        </li>
                    ))}
                </ul>
            </TaskBase>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.course.exercise.services,
    ...state.views.classroom.course.exercise.attempt
})
let mapDispatchToProps = (dispatch) => ({
    toggleAttemptValue: (num, value) => dispatch(toggleAttemptValue(num, value))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleChoiceTask)