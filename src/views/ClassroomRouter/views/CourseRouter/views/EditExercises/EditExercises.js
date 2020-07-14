import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import EditPanel from './components/EditPanel'

class EditExercises extends Component {
    constructor() {
        super();

        this.state = {
            showEditPanel: false
        }
    }

    componentDidMount(){
        let courseId = this.props.match.params.courseId;
        this.props.getCourseById(courseId)
            .then(() => {
                if (!this.props.error){
                    this.setState({
                        showEditPanel: true
                    })
                } else {
                    //TODO show toast and maybe reload page or do smth similar
                }

            })
    }

    render() {
        let { authenticatedUser: user } = this.props;
        if (!(user && user._id && user.role === 'teacher')){
            return (
                <div>
                    you are not a teacher, no access to editing tests
                </div>
            )
        }
        if (this.state.showEditPanel){
            return (
                <div>
                    <EditPanel />
                    {/*<EditActions />*/}
                </div>
            );
        }
        else{
            return null;
        }
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises,
        authenticatedUser: state.services.authenticatedUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getCourseById: (courseId) => dispatch(getCourseById(courseId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercises);
