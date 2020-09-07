import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * An item that shows a course in a certain list, normally contained in a
 * {@link components.views.classroom.CourseList.CollapsibleCourseList}
 * @memberOf components.views.classroom.CourseList
 * @component
 */
class CourseListItem extends Component {
    constructor(props) {
        super(props);
        this.aboutRef = React.createRef();
        this.state = {displayAbout: false}
    }

    displayAbout = (e) => {
        // Check if the event is the necessary mouse event
        if (this.aboutRef && this.aboutRef.current && this.aboutRef.current.contains(e.target)){
            return this.setState({
                displayAbout: e
            })
        }
        if (this.state.displayAbout){
            this.setState({
                displayAbout: false
            })
        }

    }

    componentDidMount() {
        document.addEventListener('touchend', this.displayAbout, false);
        document.addEventListener('mouseover', this.displayAbout, false);
    }

    componentWillUnmount() {
        document.removeEventListener('touchend', this.displayAbout, false);
        document.removeEventListener('mouseover', this.displayAbout, false)
    }


    render() {
        let { course, notifications, subscribed } = this.props;
        let { displayAbout } = this.state;
        return (
            <div style={{position: 'relative', display: 'inline-block'}}>
                <h5 style={{ float: 'left'}}>
                    <Link to={`/classroom/course/${course._id}`}>
                        {subscribed && (
                            <mark className="mr-2" style={{background: 'green'}}>
                                [subscribed]
                            </mark>
                        )}
                        {course.name}
                        {notifications && (
                            <mark style={{background: 'yellow'}}>
                                {notifications}
                            </mark>
                        )}
                    </Link>

                    {displayAbout && (
                        <div
                            style={{
                                position: 'absolute',
                                left: displayAbout.layerX ? (displayAbout.layerX + 15) : 15,
                                top: displayAbout.layerY ? (displayAbout.layerY + 15) : 15,
                                MozUserSelect:'none',
                                WebkitUserSelect:'none',
                                msUserSelect: 'none',
                                background: 'gray',
                                color: 'white',
                                padding: '4px'
                            }}
                        >
                            About: {course.about}
                        </div>
                    )}
                    <span ref={this.aboutRef}>
                        <Icon
                            onTouchEnd={this.displayAbout}
                            onMouseOver={this.displayAbout}
                            className="ml-3"
                            icon={faInfoCircle}
                        />
                    </span>
                </h5>
            </div>
        );
    }
}

CourseListItem.propTypes = {
    /**
       True if the user is subscribed to the course, which is displayed in this item
     */
    subscribed: PropTypes.bool,
    /**
     * The data about the course, displayed in this item
     */
    course: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        about: PropTypes.string
    }),
    /**
     * Amount of notifications about unviewed content, that the user has
     * on the course, displayed in this item
     */
    notifications: PropTypes.number
}
export default CourseListItem;