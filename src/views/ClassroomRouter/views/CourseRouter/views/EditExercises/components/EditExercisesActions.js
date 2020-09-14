import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { saveChangesExercises } from "../services/actions";
import { addToast } from '../../../../../../../components/ToastRoot/services/actions'

/**
 * These buttons allow the user to save progress in the
 * exercise editor or to cancel the changes
 * @memberOf components.views.classroom.course.EditExercises
 * @component
 */
class EditExercisesActions extends Component {
    constructor(props){
        super(props);
        this.state = { redirectToMain: false }
    }

    handleLeave = () => {
        this.setState({ redirectToMain: true })
    }

    handleSaveChanges = (e) => {
        e.preventDefault();
        this.props.saveChanges(this.props.newExercises, this.props.course._id)
            .then(() => {
                if (!this.props.error) {
                    this.handleLeave();
                    this.props.addToast(
                        (<div>Course data has been changed</div>),
                        {type: 'success'}
                    )
                } else {
                    this.props.addToast(
                        (<div>{this.props.error}</div>),
                        {type: 'error'}
                    )
                }
            })
    }

    render() {
        if (this.state.redirectToMain){
            return <Redirect to={`/classroom/course/${this.props.course._id}`} />
        }
        return (
            <div>
                <button
                    className="btn btn-raised btn-danger ml-3"
                    onClick={this.handleLeave}
                >
                    Cancel changes
                </button>
                <button
                    className="btn btn-raised btn-success ml-3"
                    onClick={this.handleSaveChanges}
                >
                    Save changes
                </button>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editExercises.services,
    ...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
    addToast: (component, options) => dispatch(addToast(component, options)),
    saveChanges: (exercises, id) => dispatch(saveChangesExercises(exercises, id))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercisesActions)