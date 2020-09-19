import React, {Component} from 'react';
import {connect} from "react-redux";
import {  withRouter } from 'react-router-dom'
import {COURSE_USER_STATUS, getCurUserCourseStatus} from "../services/helpers";
import NavLinkSecondary from "../../../../../components/reusables/navbar/NavLinkSecondary";

/**
 * Tabs for quick navigation inside a course
 * @memberOf components.views.classroom.course
 * @component
 */
class CourseTabs extends Component {

    render() {
        let { status, location, course, authenticatedUser: user } = this.props;
        let {
            NOT_AUTHENTICATED, NOT_ENROLLED, ENROLLED, INVITED_TEACHER_ENROLLED,
            CREATOR, TEACHER
        } = COURSE_USER_STATUS;
        let { pathname } = location;
        if (!status){
            status = getCurUserCourseStatus(course, user);
        }
        let courseLink = `/classroom/course/${course._id}`,
            gradesLink = `/classroom/course/${course._id}/grades/`,
            studentsResultsLink = `/classroom/course/${course._id}/grades/teacher`,
            editLink = `/classroom/course/${course._id}/edit`,
            editInfoLink = `/classroom/course/${course._id}/edit-info`,
            editTestsLink = `/classroom/course/${course._id}/edit-exercises`
        if (status !== NOT_AUTHENTICATED && status !== NOT_ENROLLED){
            gradesLink += user ? user._id : '';
        }

        let isEnrolled = (status === ENROLLED || status === INVITED_TEACHER_ENROLLED),
            isTeacher = (status === CREATOR || status === TEACHER);

        let ulStyle = {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'inline-block', width: '100%'
        }
        return (
            <div className="my-2 mx-3">
                <nav
                    className="text-center"
                    style={{
                        borderStyle: 'solid',
                        borderRadius: '10px',
                        padding: '5px 10px',
                        display: !!user && (isEnrolled || isTeacher) ? 'flex' : 'none',
                    }}
                >
                    {(() => {
                        if (isEnrolled) {
                            return (
                                <ul className={"nav nav-tabs"} style={ulStyle}>
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={courseLink}
                                        active={pathname === courseLink}
                                        text="Course"
                                    />
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={gradesLink}
                                        active={pathname === gradesLink}
                                        text="Grades"
                                    />
                                </ul>
                            )
                        } else if (isTeacher) {
                            return (
                                <ul className="nav nav-tabs" style={ulStyle}>
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={courseLink}
                                        active={pathname === courseLink}
                                        text="Course"
                                    />
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={editInfoLink}
                                        active={pathname === editInfoLink}
                                        highlightColor={`#7ba7e3`}
                                        style={{color: '#0d3b78'}}
                                        text="Edit info"
                                    />
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={editLink}
                                        active={pathname === editLink}
                                        highlightColor={`#d3ed74`}
                                        style={{color: '#6f8718'}}
                                        text="Edit content"
                                    />
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={editTestsLink}
                                        active={pathname === editTestsLink}
                                        highlightColor={`#b5698e`}
                                        style={{color: '#9e004c'}}
                                        text="Edit exercises"
                                    />
                                    <NavLinkSecondary
                                        className="mx-2"
                                        path={studentsResultsLink}
                                        active={pathname === studentsResultsLink}
                                        text="Students' results"
                                    />
                                </ul>
                            )
                        }
                    })()}
                </nav>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services,
    ...state.services
})
export default connect(
    mapStateToProps
)(withRouter(CourseTabs));