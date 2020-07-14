import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'

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

        let { redirectToStudentsResults, redirectToGrades, redirectToCourse } = this.state;

        return (
            <div>
                {(() => {
                    if (this.props.status === 'enrolled' || this.props.status === 'invited teacher enrolled'){
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
                                            className="nav-item nav-link"
                                            href="#void"
                                            onClick={this.onCourseClick}
                                        >
                                            Course
                                        </a>
                                        <a
                                            className="nav-item nav-link"
                                            href="#void"
                                            onClick={this.onGradesClick}
                                        >
                                            Grades
                                        </a>
                                    </div>
                                </nav>

                            </div>
                        )
                    } else if (this.props.status === 'creator' || this.props.status === 'teacher'){
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
                                            className="nav-item nav-link"
                                            href="#void"
                                            onClick={this.onCourseClick}
                                        >
                                            Course
                                        </a>
                                        <a
                                            className="nav-item nav-link"
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
                    <Redirect to={`/classroom/course/${this.props.courseData._id}`}/>
                )}
                {redirectToGrades && (
                    <Redirect to={`/classroom/course/${this.props.courseData._id}/grades/${this.props.auth._id}`} />
                )}
                {redirectToStudentsResults && (
                    <Redirect to={`/classroom/course/${this.props.courseData._id}/grades/teacher`} />
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
)(CourseTabs);