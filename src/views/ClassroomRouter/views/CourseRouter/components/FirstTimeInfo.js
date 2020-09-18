import React, {Component} from 'react';
import PropTypes from "prop-types";

/**
 * Basic information about courses
 * that gets displayed to users if they visit a course
 * page for the first time
 * @memberOf components.views.classroom.course
 * @component
 */
class FirstTimeInfo extends Component {

    handleLeave = () => this.props.onClose && this.props.onClose();

    componentWillUnmount(){
        this.handleLeave();
    }

    render() {
        return (
            <div className="container my-4">
                <h1>Welcome to mmLearnJS courses</h1>
                <p>
                    Explore courses, try enrolling in them, check out
                    course content (sections) and exercises
                </p>

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
    /**
     * Action that should be performed if this component
     * is inside a modal and it gets closed
     */
    onClose: PropTypes.func
}
export default FirstTimeInfo;