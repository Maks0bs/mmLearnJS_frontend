import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { hideModal, showModal } from '../../../../../../../components/ModalRoot/services/actions';
import { faAlignJustify, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import EditEntry from './EditEntry'

class Entry extends Component {

	showEditEntryModal = () => {
        this.props.showModal(
            <EditEntry 
                onClose={this.props.hideModal} 
                sectionNum={this.props.sectionId}
                entryNum={this.props.entryId}
            />
        )
    }

	render() {
		let { name, type } = this.props;
		//switch type
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
				<p>{type}</p>

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