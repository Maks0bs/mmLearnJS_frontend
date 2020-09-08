import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import EditUser from "./views/EditUser";
import User from "./views/User/User";
import { getUser, cleanup } from "./services/actions";
import { addNavItem, removeNavItem } from "../../../../services/routing/actions";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";

/**
 * @namespace components.views.classroom.user
 */
/**
 * This router is responsible for routing to all links that are
 * used to display user profiles and perform actions with user data
 * @memberOf components.views.classroom.user
 * @component
 */
class UserRouter extends Component {

    componentWillUnmount() {
        this.props.cleanup();
        this.props.removeNavItem('user link')
    }

    render() {
        if (!this.props.user || !this.props.user._id){
            return (<BigLoadingCentered />)
        }
        this.props.addNavItem({
            id: 'user link',
            name: 'User "' + this.props.user.name + '"',
            path: `/classroom/user/${this.props.user._id}`
        })
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

let mapStateToProps = (state) => ({
    user: state.views.classroom.user.user
})
let mapDispatchToProps = (dispatch) => ({
    getUser: (userId) => dispatch(getUser(userId)),
    cleanup: () => dispatch(cleanup()),
    addNavItem: (item) => dispatch(addNavItem(item)),
    removeNavItem: (id) => dispatch(removeNavItem(id))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserRouter))