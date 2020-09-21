import React, {Component} from 'react';
import {connect} from "react-redux";
import StudentPreview from "./components/StudentPreview";
import { COURSE_USER_STATUS } from "../../../../services/helpers";
import {Link} from "react-router-dom";
import StudentAttempt from "./components/StudentAttempt";

/**
 * This component displays information about the given exercise
 * depending on the user status in relation to the course
 * @memberOf components.views.classroom.course.exercise
 * @component
 */
class ExercisePreview extends Component {

    render() {
        let { TEACHER, CREATOR } = COURSE_USER_STATUS;
        let { curUserCourseStatus: status, exercise, course } = this.props;
        let { name, participants } = exercise;
        let isTeacher = ((status === TEACHER) || (status === CREATOR));
        if (!isTeacher){
            return (<StudentPreview/>)
        } else {
            return (
                <div className="container my-3">
                    <h1>Exercise <strong>{name}</strong> </h1>
                    <p>To edit the this exercise, please go to the { }
                        <Link to={`/classroom/course/${course._id}/edit-exercises`}>
                            exercises editor
                        </Link>
                    </p>
                    <h2>Students' stats:</h2>
                    <ul>
                        {Array.isArray(participants) && participants.map((p, i) => (
                            <StudentAttempt num={i} key={i}/>
                        ))}
                    </ul>
                </div>
            )
        }
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services,
    ...state.views.classroom.course.exercise.services
})
export default connect(
    mapStateToProps
)(ExercisePreview)