import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);

        //temporary state
        this.state = {
            text: ''
        }
    }


    componentDidMount(){
        //temporary test data to check networking
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                text: JSON.stringify(data)
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}

export default App