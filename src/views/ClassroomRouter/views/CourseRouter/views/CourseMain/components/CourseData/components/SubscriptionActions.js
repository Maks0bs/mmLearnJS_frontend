import React, {Component} from 'react';
import { subscribe, unsubscribe } from "../../../services/actions";
import {connect} from "react-redux";
import {Redirect, withRouter} from 'react-router-dom'
import { getCourseById } from "../../../../../services/actions";
import { addToast } from "../../../../../../../../../components/ToastRoot/services/actions";

class SubscriptionActions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reload: false
        }
    }



    onAfterAction = (action) => {
        if (!this.props.error){
            this.props.addToast(
                (
                    <div>
                        {this.props.message ? this.props.message :
                            (action === 'subscribe' ? 'Subscription success' : 'Unsubscription success')
                        }
                    </div>
                ),
                {type: action === 'subscribe' ? 'success' : 'info'}
            )
            this.setState({
                reload: true
            })
        }
        else{
            return this.props.addToast(
                (
                    <div>
                        {this.props.error}
                    </div>
                ),
                {type: 'error'}
            )
        }
    }

    onSubscribe = (event) => {
        event.preventDefault()
        this.props.subscribe(this.props.courseData._id)
            .then(() => {
                this.onAfterAction('subscribe')
            })
    }

    onUnsubscribe = (event) => {
        event.preventDefault()
        this.props.unsubscribe(this.props.courseData._id)
            .then(() => {
                this.onAfterAction('unsubscribe')
            })
    }

    render() {
        if (this.state.reload){
            this.setState({
                reload: false
            })
            return (
                <Redirect
                    to={`/classroom/course/${this.props.courseData._id}`}
                />
            )
        }
        let subbed = false;
        for (let i of this.props.authenticatedUser.subscribedCourses){
            if (i.course && i.course._id === this.props.courseData._id){
                subbed = true;
                break;
            }
        }


        return (
            <span>
                {(() => {
                    if (!subbed) return (
                        <button
                            className="btn btn-raised btn-outline btn-success ml-3"
                            type="button"
                            onClick={this.onSubscribe}
                        >
                            Subscribe
                        </button>
                    )
                    else return (
                        <button
                            className="btn btn-raised btn-outline btn-danger ml-3"
                            type="button"
                            onClick={this.onUnsubscribe}
                        >
                            Unsubscribe
                        </button>
                    )
                })()}
            </span>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.info,
        ...state.views.classroom.course.main.services,
        authenticatedUser: state.services.authenticatedUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        subscribe: (id) => dispatch(subscribe(id)),
        unsubscribe: (id) => dispatch(unsubscribe(id)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        getCourseById: (id) => dispatch(getCourseById(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SubscriptionActions));