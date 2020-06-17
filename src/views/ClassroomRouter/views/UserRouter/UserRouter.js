import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import EditUser from "./views/EditUser";
import User from "./views/User/User";
import { getUser } from "./services/actions";


class UserRouter extends Component {
    constructor(){
        super();

        this.upd = 0;
        this.state = {
            mounted: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextProps, this.props)){
            this.upd++;
            return true;
        }
        return (!_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props))
    }

    componentDidMount() {
        this.setState({
            mounted: true
        })
    }


    render() {

        if (!this.state.mounted){
            return null;
        }



        this.upd++;
        if (this.upd % 2 === 1){
            this.props.getUser(this.props.match.params.userId)
        }
        if (!this.props.user || !this.props.user._id){
            return null;
        }
        let { path } = this.props.match;
        console.log('user router', this.props);
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
        ...state.views.classroom.user
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
