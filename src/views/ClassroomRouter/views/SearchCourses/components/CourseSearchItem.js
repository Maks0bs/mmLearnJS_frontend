import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

/**
 * The items that show basic info about found courses inside the
 * {@link components.views.classroom.SearchCourses}
 * @memberOf components.views.classroom.SearchCourses
 * @component
 */
class CourseSearchItem extends Component {

    render() {
        let { _id, name, about } = this.props;
        return (
                <div>
                    <h4>
                        <Link to={`/classroom/course/${_id}`}>
                            {name}
                        </Link>
                    </h4>
                    <p>
                        <strong className="mr-2">About:</strong>
                        {about}
                    </p>
                </div>
        );
    }
}

CourseSearchItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    about: PropTypes.string
}
export default CourseSearchItem;