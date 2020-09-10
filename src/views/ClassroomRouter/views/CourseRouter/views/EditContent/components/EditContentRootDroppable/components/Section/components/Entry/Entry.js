import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../../../../components/ModalRoot/services/actions';
import { faAlignJustify, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import EditEntry from './components/EditEntry'
import DownloadElement from '../../../../../../../../../../components/reusables/DownloadElement'
import { Link } from 'react-router-dom'
import { deleteEntry, restoreDeletedEntry } from '../../../../services/actions'

class Entry extends Component {

	showEditEntryModal = (e) => {
        e.preventDefault();
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
        this.props.deleteEntry(
            this.props.sectionId,
            this.props.entryId
        )
    }

    onRestore = (e) => {
        e.preventDefault();
        this.props.restoreDeletedEntry(
            this.props.sectionId,
            this.props.entryId
        )
    }

	render() {
		let { name, type, content, id, courseId } = this.props;
		//switch type
		if (type === 'deleted'){
            return (
                <div>
                    <p> Deleted entry <strong> {name} </strong> </p>
                    <a
                        href="#void"
                        style={{color: 'lightblue'}}
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
					onClick={this.showEditEntryModal}
					className="float-right m-1"
					style={{
						cursor: 'pointer'
					}}
				/>
				<h4>{name}</h4>
                {(() => {
                    if (!id){
                        return <p style={{color: 'green'}}> new </p>
                    } else return null
                })()}
				<p>Type: {type}</p>
				{(() => {
                    switch(type) {
                        case 'text':
                            return(
                                <div>
                                    {content.text}
                                </div>
                            )
                        case 'file':
                        	if (!content.id){
                        		return(
	                        		<a
										href={URL.createObjectURL(content)}
										download={content.name}
                                        style={{
                                            color: 'lightblue'
                                        }}
									>
										File: {content.name}
									</a>
	                        	)
                        	}
                        	else{
                        		return (
                                    <DownloadElement
                                        id={content.id}
                                        name={content.originalname}
                                    />
                                )
                        	}
                        case 'forum': 
                            if (content._id){
                                return (
                                    <Link
                                        style={{
                                            color: 'lightblue'
                                        }}
                                        to={`/classroom/course/${courseId}/forum/${id}`}
                                        target="_blank"
                                >
                                    Forum: {name}
                                </Link>
                                )
                            }
                            else{
                                return (
                                    <div>
                                        New forum (will be added){name}
                                    </div>
                                )
                            }
                    }
                })()}
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
        showModal: (component) => dispatch(showModal(component)),
        deleteEntry: (sectionNum, entryNum) => 
            dispatch(deleteEntry(sectionNum, entryNum)),
        restoreDeletedEntry: (sectionNum, entryNum) => 
            dispatch(restoreDeletedEntry(sectionNum, entryNum))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Entry);