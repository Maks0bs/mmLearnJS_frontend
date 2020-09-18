import React, {Component} from 'react';
import {connect} from "react-redux";
import { showModal, hideModal} from "../../../../../../../../components/ModalRoot/services/actions";
import StatsDetails from "../StatsDetails";
import EntryCell from "./components/EntryCell";

class TeacherStats extends Component {

    onShowDetails = (id) => (e) => {
        e.preventDefault();
        this.props.showModal(
            <StatsDetails
                onClose={this.props.hideModal}
                userNum={this.props.userNum}
                exerciseId={id}
            />
        )
    }

    render() {
        let {exercises} = this.props.courseData;
        let summary = this.props.summaries[this.props.userNum]
        return (
            <tr>
                <th scope="row">{summary.name}</th>
                {exercises.map((e, i) => {
                    let data = this.props.userToExerciseDict[this.props.userId][e._id]
                    return (
                        <EntryCell
                            key={i}
                            data={data}
                            onShowDetails={this.onShowDetails(e._id)}
                        />
                    )
                })}
            </tr>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.main.grades,
        ...state.views.classroom.course.main.services
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        showModal: (component) => dispatch(showModal(component)),
        hideModal: () => dispatch(hideModal())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherStats)