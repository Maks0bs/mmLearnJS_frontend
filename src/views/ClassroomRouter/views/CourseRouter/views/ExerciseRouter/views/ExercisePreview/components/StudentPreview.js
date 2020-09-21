import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'
import { getCurUserAttempts, newAttempt, cleanup } from "../../../services/actions";
import { addToast } from "../../../../../../../../../components/ToastRoot/services/actions";
import SmallLoading from "../../../../../../../../../components/reusables/SmallLoading";
import AttemptTableRow from "./AttemptTableRow";

/**
 * This component displays info about attempts in the exercise for
 * the authenticated student. This component is never displayed to teachers
 * @memberOf components.views.classroom.course.exercise.ExercisePreview
 * @component
 */
class StudentPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false}
    }

    componentDidMount() {
        this.setState({loading: true})
        this.props.getAttempts(this.props.course._id, this.props.exercise._id)
            .then(() => {
                console.log(this.props);
                this.setState({loading: false})
                if (this.props.error){
                    this.props.addToast(
                        (<div>{this.props.error}</div>),
                        {type: 'error'}
                    )
                }
            })
    }

    onExerciseStart = (e) => {
        e.preventDefault();
        this.props.newAttempt(this.props.course._id, this.props.exercise._id)
            .then(() => {
                if (this.props.error){
                    this.props.addToast(
                        (<div>{this.props.error}</div>),
                        {type: 'error'}
                    )
                }
            })
    }

    render() {
        let { exercise, attempts, course, newAttemptId } = this.props;
        let { name } = exercise;

        if (newAttemptId){
            this.props.cleanup();
            return (
                <Redirect to={
                    `/classroom/course/${course._id}/exercise/` +
                    `${exercise._id}/attempt/${newAttemptId}`
                }/>
            )
        }
        // exercise and attempts exist, there are no running attempts
        let hasRunningAttempts =
            Array.isArray(attempts) && attempts.length > 0 && attempts[0].endTime;
        let displayStart = exercise && exercise.available &&
            ((attempts && attempts.length === 0) || hasRunningAttempts)

        return (
            <div className="container">
                <h1>Exercise <strong>{name}</strong></h1>
                <div>
                    <div>
                        <table className="table table-hover">
                            <thead style={{background: '#dedede'}}>
                                <tr>
                                    <th scope="col">Attempt</th>
                                    <th scope="col">Score</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!attempts && this.state.loading && (<SmallLoading />)}
                                {Array.isArray(attempts) && attempts.map((a, i) => (
                                    <AttemptTableRow
                                        key={i}
                                        num={i}
                                        score={a.score}
                                        startTime={a.startTime}
                                        endTime={a.endTime}
                                        attemptLink={
                                            `/classroom/course/${course._id}/exercise/` +
                                            `${exercise._id}/attempt/${a._id}`
                                        }
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {displayStart && (
                        <button
                            className="btn btn-raised btn-info ml-3"
                            onClick={this.onExerciseStart}
                        >
                            Start the exercise
                        </button>
                    )}
                    {!exercise || !exercise.available && (
                        <p>This exercise is not available</p>
                    )}
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.exercise.services,
    course: state.views.classroom.course.services.course,
    ...state.services
})
let mapDispatchToProps = (dispatch) => ({
    getAttempts: (courseId, exerciseId) => dispatch(getCurUserAttempts(courseId, exerciseId)),
    addToast: (toast, options) => dispatch(addToast(toast, options)),
    newAttempt: (courseId, exerciseId) => dispatch(newAttempt(courseId, exerciseId)),
    cleanup: () => dispatch(cleanup())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentPreview)