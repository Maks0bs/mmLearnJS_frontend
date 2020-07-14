import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import TeacherStats from "./TeacherStats";
import StudentStats from "./StudentStats";
import OptimizedPureComponent from "../../../../../../../../components/OptimizedPureComponent";


class MainRouter extends OptimizedPureComponent {

    render() {
        super.render();
        if (this.canCallOptimally()){
            //TODO
        }
        let { path } = this.props.match;
        return (
            <div>
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
)(MainRouter)
