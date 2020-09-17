import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { dndTypes } from './services/helpers'
import { showModal, hideModal} from "../../../../../../components/ModalRoot/services/actions";
import { updateExercises, addExercise, copyExercisesFromOldData, cleanup } from "./services/actions";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {faArrowsAlt, faList, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import Exercise from "./components/ExerciseContainer";
import EditActions from "./components/EditExercisesActions";
import EditorHelp from "../../components/EditorHelp";
import {reorderArrayShallow} from "../../../../../../services/helpers";
let { EXERCISES } = dndTypes;

/**
 * This page allows teachers to edit exercises / tests in their course:
 * add, edit, delete exercises and tasks inside them
 * @memberOf components.views.classroom.course
 * @component
 */
class EditExercises extends Component {

    componentDidMount() {
        this.props.initData();
    }

    showHelp = (e) => {
        e.preventDefault();
        this.props.showModal(
            <EditorHelp inModal={true} onClose={this.props.hideModal} type="exercises"/>
        )
    }

    onAddExercise = (e) => {
        e.preventDefault();
        this.props.addExercise();
    }

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        if (result.type === EXERCISES) {
            let exercises = reorderArrayShallow(
                this.props.newExercises,
                result.source.index,
                result.destination.index
            );
            this.props.updateExercises(exercises);
        }
    }

    render() {
        let { newExercises: exercises } = this.props;
        let isMobileWidth = (window.innerWidth <= 1000);
        if (!exercises){
            return (
                <div className="alert alert-danger m-5">
                    Error loading course data. Please try reloading the page
                </div>
            )
        }
        return (
            <div
                className="container my-5"
                style={{width: isMobileWidth ? '95%' : '70%'}}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'max(90%) minmax(auto, 10%)'
                    }}
                >
                    <div>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppableExercises" type={EXERCISES}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={{
                                            background: snapshot.isDraggingOver ? "lightblue" : "",
                                            padding: '10px',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <div className="column">
                                            {exercises && exercises.map((section, i) => (
                                                <Draggable
                                                    key={`exercise${i}`}
                                                    draggableId={`exercise${i}`}
                                                    index={i}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            style={{
                                                                padding: '10px',
                                                                userSelect: 'none',
                                                                margin: '5px',
                                                                borderRadius: '5px',
                                                                background: snapshot.isDragging ?
                                                                    '#e0e0e0' : '#f0f0f0',
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            <span {...provided.dragHandleProps} >
                                                                <div className="float-left m-1">
                                                                    <Icon icon={faArrowsAlt} />
                                                                </div>
                                                            </span>

                                                            <Exercise num={i}/>

                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                        <a href="#void" onClick={this.onAddExercise}>
                                            <Icon icon={faList} className="pr-1"/>
                                            Add test / exercise
                                        </a>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div>
                        <a href="#void" onClick={this.showHelp}>
                            <Icon className="pr-1" icon={faQuestionCircle} />
                            Help
                        </a>
                    </div>
                </div>
                <hr />
                <EditActions />
            </div>
        )
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services,
    ...state.views.classroom.course.editExercises
})
let mapDispatchToProps = (dispatch) => ({
    updateExercises: (exercises) => dispatch(updateExercises(exercises)),
    addExercise: () => dispatch(addExercise()),
    initData: () => dispatch(copyExercisesFromOldData()),
    showModal: (component) => dispatch(showModal(component)),
    hideModal: () => dispatch(hideModal()),
    cleanup: () => dispatch(cleanup())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercises);
