import React, {Component} from 'react';
import UserPreview from "../../../../../../../../../components/reusables/UserPreview";
import PropTypes from "prop-types";

/**
 * This component displays one forum post and possible action for this post
 * @memberOf components.views.classroom.course.forum.Topic
 * @component
 */
class TopicPost extends Component {
    constructor(props) {
        super(props);
        this.state = { replyText: ''}
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    onDeletePost = (e) => {
        e.preventDefault();
        this.props.onDeletePost(this.props.postId)
            .then(() => this.setState({replyText: ''}))
    }

    onSubmitAnswer = (e) => {
        e.preventDefault();
        this.props.onSubmitAnswer(this.props.postId, this.state.replyText)
            .then(() => this.setState({replyText: ''}))
    }

    handleReplyClick = (e) => {
        e.preventDefault();
        this.props.handleReplyClick(this.props.postNum);
    }

    render() {
        let {
            depth, creator, content, canDelete,
            canReply, hasAnswers, replying
        } = this.props;
        depth = depth || 0;
        return (
            <div>
                <div
                    style={{
                        marginTop: '5px', marginBottom: '5px',
                        paddingLeft: '5px', paddingRight: '5px',
                        paddingBottom: '20px', paddingTop: '5px',
                        marginLeft: `${10 + 30 * depth}px`,
                        borderStyle: 'solid', borderRadius: '5px',
                        display: 'grid'
                    }}
                >
                    <div>
                        <h5>
                            <UserPreview {...creator}/>
                        </h5>
                        <p>
                            {content}
                        </p>
                    </div>
                    <div>
                        <div
                            className="float-right"
                        >
                            {canDelete && (
                                <a
                                    style={{color: 'red'}}
                                    href="#void"
                                    onClick={this.onDeletePost}
                                >
                                    Delete post {hasAnswers && ' tree'}
                                </a>
                            )}
                            {canReply && (
                                <a
                                    href="#void"
                                    className="mx-3"
                                    onClick={this.handleReplyClick}
                                >
                                    Answer
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                {replying && (
                    <form
                        style={{
                            marginLeft: `${30 * depth + 15}px`,
                            marginTop: '5px', marginBottom: '5px',
                            padding: '10px',
                            borderColor: 'blue',
                            borderStyle: 'solid', borderRadius: '5px'
                        }}
                        onSubmit={this.onSubmitAnswer}
                    >
                        <div className="form-group">
                            <label className="text-muted">Response</label>
                            <textarea
                                onChange={this.handleChange("replyText")}
                                className="form-control"
                                style={{
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderColor: 'gray'
                                }}
                                value={this.state.replyText}
                            />
                        </div>
                        <button
                            className="btn btn-raised btn-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        );
    }
}
TopicPost.propTypes = {
    /** ID of post from the api (_id) */
    postId: PropTypes.number.isRequired,
    /**
     * number of the post in relative order in relation to the whole
     * list of posts in given topic
     */
    postNum: PropTypes.number.isRequired,
    /** specifies how deep is the given post in the answer tree */
    depth: PropTypes.number,
    creator: PropTypes.object,
    /** The actual message in the post */
    content: PropTypes.string,
    /** True if the active user can delete the given post */
    canDelete: PropTypes.bool,
    /** True if the active user can write an answer to the given post */
    canReply: PropTypes.bool,
    hasAnswers: PropTypes.bool,
    onDeletePost: PropTypes.func,
    onSubmitAnswer: PropTypes.func,
    /**
     * The action that should be performed, when the user clicks the
     * 'answer' button and therefore wishes to write a reply to given post
     */
    handleReplyClick: PropTypes.func
}
export default TopicPost;