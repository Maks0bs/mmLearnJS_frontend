import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import { updateAttemptAnswers, getAttemptById } from "../../../services/actions";
import { addToast } from "../../../../../../../../../../../components/ToastRoot/services/actions";
import { showModal, hideModal } from "../../../../../../../../../../../components/ModalRoot/services/actions";
import FinishModal from "./FinishAttemptModal";

/**
 * This component allows the students to navigate through the exercise,
 * save their progress or finish the attempt
 * @memberOf components.views.classroom.course.exercise.Attempt.ActiveAttempt
 * @component
 */
class AttemptActions extends Component {

    displayError(text){
        this.props.addToast(
            (<div>{text || 'Problem loading data. Try reloading the page'}</div>),
            {type: 'error'}
        )
    }

    onSaveChanges = (e) => {
        e.preventDefault();
        this.props.updateAttempt(
            this.props.attempt._id, this.props.attempt.answers
        )
            .then(() => {
                if (this.props.error){
                    this.displayError(this.props.error)
                } else {
                    this.props.addToast(
                        (<div>Attempt saved</div>),
                        {type: 'success'}
                    )
                    // this causes a reload and a fetch of updated attempt data
                    this.props.getAttemptById(this.props.attempt._id)
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
        return (
            <div className="p-2"
                style={{
                    borderStyle: 'solid',
                    borderColor: 'blue',
                    padding: '5px',
                    borderRadius: '5px'
                }}
            >
                Actions:
                <ul style={{listStyleType: 'square'}}>
                    <li>
                        <Link
                            to={`/classroom/course/${this.props.course._id}`}
                            style={{color: 'gray'}}
                        >
                            Back to course
                        </Link>
                    </li>
                    <li>
                       <a
                           href="#void"
                           style={{color: 'green'}}
                           onClick={this.onSaveChanges}
                       >
                            Save changes
                       </a>
                    </li>
                    <li>
                        <a href="#void" onClick={this.onFinishAttemptModal}>
                            Finish attempt
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    course: state.views.classroom.course.services.course,
    ...state.views.classroom.course.exercise.services,
    ...state.views.classroom.course.exercise.attempt
})
let mapDispatchToProps = (dispatch) => ({
    updateAttempt: (attemptId, answers) =>
        dispatch(updateAttemptAnswers(attemptId, answers)),
    addToast: (component, options) => dispatch(addToast(component, options)),
    showModal: (component) => dispatch(showModal(component)),
    hideModal: () => dispatch(hideModal()),
    getAttemptById: (attemptId) => dispatch(getAttemptById(attemptId)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AttemptActions))