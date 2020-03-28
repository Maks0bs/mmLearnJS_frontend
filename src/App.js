import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClassroomRouter from './views/ClassroomRouter'
import PublicRouter from './views/PublicRouter'


class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Switch>
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