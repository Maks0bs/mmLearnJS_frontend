import React, { Component } from 'react';
import { addEntry } from '../../../../../services/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AddEntry extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '', content: null,
            // Is relevant only for forum type
            teachersOnlyForum: false,
            type: '', access: 'students'
        }
    }

    handleTeachersOnlyForum = () => {
        this.setState({
            teachersOnlyForum: !this.state.teachersOnlyForum
        })
    }

    handleChange = (name) => (event) => {
        if (name === 'type'){
            // cleanup of forum data if user changes the type of entry
            this.setState({content: null, teachersOnlyForum: false})
        }
        this.setState({
            [name]: event.target.value
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    onSubmit = (event) => {
        event.preventDefault();
        let { name, type, content, access } = this.state;
        // Adjust the content to correspond to the according API model
        if (type === 'text'){
            content = { text: content }
        }
        if (type === 'forum'){
            content = {
                description: content,
                teachersOnly: this.state.teachersOnlyForum
            }
        }
        this.props.addEntry(
            {name, type, content, access},
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
        let { name, type, content, teachersOnlyForum, access } = this.state;
        let inlineStyle = { display: 'flex', alignItems: 'center' }
        return (
        	<div className="container my-5">
	            <form onSubmit={this.onSubmit}>
	                <div className="form-group" style={inlineStyle}>
	                    <label className="text-muted my-0 mx-2">Name</label>
	                    <input
	                        onChange={this.handleChange("name")}
	                        type="text"
	                        className="form-control"
	                        value={name}
	                    />
	                </div>
	                <div className="form-group" style={inlineStyle}>
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
                                    <div className="form-group" style={inlineStyle}>
                                        <label className="text-muted my-0 mx-2">Content</label>
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
                                    <div className="custom-file mb-3" style={inlineStyle}>
                                        <input type="file" onChange={this.handleFileChange}/>
                                    </div>
                                )
                            case 'forum': {
                                return (
                                    <div>
                                        <div className="form-group" style={inlineStyle}>
                                            <label className="text-muted my-0 mx-2">
                                                Description
                                            </label>
                                            <input
                                                onChange={this.handleChange("content")}
                                                type="text"
                                                className="form-control"
                                                value={content || ''}
                                            />
                                        </div>
                                        <div className="form-group" style={inlineStyle}>
                                            <label
                                                className="text-muted my-0 mx-2"
                                                htmlFor="addEntryTeachersOnlyForum"
                                            >
                                                Only teachers can post
                                            </label>
                                            <input
                                                id="addEntryTeachersOnlyForum"
                                                type="checkbox"
                                                onChange={this.handleTeachersOnlyForum}
                                                className="ml-3"
                                                checked={teachersOnlyForum}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })()}
                    <div className="form-group" style={inlineStyle}>
                        <label className="text-muted my-0 mx-2">Choose who has access:</label>
                        <select 
                            name="access"
                            value={access}
                            onChange={this.handleChange("access")}
                        >
                            <option value="students">Students and teachers</option>
                            <option value="teachers">Teachers</option>
                        </select>
                    </div>
	                <button 
	                    className="btn btn-outline btn-raised"
	                    onClick={this.handleLeave}
                        type="button"
	                >
	                    Cancel
	                </button>
                    {type && name && access && content && (
                        <button className="btn btn-raised btn-success ml-3" type="submit">
                            Add
                        </button>
                    )}
	            </form>
	        </div>
        );
    }
}
let mapDispatchToProps = (dispatch) => ({
    addEntry: (entry, sectionNum) => dispatch(addEntry(entry, sectionNum))
})
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.editContent
})
AddEntry.propTypes = {
    sectionNum: PropTypes.number.isRequired,
    /**
     * The action that should be performed if this component
     * is inside a modal and it gets closed
     */
    onClose: PropTypes.func
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEntry);
