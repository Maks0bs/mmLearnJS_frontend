import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

/**
 * Displays user information related to their courses and
 * activities on the website (enrolled courses, teachers courses)
 * @memberOf components.views.classroom.user.User
 * @component
 */
class UserClassroomContent extends Component {
    render() {
        let { about, enrolledCourses, teacherCourses } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 mt-5 mb-5">
                    <hr/>
                    {about && (
                        <div>
                            <h4>About</h4>
                            <p className="lead">{about}</p>
                            <hr/>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-md-6">
                            {enrolledCourses.length > 0 && (<h5>Teacher courses</h5>)}
                            {enrolledCourses.map((course, i) => (
                                <div key={i}>
                                    <Link to={`/classroom/course/${course._id}`}>
                                        {course.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-6">
                            {teacherCourses.length > 0 && (<h5>Teacher courses</h5>)}
                            {teacherCourses.map((course, i) => (
                                <div key={i}>
                                    <Link to={`/classroom/course/${course._id}`}>
                                        {course.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserClassroomContent.propTypes = {
    /**
     * The information about the user,
     * which was specified the user specified himself
     */
    about: PropTypes.string,
    enrolledCourses: PropTypes.arrayOf(PropTypes.object),
    teacherCourses: PropTypes.arrayOf(PropTypes.object)
}
UserClassroomContent.defaultProps = {
    enrolledCourses: [],
    teacherCourses: []
}
export default UserClassroomContent;