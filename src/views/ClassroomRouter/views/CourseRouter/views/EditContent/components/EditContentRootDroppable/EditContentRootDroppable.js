import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faAlignJustify, faPlus} from "@fortawesome/free-solid-svg-icons";
import Section from "./components/Section";
import {Draggable} from "react-beautiful-dnd";
import PropTypes from 'prop-types'
import {hideModal, showModal}
from "../../../../../../../../components/ModalRoot/services/actions";
import {connect} from "react-redux";
import AddSection from "./components/AddSection";

/**
 * This droppable allows to change the position
 * of sections of the course. It contains other components
 * that allow more detailed course editing
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class EditContentRootDroppable extends Component {

    showAddSectionModal = (e) => {
        e.preventDefault();
        this.props.showModal(
            <AddSection onClose={this.props.hideModal} />
        )
    }

    render() {
        let { newSections: sections, provided, snapshot, course } = this.props;
        if (!sections){
            return (
                <div className="alert alert-danger m-5">
                    Error loading course data. Please try reloading the page
                </div>
            )
        }
        return (
            <div
                ref={provided.innerRef}
                style={{
                    background: snapshot.isDraggingOver ? "lightblue" : "",
                    padding: '10px'
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
                                    <span
                                        className="float-left"
                                        {...provided.dragHandleProps}
                                    >
                                        <Icon icon={faAlignJustify} />
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
                    <Icon icon={faPlus} className="pr-1"/>
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
    hideModal: () => dispatch(hideModal()),
    showModal: (component) => dispatch(showModal(component))
})
EditContentRootDroppable.propTypes = {
    /**
     * See {@link Droppable}
     */
    provided: PropTypes.any.isRequired,
    /**
     * See {@link Droppable}
     */
    snapshot: PropTypes.any.isRequired,
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContentRootDroppable);