import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { editEntry, preDeleteEntry } from '../../../../../../../services/actions'
import { connect } from 'react-redux'
import DownloadElement from '../../../../../../DownloadElement'


// make controlled components

class EditEntry extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            content: '',
            access: ''
        }

    }

    componentDidMount() {
        let { sectionNum, entryNum } = this.props;
        let entry = this.props.courseData.sections[sectionNum].entries[entryNum];
        let entryContent = entry.content;
        if (entry.type === 'text'){
            entryContent = entryContent.text;
        }
        this.setState({
            name: entry.name,
            content: entryContent,
            access: entry.access
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
        let { sectionNum, entryNum } = this.props;
        let { type } = this.props.courseData.sections[sectionNum].entries[entryNum];
        let { name, content, access } = this.state;
        if (type === 'text'){
            content = {
                text: content
            }
        }
        this.props.editEntry(
            {
            	name, 
            	content,
                access
            },
            this.props.sectionNum,
            this.props.entryNum
        )
        this.handleLeave();
    }

    onPreDelete = (event) => {
        event.preventDefault();
        this.props.preDeleteEntry(
            this.props.sectionNum,
            this.props.entryNum
        )
        this.handleLeave();
    }

    handleFileChange = (e) => {
        this.setState({
            content: e.target.files[0]
        })
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, content, access } = this.state;
        /*if (!name){
            return null;
        }*/
        let { sectionNum, entryNum } = this.props;
        let { type, content: oldContent } = this.props.courseData.sections[sectionNum].entries[entryNum];
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

	                {(() => {
                        switch(type) {
                            case 'text':
                                return(
                                    <div className="form-group">
                                        <label className="text-muted">Text</label>
                                        <input
                                            onChange={this.handleChange("content")}
                                            type="text"
                                            className="form-control"
                                            value={content}
                                        />
                                    </div>
                                )
                            case 'file':
                                return (
                                    <div>
                                        {!oldContent.id ? (
                                            <a
                                                href={URL.createObjectURL(oldContent)}
                                                download={oldContent.name}

                                            >
                                                {oldContent.name}
                                            </a>
                                        ) : (
                                            <div>
                                                <label className="text-muted mr-1">Old file:</label>
                                                <DownloadElement
                                                    id={oldContent.id}
                                                    name={oldContent.originalname}
                                                />
                                            </div>
                                        )}
                                        <div className="custom-file mb-2 mt-2">
                                            <label className="text-muted mr-1">Change file:</label>
    
                                            <input 
                                                type="file"
                                                onChange={this.handleFileChange}
                                            />
                                        </div>
                                    </div>
                                )
                            case 'forum':
                                return (
                                    <div>
                                        <p>
                                            Please go to the { }
                                            <Link
                                                to={`/classroom/course/${this.props.courseData._id}/forum/` + 
                                                    `${this.props.courseData.sections[sectionNum].entries[entryNum]._id}
                                                `}
                                                target="_blank"
                                            >
                                               forum page 
                                            </Link>
                                            { } to edit forum content as a teacher there
                                        </p>
                                    </div>
                                )
                        }
                    })()}

                    <div className="form-group">
                        <select 
                            name="type"
                            value={access}
                            onChange={this.handleChange("access")}
                        >
                            <option value="">Choose who has access</option>
                            <option value="teachers">Teachers</option>
                            <option value="students">Students and teachers</option>
                            <option value="me">Only me [not finished yet]</option>
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
                        onClick={this.onPreDelete}
                        type="button"
                    >
                        Delete
                    </button>

                    {(() => {
                        if (type && name){
                            return (
                                <button 
                                    className="btn btn-outline btn-raised btn-success ml-3"
                                    type="submit"
                                >
                                    Save
                                </button>
                            )
                        }
                    })()}

	            </form>
	        </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        editEntry: (entry, sectionNum, entryNum) => dispatch(editEntry(entry, sectionNum, entryNum)),
        preDeleteEntry: (sectionNum, entryNum, type, content) => dispatch(preDeleteEntry(sectionNum, entryNum, type, content))
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
)(withRouter(EditEntry));
