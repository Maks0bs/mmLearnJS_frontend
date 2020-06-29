import React, {Component} from 'react';

class ChooseCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {}
        }
    }
    coursesList = []

    componentDidMount() {
        let starting = {};
        for (let c of this.props.courses){
            starting[c._id] = true;
        }

        for (let c of this.props.allCourses){
            this.coursesList.push(c.course);
        }


        this.coursesList.sort((a, b) => (
            a.name.localeCompare(b.name)
        ))

        this.setState({
            selected: starting
        })
    }

    onChange = (id) => (e) => {
        let newSelected = {
            ...this.state.selected
        };
        newSelected[id] = !this.state.selected[id];


        this.setState({
            selected: newSelected
        })
    }

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    handleSave = () => {
        let { selected } = this.state;
        let result = [];
        for (let i of this.coursesList){
            if (selected[i._id]){
                result.push(i);
            }
        }
        this.props.onSave && this.props.onSave(result);
    }


    render() {
        return (
            <div className="container mt-4">
                <table>
                    <tbody>
                        {this.coursesList.map((course, i) => (
                            <tr
                                key={i}
                                style={{
                                    padding: '5px'
                                }}
                            >
                                <td
                                    style={{
                                        padding: '5px'
                                    }}
                                >
                                    {course.name}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={this.onChange(course._id)}
                                        checked={this.state.selected[course._id]}
                                        value={this.state.selected[course._id]}
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

export default ChooseCourses;