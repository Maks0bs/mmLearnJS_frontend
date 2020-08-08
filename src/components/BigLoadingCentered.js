import React, {Component} from 'react';
import LoadingRingAnimated from "../res/images/LoadingRingAnimated200px.svg";

class BigLoadingCentered extends Component {
    render() {
        return (
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <img src={LoadingRingAnimated} alt="loading"/>
            </div>
        );
    }
}

export default BigLoadingCentered;