import React, {Component} from 'react';
import {connect} from "react-redux";
import { showModal, hideModal} from "../../../../../../../../components/ModalRoot/services/actions";
import StatsDetails from "../GradesStatsDetails";
import GradesStatsEntryCell from "./components/GradesStatsEntryCell";
import PropTypes from "prop-types";

/**
 * This component displays a row of basic information about the
 * participation of the given user in all course exercises
 * @memberOf components.views.classroom.course.grades
 * @component
 */
class GradesStatsEntryRow extends Component {

    onShowDetails = (id) => () => {
        this.props.showModal(
            <StatsDetails
                userId={this.props.userId}
                userName={this.props.userName}
                onClose={this.props.hideModal}
                exerciseId={id}
            />
        )
    }

    render() {
        let {course, userId, userName} = this.props;
        return (
            <tr>
                <th scope="row">{userName}</th>
                {Array.isArray(course.exercises) && course.exercises.map((e, i) => (
                    <GradesStatsEntryCell
                        key={i}
                        userId={userId}
                        exerciseId={e._id}
                        onShowDetails={this.onShowDetails(e._id)}
                    />
                ))}
            </tr>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.course.grades,
    ...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
    showModal: (component) => dispatch(showModal(component)),
    hideModal: () => dispatch(hideModal())
})
GradesStatsEntryRow.propTypes = {
    userName: PropTypes.string,
    userId: PropTypes.string.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GradesStatsEntryRow)