import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'
import { getCurUserAttempts, newAttempt, cleanup } from "../../../services/actions";
import { addToast } from "../../../../../../../../../../../components/ToastRoot/services/actions";
import { toggleLoading } from "../../../../../../../../../../../services/actions";
import LoadingRingAnimated from '../../../../../../../../../../../res/images/LoadingRingAnimated50px.svg'
import {Link} from "react-router-dom";

class ExercisePreview extends Component {


    componentDidMount() {
        this.props.toggleLoading(true);
        this.props.getAttempts(this.props.courseData._id, this.props.exercise._id)
            .then(() => {
                this.props.toggleLoading(false);
                if (this.props.error){
                    this.props.addToast(
                        (
                            <div>
                                Problem with loading attempts
                            </div>
                        ),
                        {
                            type: 'error'
                        }
                    )
                }
            })
    }

    onExerciseStart = (e) => {
        e.preventDefault();
        this.props.newAttempt(this.props.courseData._id, this.props.exercise._id)
            .then(() => {
                if (this.props.error){
                    this.props.addToast(
                        (
                            <div>
                                Problem with loading attempts
                            </div>
                        ),
                        {
                            type: 'error'
                        }
                    )
                }
            })
    }

    render() {
        let { exercise, attempts, loading, courseData, newAttemptId } = this.props;
        let { name } = exercise;

        if (newAttemptId){
            this.props.cleanup();
            return (
                <Redirect to={`/classroom/course/${courseData._id}/exercise/${exercise._id}/attempt/${newAttemptId}`} />
            )
        }

        return (
            <div className="container">
                <h1>{name}</h1>
                {loading ? (
                    <img src={LoadingRingAnimated} alt="loading" />
                ) : (
                    <div>
                        <div>
                            <table
                                className="table"
                                style={{
                                    background: '#eeeeee'
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Attempt</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Score</th>
                                        <th scope="col">Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attempts.map((a, i) => (
                                        <tr>
                                            <td>
                                                {i + 1}
                                            </td>
                                            <td>
                                                <div>
                                                    <strong>Started</strong> on {(new Date(a.startTime)).toLocaleDateString()} at {(new Date(a.startTime)).toLocaleTimeString()}
                                                </div>
                                                {a.endTime && (
                                                    <div>
                                                        <strong>Finished</strong> on {(new Date(a.endTime)).toLocaleDateString()} at {(new Date(a.endTime)).toLocaleTimeString()}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {((a.score === undefined) || (a.score === null)) ? (
                                                    <div>
                                                        -
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {a.score}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/classroom/course/${courseData._id}/exercise/${exercise._id}/attempt/${a._id}`}>
                                                    {a.endTime ? 'Review' : 'Continue attempt'}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {exercise.available ? (
                            <button
                                className="btn btn-raised btn-outline btn-info ml-3"
                                onClick={this.onExerciseStart}
                                style={{
                                    display: (attempts.length > 0 && !attempts[0].endTime) ? 'none' : ''
                                }}
                            >
                                Start the exercise
                            </button>
                        ) : (
                            <p>
                                This exercise is not available
                            </p>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.services,
        ...state.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        toggleLoading: (loading) => dispatch(toggleLoading(loading)),
        getAttempts: (courseId, exerciseId) => dispatch(getCurUserAttempts(courseId, exerciseId)),
        addToast: (toast, options) => dispatch(addToast(toast, options)),
        newAttempt: (courseId, exerciseId) => dispatch(newAttempt(courseId, exerciseId)),
        cleanup: () => dispatch(cleanup())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExercisePreview)