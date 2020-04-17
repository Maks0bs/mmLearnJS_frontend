import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { editEntry, deleteEntry } from '../../../../../../../services/actions'
import { connect } from 'react-redux'


// make controlled components

class EditEntry extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            type: ''
        }

    }

    componentDidMount() {
        let { sectionNum, entryNum } = this.props;
        let entry = this.props.courseData.sections[sectionNum].entries[entryNum];
        this.setState({
            name: entry.name,
            type: entry.type
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
        let { name, type } = this.state;
        this.props.editEntry(
            {
            	name, 
            	type
            },
            this.props.sectionNum,
            this.props.entryNum
        )
        this.handleLeave();
    }

    onDelete = (event) => {
        event.preventDefault();
        this.props.deleteEntry(
            this.props.sectionNum,
            this.props.entryNum,
            this.props.type,
            this.props.content
        )
        this.handleLeave();
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, type } = this.state;
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
                        <select 
                            name="type"
                            value={type}
                            onChange={this.handleChange("type")}
                        >
                            <option value="">Choose entry type</option>
                            <option value="file">File</option>
                            <option value="forum">Forum</option>
                            <option value="text">Text</option>
                        </select>
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
        editEntry: (entry, sectionNum, entryNum) => dispatch(editEntry(entry, sectionNum, entryNum)),
        deleteEntry: (sectionNum, entryNum, type, content) => dispatch(deleteEntry(sectionNum, entryNum, type, content))
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
)(withRouter(EditEntry));
