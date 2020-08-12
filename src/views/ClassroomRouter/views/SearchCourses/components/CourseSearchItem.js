import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CourseSearchItem extends Component {

    render() {
        let { course} = this.props;
        return (
                <div
                >
                    <h4>
                        <Link
                            to={`/classroom/course/${course._id}`}
                        >
                            {course.name}
                        </Link>
                    </h4>
                    <p>
                        <strong className="mr-2">About:</strong>
                        {course.about}
                    </p>


                </div>
        );
    }
}

export default CourseSearchItem;