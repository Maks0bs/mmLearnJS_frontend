import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect, withRouter } from 'react-router-dom'
import {getEnrollmentStatus} from "../../../services/helpers";

class CourseTabs extends Component {
    constructor() {
        super();

        this.state = {
            redirectToCourse: false,
            redirectToGrades: false,
            redirectToStudentsResults: false
        }
    }

    onStudentsResultsClick = (e) => {
        e.preventDefault();
        this.setState({
            redirectToStudentsResults: true
        })
    }


    onGradesClick = (e) => {
        e.preventDefault();
        this.setState({
            redirectToGrades: true
        })
    }

    onCourseClick = (e) => {
        e.preventDefault();
        this.setState({
            redirectToCourse: true
        })
    }

    render() {

        console.log('my props', this.props);
        let { redirectToStudentsResults, redirectToGrades, redirectToCourse } = this.state;
        let { status, location } = this.props;
        let { pathname } = location;
        if (!status){
            status = getEnrollmentStatus(this.props.courseData, this.props.authenticatedUser);
        }

        let courseLink = `/classroom/course/${this.props.courseData._id}`;
        let gradesLink = `/classroom/course/${this.props.courseData._id}`;
        if (status !== 'not enrolled'){
            gradesLink += this.props.authenticatedUser._id;
        }
        let studentsResultsLink = `/classroom/course/${this.props.courseData._id}/grades/teacher`;

        return (
            <div>
                {(() => {

                    if (status === 'enrolled' || status === 'invited teacher enrolled'){
                        return (
                            <div
                                style={{
                                    borderStyle: 'solid',
                                    borderRadius: '15px',
                                    padding: '5px'
                                }}
                            >
                                <nav>
                                    <div
                                        className={"nav nav-tabs"}
                                    >
                                        <a
                                            className={"nav-item nav-link" + (
                                                pathname === courseLink ? ' active' : ''
                                            ) }
                                            href="#void"
                                            onClick={this.onCourseClick}
                                        >
                                            Course
                                        </a>
                                        <a
                                            className={"nav-item nav-link" + (
                                                pathname === gradesLink ? ' active' : ''
                                            )}
                                            href="#void"
                                            onClick={this.onGradesClick}
                                        >
                                            Grades
                                        </a>
                                    </div>
                                </nav>

                            </div>
                        )
                    } else if (status === 'creator' || status === 'teacher'){
                        return (
                            <div
                                style={{
                                    borderStyle: 'solid',
                                    borderRadius: '15px',
                                    padding: '5px'
                                }}
                            >
                                <nav>
                                    <div
                                        className="nav nav-tabs"
                                    >
                                        <a
                                            className={"nav-item nav-link" + (
                                                pathname === courseLink ? ' active' : ''
                                            )}
                                            href="#void"
                                            onClick={this.onCourseClick}
                                        >
                                            Course
                                        </a>
                                        <a
                                            className={"nav-item nav-link" + (
                                                pathname === studentsResultsLink  ? ' active' : ''
                                            )}
                                            href="#void"
                                            onClick={this.onStudentsResultsClick}
                                        >
                                            Student's results
                                        </a>
                                    </div>
                                </nav>

                            </div>
                        )
                    }
                })()}
                {redirectToCourse && (
                    <Redirect to={courseLink}/>
                )}
                {redirectToGrades && (
                    <Redirect to={gradesLink} />
                )}
                {redirectToStudentsResults && (
                    <Redirect to={studentsResultsLink} />
                )}
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.services,
        authenticatedUser: state.services.authenticatedUser
    }
}

export default connect(
    mapStateToProps
)(withRouter(CourseTabs));