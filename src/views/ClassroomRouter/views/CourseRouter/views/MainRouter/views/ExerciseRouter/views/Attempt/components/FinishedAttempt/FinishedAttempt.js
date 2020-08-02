import React, {Component} from 'react';
import {connect} from "react-redux";

class FinishedAttempt extends Component {

    render() {
        //TODO return finishedReview if there is time of finish
        return (
            <div>
                finished attempt:
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinishedAttempt)