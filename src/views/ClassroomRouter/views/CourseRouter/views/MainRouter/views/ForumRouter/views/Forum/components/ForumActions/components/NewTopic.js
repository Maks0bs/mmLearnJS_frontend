import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { createTopic } from '../../../../../services/actions'
import { connect } from 'react-redux'


// make controlled components

class NewTopic extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            content: '',
            reload: false
        }

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
        let { name, content } = this.state;
        this.props.createTopic(
            this.props.courseData._id,
            this.props.forumData._id,
            {
                name: name, 
                initContent: content
            }
        )
        .then(() => {
            this.setState({
                reload: true
            })
            //this.handleLeave();
        })
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, content, reload } = this.state;

        if (reload){
            this.handleLeave();
            this.setState({
                reload: false
            })
            return (
                <Redirect
                    to={this.props.location.pathname}
                />
            );
        }

        return (
        	<div className="container">
	            <form>
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
	                    <label className="text-muted">Content</label>
	                    <input
	                        onChange={this.handleChange("content")}
	                        type="text"
	                        className="form-control"
	                        value={content}
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
	                    className="btn btn-outline btn-raised btn-success ml-3"
	                    onClick={this.onSubmit}
	                >
	                    Create
	                </button>
	            </form>
	        </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        createTopic: (courseId, forumId, content) => dispatch(createTopic(courseId, forumId, content))
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.forum,
        ...state.views.classroom.course.main.services
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(NewTopic));
