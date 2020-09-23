import React, {Component} from 'react';
import { subscribe, unsubscribe } from "../../../services/actions";
import {connect} from "react-redux";
import { getAuthenticatedUser } from "../../../../../../../../../services/main/actions";
import { getCourseById } from "../../../../../services/actions";
import { addToast } from "../../../../../../../../../components/ToastRoot/services/actions";

/**
 * This button allows users to subscribe / unsubscribe to the course
 * to receive updates and news about it
 * @memberOf components.views.classroom.course.CourseMain.CourseMainData
 * @component
 */
class SubscriptionButton extends Component {
    onAfterAction = (action) => {
        let reserveMessage =
            ((action === 'subscribe') ? 'Subscription' : 'Unsubscription') + ' success';
        if (!this.props.error){
            this.props.addToast(
                (<div>{this.props.message || reserveMessage}</div>),
                {type: action === 'subscribe' ? 'success' : 'info'}
            )
            this.props.getAuthenticatedUser();
        }
        else{
            return this.props.addToast(
                (<div>{this.props.error || 'error'}</div>),
                {type: 'error'}
            )
        }
    }

    onSubscribe = (event) => {
        event.preventDefault()
        this.props.subscribe(this.props.course._id)
            .then(() => this.onAfterAction('subscribe'))
    }

    onUnsubscribe = (event) => {
        event.preventDefault()
        this.props.unsubscribe(this.props.course._id)
            .then(() => this.onAfterAction('unsubscribe'))
    }

    render() {
        let { authenticatedUser: user, course } = this.props;
        let subbed = false;
        if (user && Array.isArray(user.subscribedCourses)){
            // true if current course is in the list of the ones that the user is subbed to
            subbed = user.subscribedCourses.findIndex(
                c => c && c.course && (c.course._id === course._id)
            ) >= 0;
        }
        return (
            <span>
                {!subbed ? (
                    <button
                        className="btn btn-raised btn-outline btn-success ml-3"
                        type="button"
                        onClick={this.onSubscribe}
                    >
                        Subscribe
                    </button>
                ) : (
                    <button
                        className="btn btn-raised btn-outline btn-danger ml-3"
                        type="button"
                        onClick={this.onUnsubscribe}
                    >
                        Unsubscribe
                    </button>
                )}
            </span>
        );
    }
}
let mapStateToProps = (state) => ({
    course: state.views.classroom.course.services.course,
    ...state.views.classroom.course.main,
    ...state.services
})
let mapDispatchToProps = (dispatch) => ({
    subscribe: (id) => dispatch(subscribe(id)),
    unsubscribe: (id) => dispatch(unsubscribe(id)),
    addToast: (component, options) => dispatch(addToast(component, options)),
    getCourseById: (id) => dispatch(getCourseById(id)),
    getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionButton);