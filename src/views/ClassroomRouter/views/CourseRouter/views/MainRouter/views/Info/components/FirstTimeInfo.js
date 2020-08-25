import React, {Component} from 'react';
import PropTypes from "prop-types";

class FirstTimeInfo extends Component {

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    componentWillUnmount(){
        this.handleLeave();
    }

    render() {
        return (
            <div className="container my-4">
                <h1>First time info</h1>
                <p>...</p>

                <button
                    className="btn btn-outline btn-raised"
                    onClick={this.handleLeave}
                    type="button"
                >
                    Close
                </button>
            </div>
        );
    }
}

FirstTimeInfo.propTypes = {
    onClose: PropTypes.func
}

export default FirstTimeInfo;