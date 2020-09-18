import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class FinishedAttempt extends Component {

    render() {
        //TODO make a floating panel for saving / finishing attempt
        let { name } = this.props.exercise;
        let { answers, score } = this.props.attempt;
        return (
            <div className="container my-2">
                <div className="row">
                    <div className="col md-auto"
                         style={{
                             minWidth: '80%'
                         }}
                    >
                        <h1>{name}</h1>
                        <h2>Task scores</h2>
                        <ul
                            style={{
                                listStyleType: 'none'
                            }}
                        >
                            {answers.map((a, i) => (
                                <li key={i}>
                                    <h5>
                                        <span className="mr-3">Task {i + 1}:</span>
                                        <strong className="ml-3">{a.score.toFixed(2)}</strong>
                                    </h5>
                                </li>
                            ))}
                        </ul>
                        <h2><i>Overall score:</i> <strong>{score.toFixed(2)}</strong></h2>
                    </div>
                    <div className="col md-auto">
                        <Link
                            to={`/classroom/course/${this.props.courseData._id}`}
                            style={{
                                color: 'gray'
                            }}
                        >
                            Back to course
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.exercise.attempt,
        ...state.views.classroom.course.main.services,
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
)(FinishedAttempt)