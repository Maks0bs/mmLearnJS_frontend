import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClassroomRouter from './views/ClassroomRouter'
import PublicRouter from './views/PublicRouter'
import ModalRoot from './components/ModalRoot'
import Reload from './components/Reload'
import ToastRoot from './components/ToastRoot'

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
                    {/*maybe add a common footer for all pages*/}
                </Router>
            </div>
        );
    }
}

export default App