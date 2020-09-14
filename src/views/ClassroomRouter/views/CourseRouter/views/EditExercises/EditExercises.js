import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { reorderArray } from "../../../../../../components/services/helpers";
import { dndTypes } from './services/helpers'
import { updateExercises, addExercise } from "./services/actions";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faList } from '@fortawesome/free-solid-svg-icons'
import Exercise from "./components/Exercise";
let { EXERCISES } = dndTypes;

class EditExercises extends Component {

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        if (result.type === EXERCISES) {
            let exercises = reorderArray(
                this.props.courseData.exercises,
                result.source.index,
                result.destination.index
            );
            this.props.updateExercises(exercises);
        }
    }

    render() {
        let { course } = this.props;
        let { exercises } = course;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <p className="ml-3 mt-2"> <Icon icon={faAlignJustify} /> = Move around exercises </p>
                <hr />
                <Droppable droppableId="droppableExercises" type={EXERCISES}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                background: snapshot.isDraggingOver ? "lightblue" : "",
                                padding: '10px 0px 10px 10px',
                                display: 'inline-block'
                            }}
                        >
                            <div className="column" >
                                {exercises.map((section, i) => (
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
                                                    padding: '8px',
                                                    userSelect: 'none',
                                                    margin: '4px',
                                                    background: snapshot.isDragging ?
                                                        'grey' : 'lightgrey',
                                                    ...provided.draggableProps.style
                                                }}
                                            >
												<span {...provided.dragHandleProps} >
													<div className="float-left">
														<Icon icon={faAlignJustify} />

													</div>

												</span>
                                                <div className="pl-4">
                                                    <Exercise
                                                        num={i}
                                                    />
                                                </div>

                                            </div>
                                        )}
                                    </Draggable>

                                ))}
                                {provided.placeholder}
                            </div>
                            <a href="#void" onClick={(e) => {
                                e.preventDefault();
                                this.props.addExercise()
                            }}>
                                <Icon
                                    icon={faList}
                                    className="pr-1"
                                />
                                Add test / exercise
                            </a>
                        </div>
                    )}
                </Droppable>
                <hr />


            </DragDropContext>
        )
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
    updateExercises: (exercises) => dispatch(updateExercises(exercises)),
    addExercise: () => dispatch(addExercise())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercises);
