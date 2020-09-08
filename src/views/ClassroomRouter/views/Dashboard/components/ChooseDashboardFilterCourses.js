import React, {Component} from 'react';
import PropTypes from "prop-types";
/**
 * This component allows the user to choose the courses
 * from which they want to view the news
 * @property coursesList - this member is used to display
 * the sorted list of all available (subscribed) courses.
 * If it were in the state the sorting process would
 * cause a lot of unnecessary re-renders
 *
 * @memberOf components.views.classroom.Dashboard
 * @component
 */
class ChooseDashboardFilterCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: {}}
    }
    coursesList = []

    componentDidMount() {
        let starting = {};
        console.log(this.props.curChosenCourses);
        for (let c of this.props.curChosenCourses){
            starting[c] = true;
        }
        this.coursesList = this.props.allCourses.map(c => c.course);
        this.coursesList.sort((a, b) => (
            a.name.localeCompare(b.name)
        ))

        this.setState({
            selected: starting
        })
    }

    onChange = (id) => () => {
        this.setState({
            selected: {
                ...this.state.selected,
                [id]: !this.state.selected[id]
            }
        })
    }

    handleLeave = () => this.props.onClose && this.props.onClose();

    handleSave = () => {
        let result = this.coursesList.filter((c) => (
            this.state.selected[c._id]
        ))
        result = result.map(c => c._id);
        this.props.onSave && this.props.onSave(result);
    }

    render() {
        let isMobileWidth = (window.innerWidth <= 1000);
        return (
            <div
                className="container my-4"
                style={{
                    width: isMobileWidth ? '80%' : '60%',
                    textAlign: 'center'
                }}
            >
                <h2>Choose courses</h2>
                <table>
                    <tbody>
                        {this.coursesList.map((course, i) => (
                            <tr key={i} style={{padding: '10px', alignItems: 'center'}}>
                                <td style={{padding: '10px'}}>
                                    <label
                                        htmlFor={"chooseCoursesDashboard" + course._id}
                                    >
                                        {course.name}
                                    </label>
                                </td>
                                <td>
                                    <input
                                        id={"chooseCoursesDashboard" + course._id}
                                        type="checkbox"
                                        onChange={this.onChange(course._id)}
                                        checked={this.state.selected[course._id]}
                                        value={this.state.selected[course._id] || false}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="btn btn-outline btn-raised"
                    onClick={this.handleLeave}
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className="btn btn-outline btn-raised btn-success ml-3"
                    type="button"
                    onClick={this.handleSave}
                >
                    Save
                </button>
            </div>
        );
    }
}
ChooseDashboardFilterCourses.propTypes = {
    /**
     * The action that should be performed when
     * the course selection is canceled inside this
     * component. Normally specifies the action on close
     * if this component is inside a modal
     */
    handleLeave: PropTypes.func,
    /**
     * Retrieves the courses, chosen as a filter in this component
     * and provides this data for further usage
     */
    handleSave: PropTypes.func,
    /**
     * The array that specifies what courses the user
     * has already chosen
     */
    curChosenCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
    allCourses: PropTypes.arrayOf(PropTypes.shape({
        course: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        })
    }))
}
export default ChooseDashboardFilterCourses;