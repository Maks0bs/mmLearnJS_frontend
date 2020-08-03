import React, {Component} from 'react';
import {connect} from "react-redux";
import TaskBase from "./TaskBase";
import { toggleAttemptValue } from "../services/actions";

class TextTask extends Component {

    onSelectOption = (e) => {
        //e.preventDefault();
        this.props.toggleAttemptValue(this.props.num, e.target.value);
    }

    render() {
        let { exercise, attempt, oldAttempt } = this.props;
        let { _id } = exercise.tasks[this.props.num]
        let { value } = attempt.answers[this.props.num];
        let { value: oldValue } = oldAttempt.answers[this.props.num]
        return (
            <TaskBase
                {...this.props}
                changed={value !== oldValue}
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

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.exercise.attempt
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        toggleAttemptValue: (num, value) => dispatch(toggleAttemptValue(num, value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextTask)