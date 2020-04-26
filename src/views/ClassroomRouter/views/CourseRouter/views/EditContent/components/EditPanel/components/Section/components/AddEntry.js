import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { addEntry } from '../../../../../services/actions'
import { connect } from 'react-redux'


// make controlled components

class AddEntry extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            type: '',
            content: null,
            teachersOnly: false
        }

    }

    handleTeachersOnly = () => {
        this.setState({
            teachersOnly: !this.state.teachersOnly
        })
    }

    handleChange = (name) => (event) => {
        if (name === 'type'){
            this.setState({
                content: null,
                teachersOnly: false
            })
        }

        this.setState({
            [name]: event.target.value
        })
    }

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { name, type, content } = this.state;
        if (type === 'text'){
            content = {
                text: content
            }
        }
        if (type === 'forum'){
            content = {
                description: content,
                teachersOnly: this.state.teachersOnly
            }
        }
        this.props.addEntry(
            {
            	name, 
            	type,
                content
            },
            this.props.sectionNum
        )
        this.handleLeave();
    }

    componentWillUnmount(){
        this.handleLeave();
    }

    handleFileChange = (e) => {
        this.setState({
            content: e.target.files[0]
        })
    }


    render() {
        let { name, type, content, teachersOnly } = this.state;
        return (
        	<div className="p-4">
	            <form onSubmit={this.onSubmit}>
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

                    {(() => {
                        switch(type) {
                            case 'text':
                                return(
                                    <div className="form-group">
                                        <label className="text-muted">Content</label>
                                        <input
                                            onChange={this.handleChange("content")}
                                            type="text"
                                            className="form-control"
                                            value={content || ''}
                                        />
                                    </div>
                                )
                            case 'file':
                                return (
                                    <div className="custom-file mb-3">
                                        <input 
                                            type="file"
                                            onChange={this.handleFileChange}
                                        />
                                    </div>
                                )
                            case 'forum': {
                                return (
                                    <div>
                                        <div className="form-group">
                                            <label className="text-muted">Description</label>
                                            <input
                                                onChange={this.handleChange("content")}
                                                type="text"
                                                className="form-control"
                                                value={content || ''}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-muted">Only for teachers</label>
                                            <input
                                                type="checkbox"
                                                onClick={this.handleTeachersOnly}
                                                className="ml-3"
                                                checked={teachersOnly}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })()}
	  

	                <button 
	                    className="btn btn-outline btn-raised"
	                    onClick={this.handleLeave}
                        type="button"
	                >
	                    Cancel
	                </button>
	                <button 
	                    className="btn btn-outline btn-raised btn-success ml-3"
	                    type="submit"
	                >
	                    Add
	                </button>
	            </form>
	        </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addEntry: (entry, sectionNum) => dispatch(addEntry(entry, sectionNum))
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editContent
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddEntry));
