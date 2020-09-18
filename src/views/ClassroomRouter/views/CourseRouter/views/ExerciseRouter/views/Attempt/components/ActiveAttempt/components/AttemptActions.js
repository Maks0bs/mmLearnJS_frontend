import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import { updateAttempt } from "../../../services/actions";
import { addToast } from "../../../../../../../../../../../components/ToastRoot/services/actions";
import { showModal, hideModal } from "../../../../../../../../../../../components/ModalRoot/services/actions";
import FinishModal from "./FinishModal";


class AttemptActions extends Component {
    constructor() {
        super();

        this.state = {
            reload: false
        }
    }

    displayError(text){
        this.props.addToast(
            (
                <div>
                    {text || 'Problem with loading data. Try reloading the page'}
                </div>
            ),
            {
                type: 'error'
            }
        )
    }

    onSaveChanges = (e) => {
        e.preventDefault();
        this.props.updateAttempt(
            this.props.courseData._id,
            this.props.exercise._id,
            this.props.attempt._id,
            this.props.attempt
        )
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    this.props.addToast(
                        (
                            <div>
                                Attempt saved
                            </div>
                        ),
                        {
                            type: 'success'
                        }
                    )
                    this.setState({
                        reload: true
                    })
                }
            })
    }

    onFinishAttemptModal = (e) => {
        e.preventDefault();

        this.props.showModal(
            <FinishModal onClose={this.props.hideModal} />
        )
    }

    render() {

        if (this.state.reload){
            return (
                <Redirect
                    to={{
                        pathname: '/reload',
                        state: {
                            page: this.props.location.pathname
                        }
                    }}
                />
            )
        }
        return (
            <div className="p-2"
                style={{
                    borderStyle: 'solid',
                    borderColor: 'blue'
                }}
            >
                Actions:
                <ul
                    style={{
                        listStyleType: 'square'
                    }}
                >
                    <li>
                        <Link
                            to={`/classroom/course/${this.props.courseData._id}`}
                            style={{
                                color: 'gray'
                            }}
                        >
                            Back to course
                        </Link>
                    </li>
                    <li>
                       <a
                           href="#void"
                           style={{
                               color: 'green'
                           }}
                           onClick={this.onSaveChanges}
                       >
                            Save changes
                       </a>
                    </li>
                    <li>
                        <a
                            href="#void"
                            onClick={this.onFinishAttemptModal}
                        >
                            Finish attempt
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.services,
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.exercise.attempt
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateAttempt: (courseId, exerciseId, attemptId, attempt) =>
            dispatch(updateAttempt(courseId, exerciseId, attemptId, attempt)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        showModal: (component) => dispatch(showModal(component)),
        hideModal: () => dispatch(hideModal())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AttemptActions))