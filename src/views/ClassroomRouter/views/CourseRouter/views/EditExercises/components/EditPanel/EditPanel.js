import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { hideModal, showModal } from '../../../../../../../../components/ModalRoot/services/actions';
import { reorderArray } from "../../../../../../../../components/services/helpers";
import { dndTypes, regExpressions } from '../../services/helpers'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faList } from '@fortawesome/free-solid-svg-icons'
let { EXERCISES } = dndTypes;

class EditPanel extends Component {

    onDragEnd = (result) => {
        /*if (!result.destination) {//may need to be changed
            return;
        }

        if (result.type === SECTIONS) {
            let sections = reorderArray(
                this.props.courseData.sections,
                result.source.index,
                result.destination.index
            );

            this.props.updateSections(sections);
        } else {
            if (result.source.droppableId === result.destination.droppableId){
                let re = regExpressions.sectionDroppableId;
                let id = parseInt(re.exec(result.source.droppableId)[1], 10);

                let entries = reorderArray(
                    this.props.courseData.sections[id].entries,
                    result.source.index,
                    result.destination.index
                );

                let sections = _.cloneDeep(this.props.courseData.sections);
                sections[id].entries = entries;

                this.props.updateSections(sections);
            }
            else{
                let re = regExpressions.sectionDroppableId;
                let indexSource = result.source.index;
                let indexDest = result.destination.index;
                let idSource = parseInt(re.exec(result.source.droppableId)[1], 10);
                let idDest = parseInt(re.exec(result.destination.droppableId)[1], 10);
                let sections = _.cloneDeep(this.props.courseData.sections);
                let entriesSource = _.cloneDeep(sections[idSource].entries);
                let entriesDest = _.cloneDeep(sections[idDest].entries);
                let element = _.cloneDeep(sections[idSource].entries[indexSource]);
                entriesSource.splice(indexSource, 1);
                entriesDest.splice(indexDest, 0, element);
                sections[idSource].entries = entriesSource;
                sections[idDest].entries = entriesDest;

                this.props.updateSections(sections);
            }
        }*/
    }

    render() {
        let { courseData } = this.props;
        let { sections } = courseData;
        if (!sections){
            return null;
        }


        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <p className="ml-3 mt-2"> <Icon icon={faAlignJustify} /> = Move around sections and entries </p>
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
                                {sections.map((section, i) => (
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

                                                    content
                                                </div>

                                            </div>
                                        )}
                                    </Draggable>

                                ))}
                                {provided.placeholder}
                            </div>
                            <div
                                onClick={this.showAddSectionModal}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                <Icon
                                    icon={faList}
                                    className="pr-1"
                                />
                                <a>Add test / exercise</a>
                            </div>
                        </div>
                    )}
                </Droppable>
                <hr />
                <div>
                    {JSON.stringify(courseData)}
                </div>

            </DragDropContext>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        showModal: (component) => dispatch(showModal(component))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPanel);
