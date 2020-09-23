import React, {Component} from 'react';
import {connect} from "react-redux";
import { getAttemptById, cleanup } from "./services/actions";
import { addToast } from "../../../../../../../../components/ToastRoot/services/actions";
import ActiveAttempt from "./components/ActiveAttempt/ActiveAttempt";
import BigLoadingCentered from "../../../../../../../../components/reusables/BigLoadingCentered";
import {Link} from "react-router-dom";

/**
 * This component displays information about a certain attempt
 * at the given exercise. Displays a review of a finished attempt
 * or, if the attempt is still running, allows to continue solving tasks
 * @memberOf components.views.classroom.course.exercise
 * @component
 */
class Attempt extends Component {

    displayError(text){
        this.props.addToast(
            (<div>{text || 'Problem with loading data. Try reloading the page'}</div>),
            {type: 'error'}
        )
    }

    componentDidMount() {
        this.props.getAttemptById(
            this.props.course._id, this.props.exercise._id,
            this.props.match.params.attemptId)
            .then(() => {
                if (this.props.error){
                    this.displayError('Problem loading attempt')
                }
            })
    }

    componentWillUnmount() {
        this.props.cleanup();
    }

    render() {
        if (!this.props.attempt || !this.props.attempt._id){
            return ( <BigLoadingCentered />)
        }
        if (!this.props.attempt.endTime){
            return (<ActiveAttempt />)
        } else {
            let { name } = this.props.exercise;
            let { answers, score } = this.props.attempt;
            return (
                <div className="container my-2">
                    <div className="row">
                        <div className="col md-auto" style={{minWidth: '80%'}}>
                            <h1>Exercise <strong>{name}</strong></h1>
                            <ul>
                                <li>
                                    <h2>Task scores</h2>
                                    <ul style={{listStyleType: 'none'}}>
                                        {Array.isArray(answers) && answers.map((a, i) => (
                                            <li key={i}>
                                                <h5>
                                                    <span className="mr-3">
                                                        Task {i + 1}:
                                                    </span>
                                                    <strong className="ml-3">
                                                        {(a.score === 0 || parseFloat(a.score)) ?
                                                            parseFloat(a.score)
                                                                .toFixed(2)
                                                            : '-'
                                                        }
                                                    </strong>
                                                </h5>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <h2>
                                        <i>Overall score: {}</i>
                                        <strong>{score.toFixed(2)}</strong>
                                    </h2>
                                </li>
                            </ul>
                        </div>
                        <div className="col md-auto">
                            <Link
                                to={`/classroom/course/${this.props.course._id}`}
                                style={{ color: 'gray'}}
                            >
                                Back to course
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.exercise.services,
    ...state.views.classroom.course.exercise.attempt,
    course: state.views.classroom.course.services.course,
})
let mapDispatchToProps = (dispatch) => ({
    getAttemptById: (courseId, exerciseId, attemptId) =>
        dispatch(getAttemptById(courseId, exerciseId, attemptId)),
    addToast: (component, options) => dispatch(addToast(component, options)),
    cleanup: () => dispatch(cleanup())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Attempt)