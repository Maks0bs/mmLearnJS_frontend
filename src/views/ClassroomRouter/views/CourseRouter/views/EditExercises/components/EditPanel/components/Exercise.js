import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../../../components/ModalRoot/services/actions';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditExercise from "./EditExercise/";
import { preDeleteExercise, deleteExercise, restoreDeletedExercise} from "../../../services/actions";

class Exercise extends Component {

    //this.props.num is required to work!!!!!!!

    showEditExerciseModal = (e) => {
        e.preventDefault();
        this.props.showModal(
            <EditExercise
                onClose={this.props.hideModal}
                num={this.props.num}
            />
        )
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteExercise(this.props.num);
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedExercise(this.props.num);
    }

    onPreDelete = (e) => {
        e.preventDefault();
        this.props.preDeleteExercise(this.props.num);
    }

    render() {
        let exercise = this.props.courseData.exercises[this.props.num];
        //switch type
        if (exercise.deleted){
            return (
                <div>
                    <p> Deleted exercise <strong> {exercise.name} </strong> </p>
                    <a
                        href="#void"
                        style={{color: 'blue'}}
                        onClick={this.onRestore}
                    >
                        Restore
                    </a>
                    <a
                        href="#void"
                        className="ml-2"
                        style={{color: 'brown'}}
                        onClick={this.onDelete}
                    >
                        Do not show anymore
                    </a>
                </div>
            )
        }
        return (
            <div>
                <Icon
                    icon={faPencilAlt}
                    onClick={this.showEditExerciseModal}
                    className="float-right m-1"
                    style={{
                        cursor: 'pointer'
                    }}
                    color="blue"
                />
                <Icon
                    icon={faTrashAlt}
                    onClick={this.onPreDelete}
                    className="float-right m-1"
                    style={{
                        cursor: 'pointer'
                    }}
                    color="red"
                />
                <h4>{exercise.name}</h4>
                {(() => {
                    if (!exercise._id){
                        return <p style={{color: 'green'}}> new </p>
                    } else return null
                })()}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        showModal: (component) => dispatch(showModal(component)),
        preDeleteExercise: (num) => dispatch(preDeleteExercise(num)),
        deleteExercise: (num) => dispatch(deleteExercise(num)),
        restoreDeletedExercise: (num) => dispatch(restoreDeletedExercise(num))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exercise);