import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types'
import { COURSE_USER_STATUS } from "../services/helpers";

/**
 * A specification of a DOM-{@link Route} that only allows authenticated
 * users who are teachers at the given course to route further
 * @memberOf components.views.classroom.course
 * @component
 */
class TeacherRoute extends Component {

    render() {
        let { coursePrefix, status } = this.props;
        let { NOT_AUTHENTICATED, TEACHER, CREATOR } = COURSE_USER_STATUS
        if (!status){
            status = NOT_AUTHENTICATED
        }
        if (!(status === TEACHER || status === CREATOR)){
            return <Redirect to={coursePrefix} />
        }
        return (<Route {...this.props} />);
    }
}

TeacherRoute.propTypes = {
    /**
     * The status of the current authenticated user
     * in relation to the given course. Should be one of {@link COURSE_USER_STATUS}
     */
    status: PropTypes.string,
    /**
     * The url that only has the path to the main page of the course, no
     * other additions
     */
    coursePrefix: PropTypes.string.isRequired,
    /** See {@link Route} */
    path: PropTypes.string.isRequired,
    /** See {@link Route} */
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object
    ]),
    /** See {@link Route} */
    exact: PropTypes.bool,
    /** See {@link Route} */
    render: PropTypes.func,
    ...Route.props
}
export default TeacherRoute;