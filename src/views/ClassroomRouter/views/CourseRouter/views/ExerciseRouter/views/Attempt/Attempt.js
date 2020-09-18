import React, {Component} from 'react';
import {connect} from "react-redux";
import { getAttemptById } from "./services/actions";
import { addToast } from "../../../../../../../../components/ToastRoot/services/actions";
import LoadingRingAnimated from "../../../../../../../../res/images/LoadingRingAnimated200px.svg";
import FinishedAttempt from "./components/FinishedAttempt/FinishedAttempt";
import ActiveAttempt from "./components/ActiveAttempt/ActiveAttempt";

class Attempt extends Component {

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

    componentDidMount() {
        this.props.getAttemptById(this.props.courseData._id, this.props.exercise._id, this.props.match.params.attemptId)
            .then(() => {
                if (this.props.error){
                    this.displayError('Problem loading attempt')
                }
            })
    }

    render() {
        if (!this.props.attempt || !this.props.attempt._id){

            return (
                <div
                    style={{
                        textAlign: 'center'
                    }}
                >
                    <img src={LoadingRingAnimated} alt="loading"/>
                </div>
            )
        }


        if (this.props.attempt.endTime){
            return (
                <FinishedAttempt />
            )
        } else {
            return (
                <ActiveAttempt />
            )
        }
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
        getAttemptById: (courseId, exerciseId, attemptId) =>
            dispatch(getAttemptById(courseId, exerciseId, attemptId)),
        addToast: (component, options) => dispatch(addToast(component, options))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Attempt)