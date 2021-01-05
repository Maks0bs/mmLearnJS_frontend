import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    hideModal, showModal
} from '../../../../../../../../../components/ModalRoot/services/actions';
import DownloadElement from '../../../../../../../../../components/reusables/DownloadElement'
import { Link } from 'react-router-dom'
import { deleteEntry, restoreDeletedEntry } from '../../../services/actions'
import EditSymbol from "../../../../../../../../../components/reusables/EditSymbol";
import PropTypes from "prop-types";
import EntryEditor from "../../EntryEditor/EntryEditor";

/**
 * This component displays the edited entry data
 * and allows teachers to edit the given entry
 * @memberOf components.views.classroom.course.EditContent.EditContentRoot.EditContentSection
 * @component
 */
class EditContentEntry extends Component {

	showEditEntryModal = () => {
        this.props.showModal(
            <EntryEditor
                onClose={this.props.hideModal}
                sectionNum={this.props.sectionNum}
                entryNum={this.props.entryNum}
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
	    console.log('ns', newSections);
		let { name, kind: originalKind, content, _id } = newSections[sectionNum].entries[entryNum];
		let kind = originalKind.slice(5);// remove the 'Entry' part of the kind
		if (originalKind === 'deleted'){
            return (
                <div className="pl-4">
                    <p> Deleted entry <strong> {name} </strong> </p>
                    <a href="#void" onClick={this.onRestore}>
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
                <EditSymbol
                    onClick={this.showEditEntryModal}
                    className="float-right m-1"
                    type="edit"
                />
                <h4>
                    {kind}
                    <strong> {name}</strong>
                    {!_id && (<span style={{color: '#9759c9'}}> newly added </span>)}
                </h4>
				{(() => {
                    switch(kind) {
                        case 'Text':
                            return(<div>{content.text}</div>)
                        case 'File':
                            if (!content.file) return null;
                            // newly uploaded file (still local)
                        	if (!_id || content.fileIsNew){
                        		return(
	                        		<a
                                        href={URL.createObjectURL(content.file)}
                                        download={content.fileName}

                                    >
										{content.fileName}
									</a>
	                        	)
                        	}
                        	// file already on server
                        	else{
                        		return (
                                    <DownloadElement
                                        id={content.file}
                                        name={content.fileName}
                                        linkText={content.fileName}
                                    />
                                )
                        	}
                        case 'Forum':
                            // forum already on server
                            if (content && content._id){
                                return (
                                    <Link
                                        to={
                                            `/classroom/course/${this.props.course._id}` +
                                            `/forum/${content._id}`
                                        }
                                        target="_blank"
                                    >
                                        {name}
                                    </Link>
                                )
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