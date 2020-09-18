import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCurUserCourseStatus} from "../../../../services/helpers";
import {Redirect} from "react-router-dom";
import StudentPreview from "./components/StudentPreview";
import TeacherPreview from "./components/TeacherPreview";

class ExercisePreview extends Component {

    render() {
        let { exercise, courseData, authenticatedUser: user } = this.props;
        let { name } = exercise;
        let status = getCurUserCourseStatus(courseData, user);
        console.log(status);
        switch (status){
            case 'enrolled':
            case 'invited teacher enrolled':
                return (
                    <StudentPreview />
                )
            case 'teacher':
            case 'creator':
                return (
                    <TeacherPreview />
                )
            default:
                return (
                    <Redirect to={`/classroom/course/${courseData._id}`} />
                )
        }

    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
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
)(ExercisePreview)