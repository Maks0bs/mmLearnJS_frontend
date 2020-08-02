import React, {Component} from 'react';
import {connect} from "react-redux";
import TaskBase from "./TaskBase";
import { toggleAttemptValue } from "../../../services/actions";

class OneChoiceTask extends Component {

    onSelectOption = (e) => {
        //e.preventDefault();
        this.props.toggleAttemptValue(this.props.num, e.target.value);
    }

    render() {
        let { exercise, attempt, oldAttempt } = this.props;
        let { options, _id } = exercise.tasks[this.props.num]
        let { value } = attempt.answers[this.props.num];
        let { value: oldValue } = oldAttempt.answers[this.props.num]
        return (
            <TaskBase
                {...this.props}
                changed={value !== oldValue}
            >
                <ul
                    style={{
                        listStyleType: 'none'
                    }}
                >
                    {options.map((option, i) => (
                        <li key={i}>
                            <input
                                id={_id + '-' + i}
                                type="radio"
                                value={option.key}
                                checked={value === option.key}
                                onChange={this.onSelectOption}
                                name={_id}
                            />
                            <label
                                className="ml-1"
                                htmlFor={_id + '-' + i}
                            >
                                {option.text}
                            </label>
                        </li>
                    ))}
                </ul>
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
)(OneChoiceTask)