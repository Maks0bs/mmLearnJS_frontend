import React, {Component} from 'react';
import BigLoadingCentered from "./BigLoadingCentered";

/**
 * Big centered loading indicator.
 * It is located in the center of the screen
 * (vertically and horizontally)
 *
 * @memberOf components.common
 * @component
 */
class BigLoadingAbsolute extends Component {
    render() {
        return (
            <div
                style={{
                    margin: 0,
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    marginTop: '-100px',
                    marginLeft: '-100px',
                    zIndex: 1000
                }}
            >
                <BigLoadingCentered />
            </div>
        );
    }
}

export default BigLoadingAbsolute;