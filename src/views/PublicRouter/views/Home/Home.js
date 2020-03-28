import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed'

class Home extends Component {

    render() {
        // don't forget to apply styling
        return (
            <div className="row ml-2">
                <NewsFeed />
            </div>
        );
    }
}

export default Home