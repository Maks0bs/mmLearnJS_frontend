import React, {Component} from 'react';
import {updateFilter} from "../services/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

/**
 * This component allows the user to filter the news about subscribed courses.
 * They can choose what courses are relevant and choose the time period
 * from which the news should be displayed
 * @memberOf components.views.classroom.Dashboard
 * @component
 */
class DashboardFilter extends Component {

    handleChange = (name) => (event) => {
        if (name === 'coursesFilterType' && event.target.value === 'all'){
            // if the user wants to view news on all courses
            // set the filter of chosen courses to the array
            // of courses to which the user is subscribed
            let { authenticatedUser: user} = this.props;
            if (user && Array.isArray(user.subscribedCourses)){
                this.props.updateFilter({
                    chosenCourses: user.subscribedCourses.map(c => c.course._id)
                })
            }
        }
        this.props.updateFilter({
            [name]: event.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    onShowChooseCourses = (e) => {
        e.preventDefault();
        this.props.onShowChooseCourses();
    }

    render() {
        let { curDateFrom, curDateTo, coursesFilterType} = this.props;
        let inlineStyle = {
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'row wrap'
        }
        return (
            <form
                onSubmit={this.onSubmit}
                style={inlineStyle}
            >
                <div>
                    <div className="my-2" style={inlineStyle}>
                        <strong className="mr-3">Filter news by date:</strong>
                        <div className="mr-1">From</div>
                        <div>
                            <input
                                className={"form-control"}
                                type="date"
                                style={{display: 'inline-block', padding: '5px'}}
                                value={curDateFrom}
                                onChange={this.handleChange("curDateFrom")}
                                min={"2000-01-01"}
                                max={"2100-01-01"}
                            />
                        </div>
                        <div className="mx-1">to</div>
                        <div>
                            <input
                                className={"form-control"}
                                style={{display: 'inline-block', padding: '5px'}}
                                value={curDateTo}
                                onChange={this.handleChange("curDateTo")}
                                type="date"
                                min={"2000-01-01"}
                                max={"2100-01-01"}
                            />
                        </div>
                    </div>
                    <div className="my-2" style={inlineStyle}>
                        <strong className="mr-3">Display news from courses:</strong>
                        <select
                            style={{padding: '5px'}}
                            name="coursesFilter"
                            value={coursesFilterType}
                            onChange={this.handleChange("coursesFilterType")}
                        >
                            <option value="all">all</option>
                            <option value="choose">choose</option>
                        </select>
                        {(coursesFilterType === 'choose') && (
                            <a
                                className="ml-3"
                                href="#void"
                                onClick={this.onShowChooseCourses}
                            >
                                Choose courses
                            </a>
                        )}
                    </div>
                </div>
                <button
                    className="btn btn-outline mx-3 p-1"
                    type="submit"
                >
                    update
                </button>
            </form>
        );
    }
}
let mapStateToProps = (state) => ({
    ...state.views.classroom.dashboard,
    ...state.services
})
let mapDispatchToProps = (dispatch) => ({
    updateFilter: (data) => dispatch(updateFilter(data))
})
DashboardFilter.propTypes = {
    /**
     * The action that should
     * be performed when the user
     * decides to set a new filter
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * The action that opens the modal
     * where users can specify
     * from what courses they want to view the news
     */
    onShowChooseCourses: PropTypes.func.isRequired
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardFilter)