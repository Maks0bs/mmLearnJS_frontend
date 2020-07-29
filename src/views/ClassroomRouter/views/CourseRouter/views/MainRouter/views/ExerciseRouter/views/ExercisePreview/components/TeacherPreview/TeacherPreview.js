import React, {Component} from 'react';
import {connect} from "react-redux";
import { addToast } from "../../../../../../../../../../../../components/ToastRoot/services/actions";
import { toggleLoading } from "../../../../../../../../../../../../services/actions";
import LoadingRingAnimated from '../../../../../../../../../../../../res/images/LoadingRingAnimated50px.svg'
import {Link} from "react-router-dom";

class TeacherPreview extends Component {

    componentDidMount() {
        // this.props.toggleLoading(true);
        // this.props.getAttempts(this.props.courseData._id, this.props.exercise._id)
        //     .then(() => {
        //         this.props.toggleLoading(false);
        //         if (this.props.error){
        //             this.props.addToast(
        //                 (
        //                     <div>
        //                         Problem with loading attempts
        //                     </div>
        //                 ),
        //                 {
        //                     type: 'error'
        //                 }
        //             )
        //         }
        //     })
    }


    render() {
        let { exercise, loading, courseData } = this.props;
        let { name } = exercise;


        return (
            <div className="container">
                <h1>{name}</h1>
                {loading ? (
                    <img src={LoadingRingAnimated} alt="loading" />
                ) : (
                    JSON.stringify(exercise)
                )}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.exercise.services,
        ...state.views.classroom.course.main.services,
        ...state.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        toggleLoading: (loading) => dispatch(toggleLoading(loading)),
        addToast: (toast, options) => dispatch(addToast(toast, options))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherPreview)