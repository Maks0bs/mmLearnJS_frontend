import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { saveChanges } from "../services/actions";
import { addToast } from '../../../../../../../components/ToastRoot/services/actions'

class EditActions extends Component {
    constructor(){
        super();

        this.state = {
            redirectToMain: false
        }
    }

    handleLeave = () => {
        this.setState({
            redirectToMain: true
        })
    }

    handleSaveChanges = (e) => {
        e.preventDefault();
        this.props.saveChanges({bruh: 'bruh'})
            /*.then(() => {
                this.handleLeave();

                this.props.addToast(
                    (
                        <div>
                            Course data has been changed
                        </div>
                    ),
                    {
                        type: 'success'
                    }
                )
            })*/
    }

    render() {
        if (this.state.redirectToMain){
            return <Redirect to={`/classroom/course/${this.props.courseData._id}`} />
        }
        return (
            <div>
                <button
                    className="btn btn-raised btn-outline btn-danger ml-3"
                    onClick={this.handleLeave}
                >
                    Cancel changes
                </button>

                <button
                    className="btn btn-raised btn-outline btn-success ml-3"
                    onClick={this.handleSaveChanges}
                >
                    Save changes
                </button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addToast: (component, options) => dispatch(addToast(component, options)),
        saveChanges: (exercises) => dispatch(saveChanges(exercises))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditActions)