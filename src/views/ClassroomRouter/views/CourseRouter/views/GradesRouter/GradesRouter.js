import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import TeacherStats from "./TeacherStats";
import StudentStats from "./StudentStats";
import OptimizedPureComponent from "../../../../../../components/performance/OptimizedPureComponent";
import CourseTabs from "../../components/CourseTabs";
import {removeLastUrlParam} from "../../services/helpers";
import { getExerciseSummaries } from "./services/actions";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";


class GradesRouter extends OptimizedPureComponent {

    mounted = false;

    componentDidMount() {
        this.mounted = true;
        console.log('mounted');
    }


    render() {
        return null;
        super.render();
        if (!this.props.authenticatedUser){
            return <Redirect to={`/classroom/course/${this.props.courseData._id}`} />
        }
        if (this.canCallOptimally()){
            let filter = this.props.match.params.gradeFilter;
            this.startLoading();
            this.props.getExerciseSummaries(this.props.courseData._id,
                (filter === 'teacher') ? 'all' : filter
            )
                .then(() => {
                    this.stopLoading();
                })
        }
        if (!this.props.summaries){
            return (
                <BigLoadingCentered/>
            )
        }
        let path = removeLastUrlParam(this.props.match.path);
        return (
            <div className="container mt-3">
                <CourseTabs />
                <Switch>
                    <Route
                        exact path={`${path}/teacher`}
                        component={TeacherStats}
                    />

                    <Route
                        exact path={`${path}/:userId`}
                        component={StudentStats}
                    />

                </Switch>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.services,
        ...state.views.classroom.course.main.grades,
        ...state.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getExerciseSummaries: (courseId, param) => dispatch(getExerciseSummaries(courseId, param))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GradesRouter)
