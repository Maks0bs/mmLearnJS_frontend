import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import { addNavItem, removeNavItem } from "../../../../../../services/routing/actions";
import EditPanel from './components/EditPanel'
import EditActions from "./components/EditActions";
import { addToast } from "../../../../../../components/ToastRoot/services/actions";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";

class EditExercises extends Component {
    constructor() {
        super();

        this.state = {
            showEditPanel: false
        }
    }

    componentWillUnmount() {
        this.props.removeNavItem('course link');
    }

    componentDidMount(){
        let courseId = this.props.match.params.courseId;
        this.props.getCourseById(courseId)
            .then(() => {
                if (!this.props.error){
                    this.props.addNavItem({
                        id: 'course link',
                        name: 'Course "' + this.props.courseData.name + '"',
                        path: `/classroom/course/${this.props.courseData._id}`
                    })
                    this.setState({
                        showEditPanel: true
                    })
                } else {
                    this.props.addToast(
                        (
                            <div>
                                {`Problem with loading course exercises. Please reload page`}
                            </div>
                        ),
                        {
                            type: 'error'
                        }
                    )
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
                <div className="container">
                    <EditPanel />
                    <div className="mt-2">
                        <EditActions />
                    </div>
                </div>
            );
        }
        else{
            return (
                <BigLoadingCentered />
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editExercises.services,
        authenticatedUser: state.services.authenticatedUser
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getCourseById: (courseId) => dispatch(getCourseById(courseId)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        addNavItem: (item) => dispatch(addNavItem(item)),
        removeNavItem: (id) => dispatch(removeNavItem(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditExercises);
