import React, {Component} from 'react';
import Loading from '../../res/images/LoadingRingAnimated50px.svg'

class SmallLoading extends Component {
    render() {
        return (
            <img
                src={Loading}
                alt="loading"
            />
        );
    }
}

export default SmallLoading;