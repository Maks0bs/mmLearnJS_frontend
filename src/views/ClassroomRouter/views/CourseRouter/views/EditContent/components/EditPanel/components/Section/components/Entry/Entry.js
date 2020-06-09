import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../../../../../../components/ModalRoot/services/actions';
import { faAlignJustify, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import EditEntry from './components/EditEntry'
import DownloadElement from '../../../../../DownloadElement'
import { Link } from 'react-router-dom'

class Entry extends Component {

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

	render() {
		let { name, type, content, id, courseId } = this.props;
		//switch type
		console.log('entry props', this.props);	
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
        showModal: (component) => dispatch(showModal(component))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Entry);