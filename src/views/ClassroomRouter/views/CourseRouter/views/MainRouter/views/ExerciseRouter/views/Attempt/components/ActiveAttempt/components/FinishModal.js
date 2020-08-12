import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import { updateAttempt, finishAttempt  } from "../../../services/actions";
import { addToast } from "../../../../../../../../../../../../../components/ToastRoot/services/actions";
import { isEqual } from 'lodash'


class FinishModal extends Component {
    constructor() {
        super();

        this.state = {
            reload: false
        }
    }

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
        this.setState({
            reload: false
        })
    }

    componentWillUnmount(){
        this.handleLeave();
    }

    displayError(text){
        this.props.addToast(
            (
                <div>
                    {text || 'Problem with loading data. Try reloading the page'}
                </div>
            ),
            {
                type: 'error'
            }
        )
    }

    onSaveAndFinish = (e) => {
        e.preventDefault();
        this.props.updateAttempt(
            this.props.courseData._id,
            this.props.exercise._id,
            this.props.attempt._id,
            this.props.attempt
        )
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    return this.props.finishAttempt(
                        this.props.courseData._id,
                        this.props.exercise._id,
                        this.props.attempt._id
                    )
                }
            })
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    this.props.addToast(
                        (
                            <div>
                                Attempt saved and finished
                            </div>
                        ),
                        {
                            type: 'success'
                        }
                    )
                    this.setState({
                        reload: true
                    })
                }
            })
    }

    onFinish = (e) => {
        e.preventDefault();
        this.props.finishAttempt(
            this.props.courseData._id,
            this.props.exercise._id,
            this.props.attempt._id
        )
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    this.props.addToast(
                        (
                            <div>
                                Attempt finished
                            </div>
                        ),
                        {
                            type: 'info'
                        }
                    )
                    this.setState({
                        reload: true
                    })
                }
            })
    }

    render() {

        if (this.state.reload){
            this.handleLeave();
            return (
                <Redirect
                    to={{
                        pathname: '/reload',
                        state: {
                            page: this.props.location.pathname
                        }
                    }}
                />
            )
        }

        let { attempt, oldAttempt } = this.props;


        let changed = !isEqual(attempt, oldAttempt);


        return (
            <div className="container my-3">
                <h2>Are you sure you want to finish this attempt?</h2>
                {changed && (
                    <p>
                        <strong
                            style={{
                                color: 'red'
                            }}
                        >
                            *
                        </strong>
                        You have unsaved answers. You can save them and finish the attempt afterwards
                    </p>
                )}

                <button
                    className="btn btn-outline btn-raised"
                    onClick={this.handleLeave}
                    type="button"
                >
                    Cancel
                </button>
                {changed && (
                    <button
                        className="btn btn-outline btn-raised btn-success ml-3"
                        onClick={this.onSaveAndFinish}
                    >
                        Save progress and finish
                    </button>
                )}

                <button
                    className="btn btn-outline btn-raised btn-warning ml-3"
                    onClick={this.onFinish}
                >
                    Finish
                </button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.services,
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.exercise.attempt
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateAttempt: (courseId, exerciseId, attemptId, attempt) =>
            dispatch(updateAttempt(courseId, exerciseId, attemptId, attempt)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        finishAttempt: (courseId, exerciseId, attemptId) =>
            dispatch(finishAttempt(courseId, exerciseId, attemptId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(FinishModal))