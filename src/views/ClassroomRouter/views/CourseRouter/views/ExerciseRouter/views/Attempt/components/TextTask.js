import React, {Component} from 'react';
import {connect} from "react-redux";
import TaskBase from "./TaskContainer";
import { toggleAttemptValue } from "../services/actions";
import PropTypes from "prop-types";

/**
 * Specialized version of
 * {@link components.views.classroom.course.exercise.Attempt.TaskContainer}
 * to display text tasks with an open answer
 * @memberOf components.views.classroom.course.exercise.Attempt
 * @component
 */
class TextTask extends Component {

    onSelectOption = (e) => {
        this.props.toggleAttemptValue(this.props.num, e.target.value);
    }

    render() {
        let { exercise, attempt, oldAttempt, num } = this.props;
        let { _id, description, score: maxScore } = exercise.tasks[num]
        let { value } = attempt.answers[num];
        let { value: oldValue } = oldAttempt.answers[num]
        return (
            <TaskBase
                {...this.props}
                changed={value !== oldValue}
                description={description}
                maxScore={maxScore}
            >
                <input
                    id={_id + '-'}
                    type="text"
                    value={value}
                    onChange={this.onSelectOption}
                    disabled={!!this.props.disabled}
                />
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
TextTask.propTypes = {
    /** Number of the task in an ordered list of tasks in the reducer */
    num: PropTypes.number.isRequired,
    /** True if users shouldn't be able to interact with given task */
    disabled: PropTypes.bool
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextTask)