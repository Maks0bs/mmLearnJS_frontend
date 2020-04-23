import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../../../../../../components/ModalRoot/services/actions';
import { faAlignJustify, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import EditEntry from './components/EditEntry'
import { getFileById } from '../../../../../../services/actions'
import DownloadElement from '../../../../../DownloadElement'

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
		let { name, type, content } = this.props;
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
                                    {content}
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
										{content.name}
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
        getFileById: (fileId, ref) => dispatch(getFileById(fileId, ref))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Entry);