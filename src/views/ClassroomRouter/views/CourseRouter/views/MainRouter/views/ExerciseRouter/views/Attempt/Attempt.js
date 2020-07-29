import React, {Component} from 'react';
import {connect} from "react-redux";
import { getAttemptById } from "./services/actions";
import { addToast } from "../../../../../../../../../../components/ToastRoot/services/actions";

class Attempt extends Component {

    componentDidMount() {
        this.props.getAttemptById(this.props.courseData._id, this.props.exercise._id, this.props.match.params.attemptId)
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
        //TODO return finishedReview if there is time of finish
        return (
            <div>
                {JSON.stringify(this.props.attempt)}
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
        getAttemptById: (courseId, exerciseId, attemptId) =>
            dispatch(getAttemptById(courseId, exerciseId, attemptId)),
        addToast: (component, options) => dispatch(addToast(component, options))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Attempt)