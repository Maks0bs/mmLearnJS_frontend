import React, {Component} from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faArrowsAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import Section from "./components/EditContentSection";
import {Draggable} from "react-beautiful-dnd";
import PropTypes from 'prop-types'
import {
    hideModal, showModal
} from "../../../../../../../../components/ModalRoot/services/actions";
import {connect} from "react-redux";
import SectionEditor from "../SectionEditor";

/**
 * This droppable allows to change the position
 * of sections of the course. It contains other components
 * that allow more detailed course editing
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class EditContentRoot extends Component {

    showAddSectionModal = (e) => {
        e.preventDefault();
        this.props.showModal(
            <SectionEditor onClose={this.props.hideModal} addNew/>
        )
    }

    render() {
        let { newSections: sections, provided, snapshot } = this.props;
        if (!sections){
            return (
                <div className="alert alert-danger m-5" ref={provided.innerRef}>
                    Error loading course data. Please try reloading the page
                </div>
            )
        }
        return (
            <div
                ref={provided.innerRef}
                style={{
                    background: snapshot.isDraggingOver ? "lightblue" : "",
                    padding: '10px',
                    borderRadius: '5px'
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
                                        padding: '10px',
                                        userSelect: 'none',
                                        margin: '5px',
                                        background: snapshot.isDragging ?
                                            '#bababa' : '#dbdbdb',
                                        borderRadius: '5px',
                                        ...provided.draggableProps.style
                                    }}
                                >
                                    <span
                                        className="float-left"
                                        {...provided.dragHandleProps}
                                    >
                                        <Icon icon={faArrowsAlt} />
                                    </span>

                                    <Section key={`section${i}`} sectionNum={i}/>

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
    ...state.views.classroom.course.editContent.services
})
let mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (component) => dispatch(showModal(component))
})
EditContentRoot.propTypes = {
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
)(EditContentRoot);