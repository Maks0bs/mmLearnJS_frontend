import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Entry from './components/EditContentEntry'
import { connect } from 'react-redux'
import { dndTypes } from '../../../../services/helpers'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    hideModal, showModal
} from '../../../../../../../../../../components/ModalRoot/services/actions';
import { deleteSection, restoreDeletedSection } from '../../../../services/actions'
import { faArrowsAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddEntry from './components/AddEntry'
import PropTypes from 'prop-types'
import EditSymbol from "../../../../../../../../../../components/reusables/EditSymbol";
import SectionEditor from "../../../SectionEditor";
let { ENTRIES } = dndTypes;

/**
 * This is component displays all the data about the given section
 * and allows the teacher to edit the section and entries inside it
 * @memberOf components.views.classroom.course.EditContent
 * @component
 */
class EditContentSection extends Component {
    showAddEntryModal = (e) => {
        e.preventDefault();
        this.props.showModal(
            <AddEntry onClose={this.props.hideModal} sectionNum={this.props.sectionNum}/>
        )
    }

    showEditSectionModal = () => {
        this.props.showModal(
            <SectionEditor onClose={this.props.hideModal} sectionNum={this.props.sectionNum}/>
        )
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteSection(this.props.sectionNum)
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedSection(this.props.sectionNum)
    }

    render(){
        let { sectionNum, newSections } = this.props;
        let { name, description, entries, deleted} = newSections[sectionNum];
        if (deleted){
            return (
                <div>
                    <p> Deleted section <strong> {name} </strong> </p>
                    <a href="#void" onClick={this.onRestore}>
                        Restore 
                    </a>
                    <a
                        href="#void"
                        className="ml-2"
                        style={{color: 'red'}}
                        onClick={this.onDelete}
                    > 
                        Do not show anymore
                    </a>
                </div>
            )
        }
        return (
            <div className="pl-4">
                <EditSymbol onClick={this.showEditSectionModal} className="float-right m-1"/>
                <h3>{name}</h3>
                <p>{description}</p>
                <Droppable droppableId={`section${sectionNum}`} type={ENTRIES}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{
                                padding: '4px', borderRadius: '5px',
                                background: snapshot.isDraggingOver ? '#7ac0cc' : ''
                            }}
                        >
                            {Array.isArray(entries) && entries.map((entry, i) => (
                                <Draggable
                                    key={`section${sectionNum}entry${i}`}
                                    draggableId={`section${sectionNum}entry${i}`}
                                    index={i}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{
                                                userSelect: 'none', borderRadius: '5px',
                                                padding: '5px', margin: '5px',
                                                background: snapshot.isDragging ?
                                                    '#878787' : '#bababa',
                                                ...provided.draggableProps.style
                                            }}
                                        >
                                            <span
                                                className="float-left m-1"
                                                {...provided.dragHandleProps}
                                            >
                                                <Icon icon={faArrowsAlt}/>
                                            </span>

                                            <Entry sectionNum={sectionNum} entryNum={i}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <a href="#void" onClick={this.showAddEntryModal}>
                    <Icon icon={faPlus} className="pr-1"/>
                    Add entry
                </a>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editContent
})
let mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (component) => dispatch(showModal(component)),
    deleteSection: (sectionNum) => dispatch(deleteSection(sectionNum)),
    restoreDeletedSection: (sectionNum) => dispatch(restoreDeletedSection(sectionNum))
})
EditContentSection.propTypes = {
    sectionNum: PropTypes.number.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContentSection);
