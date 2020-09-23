import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClassroomRouter from './views/ClassroomRouter'
import PublicRouter from './views/PublicRouter'
import ModalRoot from './components/ModalRoot'
import ToastRoot from './components/ToastRoot'
import {getAuthenticatedUser} from "./services/main/actions";
import {connect} from "react-redux";

/**
 * The main component, that gets rendered by the DOM.
 * At the same time it is the main router for the whole app.
 *
 * @component
 * @memberOf components
 */
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <ModalRoot />
                    <ToastRoot />
                    <Switch>
                        <Route
                            path="/classroom"
                            render={() => {
                                this.props.getAuthenticatedUser();
                                return (<ClassroomRouter />)
                            }}
                        />
                        <Route
                            path="/"
                            render={() => {
                                this.props.getAuthenticatedUser();
                                return (<PublicRouter />)
                            }}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => ({
    getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
})
export default connect(
    null,
    mapDispatchToProps
)(App);