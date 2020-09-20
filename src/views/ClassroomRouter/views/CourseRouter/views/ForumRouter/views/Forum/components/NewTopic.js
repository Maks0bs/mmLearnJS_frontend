import React, { Component } from 'react'
import { createTopic, getForumById } from '../../../services/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {addToast} from "../../../../../../../../../components/ToastRoot/services/actions";
import BigLoadingAbsolute from "../../../../../../../../../components/reusables/BigLoadingAbsolute";

/**
 * Displays all relevant info about a forum (topics and actions)
 * @memberOf components.views.classroom.course.forum.Forum
 * @component
 */
class NewTopic extends Component {
    constructor(props){
        super(props);
        this.state = { name: '', content: '', loading: false}
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    onSubmit = (event) => {
        event.preventDefault();
        let { name, content } = this.state;
        this.setState({loading: true})
        this.props.createTopic(
            this.props.course._id,
            this.props.forum._id,
            { name: name, initContent: content }
        )
            .then(() => {
                this.setState({loading: false})
                if (!this.props.error){
                    this.props.addToast(
                        (<div>New topic created</div>),
                        {type: 'info'}
                    )
                    this.handleLeave();
                    this.props.getForumById(
                        this.props.course._id,
                        this.props.forum._id
                    )
                }
                else{
                    return this.props.addToast(
                        (<div>{this.props.error || 'error'}</div>),
                        {type: 'error'}
                    )
                }
            })
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, content, loading } = this.state;
        let inlineStyle = {display: 'flex', alignItems: 'center'}
        return (
        	<div className="container my-3">
                <h1>Create new topic</h1>
                {loading && (<BigLoadingAbsolute />)}
	            <form>
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
	                    <label className="text-muted my-0 mx-2">Content of first post</label>
	                    <textarea
	                        onChange={this.handleChange("content")}
                            style={{
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: 'gray'
                            }}
	                        className="form-control"
	                        value={content}
	                    />
	                </div>
	                <button 
	                    className="btn btn-raised"
	                    onClick={this.handleLeave}
                        type="button"
	                >
	                    Cancel
	                </button>
	                <button 
	                    className="btn btn-raised btn-success ml-3"
	                    onClick={this.onSubmit}
	                >
	                    Create
	                </button>
	            </form>
	        </div>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.forum,
    course: state.views.classroom.course.services.course
})
NewTopic.propTypes = {
    /**
     * The action that should be performed if this component
     * is in a modal and this modal gets closed
     */
    onClose: PropTypes.func,
}
let mapDispatchToProps = (dispatch) => ({
    createTopic: (courseId, forumId, content) =>
        dispatch(createTopic(courseId, forumId, content)),
    getForumById: (courseId, forumId) => dispatch(getForumById(courseId, forumId)),
    addToast: (component, options) => dispatch(addToast(component, options)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewTopic);