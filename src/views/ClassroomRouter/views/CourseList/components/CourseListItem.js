import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CourseListItem extends Component {
    render() {
        let { course, notifications, subscribed } = this.props;
        return (
            <div
                style={{
                    position: 'relative',
                    display: 'inline-block'
                }}
            >
                <h5
                    style={{
                        float: 'left'
                    }}
                >
                    <Link
                        to={`/classroom/course/${course._id}`}
                    >
                        {subscribed && (
                            <mark
                                style={{
                                    background: 'green'
                                }}
                            >
                                [subscribed]
                            </mark>
                        )}
                        {course.name}
                        {notifications && (
                            <mark
                                style={{
                                    background: 'yellow'
                                }}
                            >
                                {notifications}
                            </mark>
                        )}
                    </Link>
                </h5>


            </div>
        );
    }
}

export default CourseListItem;