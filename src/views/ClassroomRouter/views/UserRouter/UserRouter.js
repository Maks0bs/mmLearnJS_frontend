import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import EditUser from "./views/EditUser";
import User from "./views/User/User";
import { getUser } from "./services/actions";
import OptimizedComponent from "../../../../components/performance/OptimizedComponent";
import OptimizedPureComponent from "../../../../components/performance/OptimizedPureComponent";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";


class UserRouter extends OptimizedPureComponent {

    render() {
        super.render();
        if (this.canCallOptimally()){
            this.props.getUser(this.props.match.params.userId)
            this.loading = true;
        }
        if (!this.props.user || !this.props.user._id){
            return (
                <BigLoadingCentered />
            )
        } else {
            this.loading = false;
        }
        let { path } = this.props.match;
        return (
            <div>
                <Switch>
                    <Route
                        exact path={`${path}`}
                        component={User}
                    />

                    <Route
                        exact path={`${path}/edit`}
                        component={EditUser}
                    />

                </Switch>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        user: state.views.classroom.user.user
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getUser: (userId) => dispatch(getUser(userId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRouter)
