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
                    course content (sections) and exercises.
                </p>
                <p>
                    Use the secondary
                    navigation bar to navigate through the course.
                </p>
                <p>On the main course page you will find links to all its contents.</p>
                <p>
                    As a teacher of the course you can edit its content and exercises
                    (links in the navigation bar)
                </p>
                <p>A lot of courses have forums. Try posting something there!</p>

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