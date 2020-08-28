import React, {Component} from 'react';
import LoadingRingAnimated from "../../res/images/LoadingRingAnimated200px.svg";

/**
 * Big centered loading indicator
 *
 * @memberOf components.common
 * @component
 */
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