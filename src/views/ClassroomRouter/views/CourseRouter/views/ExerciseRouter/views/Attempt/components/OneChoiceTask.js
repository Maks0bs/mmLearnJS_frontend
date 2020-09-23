import React, {Component} from 'react';
import {connect} from "react-redux";
import TaskBase from "./TaskContainer";
import { toggleAttemptValue } from "../services/actions";
import PropTypes from "prop-types";

/**
 * Specialized version of
 * {@link components.views.classroom.course.exercise.Attempt.TaskContainer}
 * to display one-choice tasks with an open answer
 * @memberOf components.views.classroom.course.exercise.Attempt
 * @component
 */
class OneChoiceTask extends Component {

    onSelectOption = (e) => {
        this.props.toggleAttemptValue(this.props.num, e.target.value);
    }

    render() {
        let { exercise, attempt, oldAttempt, num } = this.props;
        let { options, _id, description, score: maxScore } = exercise.tasks[num]
        let { value } = attempt.answers[num];
        let { value: oldValue } = oldAttempt.answers[num]
        return (
            <TaskBase
                {...this.props}
                changed={value !== oldValue}
                description={description}
                maxScore={maxScore}
            >
                <ul style={{ listStyleType: 'none'}}>
                    {Array.isArray(options) && options.map((option, i) => (
                        <li key={i}>
                            <input
                                id={_id + '-' + i}
                                type="radio"
                                value={option.key}
                                checked={value === option.key}
                                onChange={this.onSelectOption}
                                name={_id}
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
OneChoiceTask.propTypes = {
    /** Number of the task in an ordered list of tasks in the reducer */
    num: PropTypes.number.isRequired,
    /** True if users shouldn't be able to interact with given task */
    disabled: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneChoiceTask)