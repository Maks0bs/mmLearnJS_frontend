import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClassroomRouter from './views/ClassroomRouter'
import PublicRouter from './views/PublicRouter'
import ModalRoot from './components/ModalRoot'
import Reload from './components/performance/Reload'
import ToastRoot from './components/ToastRoot'

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
                            exact path="/reload"
                            component={Reload}
                        />
                        <Route
                            path="/classroom"
                            component={ClassroomRouter}
                        />
                        <Route
                            path="/"
                            component={PublicRouter}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App