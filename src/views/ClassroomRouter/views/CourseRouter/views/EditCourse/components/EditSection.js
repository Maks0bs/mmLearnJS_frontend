import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { editSection, deleteSection } from '../services/actions'
import { connect } from 'react-redux'


// make controlled components

class EditSection extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: ''
        }

    }

    componentDidMount() {
        let { sectionNum } = this.props;
        let section = this.props.courseData.sections[sectionNum];
        this.setState({
            name: section.name,
            description: section.description
        })
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { name, description } = this.state;
        this.props.editSection(
            {
            	name, 
            	description
            },
            this.props.sectionNum
        )
        this.handleLeave();
    }

    onDelete = (event) => {
        event.preventDefault();
        this.props.deleteSection(
            this.props.sectionNum
        )
        this.handleLeave();
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, description } = this.state;
        return (
        	<div className="container">
	            <form  onSubmit={this.onSubmit}>
	                <div className="form-group">
	                    <label className="text-muted">Name</label>
	                    <input
	                        onChange={this.handleChange("name")}
	                        type="text"
	                        className="form-control"
	                        value={name}
	                    />
	                </div>

	                <div className="form-group">
                        <label className="text-muted">Description</label>
                        <input
                            onChange={this.handleChange("description")}
                            type="text"
                            className="form-control"
                            value={description}
                        />
                    </div>
	  

	                <button 
	                    className="btn btn-outline btn-raised"
	                    onClick={this.handleLeave}
                        type="button"
	                >
	                    Cancel
	                </button>
                    <button 
                        className="btn btn-outline btn-raised btn-danger ml-3"
                        onClick={this.onDelete}
                        type="button"
                    >
                        Delete
                    </button>
	                <button 
	                    className="btn btn-outline btn-raised btn-success ml-3"
                        type="submit"
	                >
	                    Save
	                </button>
	            </form>
	        </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        editSection: (section, sectionNum) => dispatch(editSection(section, sectionNum)),
        deleteSection: (sectionNum) => dispatch(deleteSection(sectionNum))
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.edit
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EditSection));
