import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    hideModal, showModal
} from '../../../../../../../../../../../../components/ModalRoot/services/actions';
import EditEntry from './components/EditEntry'
import DownloadElement from '../../../../../../../../../../../../components/reusables/DownloadElement'
import { Link } from 'react-router-dom'
import { deleteEntry, restoreDeletedEntry } from '../../../../../../services/actions'
import EditSymbol from "../../../../../../../../../../../../components/reusables/EditSymbol";
import PropTypes from "prop-types";

/**
 * This component displays the edited entry data
 * and allows teachers to edit the given entry
 * @memberOf components.views.classroom.course.EditContent.EditContentRoot.EditContentSection
 * @component
 */
class EditContentEntry extends Component {

	showEditEntryModal = () => {
        this.props.showModal(
            <EditEntry 
                onClose={this.props.hideModal} 
                sectionNum={this.props.sectionId}
                entryNum={this.props.entryId}
                type={this.props.type}
                content={this.props.content}
            />
        )
    }

    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteEntry(this.props.sectionNum, this.props.entryNum)
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedEntry(this.props.sectionNum, this.props.entryNum)
    }

	render() {
	    let { sectionNum, entryNum, newSections } = this.props;
		let { name, type, content, _id } = newSections[sectionNum].entries[entryNum];
		type = type.charAt(0).toUpperCase() + type.slice(1); // capitalize first letter of type
		if (type === 'deleted'){
            return (
                <div className="pl-4">
                    <p> Deleted entry <strong> {name} </strong> </p>
                    <a href="#void" style={{color: 'lightblue'}} onClick={this.onRestore}>
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
			<div className="pl-4">
                <EditSymbol onClick={this.showEditEntryModal} className="float-right m-1"/>
                <h4>{type} <strong>{name}</strong></h4>
                {!_id && (<p style={{color: '#9759c9'}}> newly added </p>)}
				{(() => {
                    switch(type) {
                        case 'Text':
                            return(<div>{content.text}</div>)
                        case 'File':
                            // File already on server
                        	if (!content.id){
                        		return(
	                        		<a href={URL.createObjectURL(content)} download={content.name}>
										{content.name}
									</a>
	                        	)
                        	}
                        	// newly uploaded file
                        	else{
                        		return (
                                    <DownloadElement
                                        id={content.id}
                                        name={content.originalname}
                                        linkText={`${content.originalname}`}
                                    />
                                )
                        	}
                        case 'Forum':
                            // forum already on server
                            if (content._id){
                                return (
                                    <Link
                                        to={`/classroom/course/${this.props.course._id}/forum/${_id}`}
                                        target="_blank"
                                    >
                                        {name}
                                    </Link>
                                )
                            }
                            // newly created forum without _id
                            else{
                                return (<div>New forum (will be added) {name}</div>)
                            }
                    }
                })()}
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.services,
    ...state.views.classroom.course.editContent.services
})
let mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (component) => dispatch(showModal(component)),
    deleteEntry: (sectionNum, entryNum) => dispatch(deleteEntry(sectionNum, entryNum)),
    restoreDeletedEntry: (sectionNum, entryNum) =>
        dispatch(restoreDeletedEntry(sectionNum, entryNum))
})
EditContentEntry.propTypes = {
    sectionNum: PropTypes.number.isRequired,
    entryNum: PropTypes.number.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContentEntry);