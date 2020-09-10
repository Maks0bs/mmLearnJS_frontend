import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faAlignJustify, faPlus} from "@fortawesome/free-solid-svg-icons";
import Section from "../Section";
import {Draggable} from "react-beautiful-dnd";
import {updateSections} from "../../services/actions";
import {hideModal, showModal} from "../../../../../../../../components/ModalRoot/services/actions";
import {connect} from "react-redux";

class EditCourseRootDroppable extends Component {
    render() {
        let { course } = this.props;
        let { sections } = course;
        if (!sections){
            return (
                <div className="alert alert-danger m-5">
                    Error loading sections. Please reload the page
                </div>
            )
        }
        return (
            <div
                ref={provided.innerRef}
                style={{
                    background: snapshot.isDraggingOver ? "lightblue" : "",
                    padding: '10px 0px 10px 10px'
                }}
            >
                <div className="column" >
                    {sections.map((section, i) => (
                        <Draggable
                            key={`section${i}`}
                            draggableId={`section${i}`}
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

                                        <Section
                                            key={`section${i}`}
                                            name={section.name}
                                            description={section.description}
                                            entries={section.entries}
                                            sectionId={i}
                                            courseId={course._id}
                                            deleted={section.deleted}
                                        />
                                    </div>

                                </div>
                            )}
                        </Draggable>

                    ))}
                    {provided.placeholder}
                </div>

                <a href="#void" onClick={this.showAddSectionModal}>
                    <Icon
                        icon={faPlus}
                        className="pr-1"
                    />
                    Add section
                </a>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services,
    ...state.views.classroom.course.editContent
})
let mapDispatchToProps = (dispatch) => ({
    updateSections: (sections) => dispatch(updateSections(sections)),
    hideModal: () => dispatch(hideModal()),
    showModal: (component) => dispatch(showModal(component))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCourseRootDroppable);