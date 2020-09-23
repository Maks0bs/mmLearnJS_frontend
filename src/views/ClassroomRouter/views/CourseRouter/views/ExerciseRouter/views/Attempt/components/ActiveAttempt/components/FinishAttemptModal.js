import React, {Component} from 'react';
import {connect} from "react-redux";
import { updateAttempt, finishAttempt, getAttemptById  } from "../../../services/actions";
import { addToast } from "../../../../../../../../../../../components/ToastRoot/services/actions";
import PropTypes from "prop-types";
import TaskContainer from "../../TaskContainer";

/**
 * This component allows the student to finish their attempt
 * and notifies them if they have unsaved progress in the attempt
 * (changed solution to a task)
 * @memberOf components.views.classroom.course.exercise.Attempt.ActiveAttempt
 * @component
 */
class FinishAttemptModal extends Component {

    handleLeave = () => this.props.onClose && this.props.onClose();

    componentWillUnmount(){
        this.handleLeave();
    }

    displayError(text){
        this.props.addToast(
            (<div>{text || 'Problem loading data. Try reloading the page'}</div>),
            {type: 'error'}
        )
    }

    onSaveAndFinish = (e) => {
        e.preventDefault();
        this.props.updateAttempt(
            this.props.course._id, this.props.exercise._id,
            this.props.attempt._id, this.props.attempt
        )
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    return this.props.finishAttempt(
                        this.props.course._id, this.props.exercise._id,
                        this.props.attempt._id
                    )
                }
            })
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    this.props.addToast(
                        (<div>Attempt saved and finished</div>),
                        {type: 'success'}
                    )
                    this.props.getAttemptById(
                        this.props.course._id, this.props.exercise._id,
                        this.props.attempt._id
                    )
                    this.handleLeave();
                }
            })
    }

    onFinish = (e) => {
        e.preventDefault();
        this.props.finishAttempt(
            this.props.course._id,
            this.props.exercise._id,
            this.props.attempt._id
        )
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    this.props.addToast(
                        (<div>Attempt finished</div>),
                        {type: 'info'}
                    )
                    this.props.getAttemptById(
                        this.props.course._id, this.props.exercise._id,
                        this.props.attempt._id
                    )
                    this.handleLeave();
                }
            })
    }

    render() {
        let { attempt, oldAttempt } = this.props;
        let changed = JSON.stringify(attempt) !== JSON.stringify(oldAttempt);
        return (
            <div className="container my-3">
                <h2>Are you sure you want to finish this attempt?</h2>
                {changed && (
                    <p>
                        <strong style={{color: 'red'}}>*</strong>
                        You have unsaved answers.
                        You can save them and finish the attempt afterwards
                    </p>
                )}
                <button
                    className="btn btn-raised mx-2"
                    onClick={this.handleLeave}
                    type="button"
                >
                    Cancel
                </button>
                {changed && (
                    <button
                        className="btn btn-raised btn-success mx-2"
                        onClick={this.onSaveAndFinish}
                    >
                        Save progress and finish
                    </button>
                )}
                <button
                    className="btn btn-raised btn-warning mx-2"
                    onClick={this.onFinish}
                >
                    Finish
                </button>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    course: state.views.classroom.course.services.course,
    ...state.views.classroom.course.exercise.services,
    ...state.views.classroom.course.exercise.attempt
})
let mapDispatchToProps = (dispatch) => ({
    updateAttempt: (courseId, exerciseId, attemptId, attempt) =>
        dispatch(updateAttempt(courseId, exerciseId, attemptId, attempt)),
    addToast: (component, options) => dispatch(addToast(component, options)),
    finishAttempt: (courseId, exerciseId, attemptId) =>
        dispatch(finishAttempt(courseId, exerciseId, attemptId)),
    getAttemptById: (courseId, exerciseId, attemptId) =>
        dispatch(getAttemptById(courseId, exerciseId, attemptId)),
})
TaskContainer.propTypes = {
    /**
     * Action that should be performed if this component
     * is inside a modal and it gets closed
     */
    onClose: PropTypes.func
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinishAttemptModal)