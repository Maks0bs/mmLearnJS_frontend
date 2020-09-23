import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";
import TeacherRoute from "../../components/TeacherRoute";
import TeacherStats from "./views/TeacherGradesStats";
import StudentStats from "./views/StudentGradesStats";

/**
 * @namespace components.views.classroom.course.grades
 */

/**
 * This router is responsible for all pages
 * that contain summaries of student grades on all exercises.
 * Teachers can view summaries of all exercises for each student
 * @memberOf components.views.classroom.course.grades
 * @component
 */
class GradesRouter extends Component {

    render() {
        let { summaries, match, curUserCourseStatus: status, course } = this.props;
        if (!Array.isArray(summaries)){
            return ( <BigLoadingCentered/>)
        }
        // remove last param (:gradeFilter), because this router
        // routes further depending on this param, it should be considered
        let pathNoLastParam = match.path.split('/').slice(0, -1).join('/');
        return (
            <div>
                <Switch>
                    <TeacherRoute
                        status={status}
                        coursePrefix={`/classroom/course/${course._id}`}
                        exact path={`${pathNoLastParam}/teacher`}
                        component={TeacherStats}
                    />
                    <Route
                        exact path={`${pathNoLastParam}/:userId`}
                        component={StudentStats}
                    />
                </Switch>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services,
    ...state.views.classroom.course.grades
})
export default connect(
    mapStateToProps
)(withRouter(GradesRouter))