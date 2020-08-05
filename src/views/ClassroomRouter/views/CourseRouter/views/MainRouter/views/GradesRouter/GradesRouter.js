import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import TeacherStats from "./TeacherStats";
import StudentStats from "./StudentStats";
import OptimizedPureComponent from "../../../../../../../../components/OptimizedPureComponent";
import CourseTabs from "../../components/CourseTabs";


class GradesRouter extends OptimizedPureComponent {

    render() {
        super.render();
        console.log('bruh');
        if (this.canCallOptimally()){
            //TODO
        }
        let { path } = this.props.match;
        console.log('path', path);
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
        ...state.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GradesRouter)
