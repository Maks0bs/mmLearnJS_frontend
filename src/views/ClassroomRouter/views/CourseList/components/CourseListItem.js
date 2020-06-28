import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CourseListItem extends Component {
    render() {
        let { course, notifications } = this.props;
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
                        {course.name}
                        <mark
                            style={{
                                background: 'yellow'
                            }}
                        >
                            1
                        </mark>
                    </Link>
                </h5>


            </div>
        );
    }
}

export default CourseListItem;