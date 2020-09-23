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
class EnrolledRoute extends Component {
    constructor(props) {
        super(props);
        this.state = { mounted: false }
    }

    componentDidMount() {
        this.setState({mounted: true})
    }

    render() {
        if (!this.state.mounted) return null;
        let { coursePrefix, status } = this.props;
        let { NOT_AUTHENTICATED, NOT_ENROLLED } = COURSE_USER_STATUS
        if (!status){
            status = NOT_AUTHENTICATED
        }
        if (status === NOT_ENROLLED || status === NOT_AUTHENTICATED){
            return <Redirect to={coursePrefix} />
        }
        return (<Route {...this.props} />);
    }
}

EnrolledRoute.propTypes = {
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
export default EnrolledRoute;