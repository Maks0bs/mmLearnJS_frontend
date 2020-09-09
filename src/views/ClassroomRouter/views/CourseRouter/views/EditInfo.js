import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateCourseJSON } from "../services/actions";
import { addNavItem, removeNavItem } from "../../../../../services/routing/actions";
import { addToast } from "../../../../../components/ToastRoot/services/actions";
import BigLoadingAbsolute from "../../../../../components/reusables/BigLoadingAbsolute";

/**
 * This component allows teachers to edit basic course data,
 * namely the `about` and `name` fields
 * @memberOf components.views.classroom.course
 * @component
 */
class EditInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '', about: '',
			redirectToCourse: false, loading: false
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault()
		let {name, about} = this.state;
		let data = {name, about}

		this.setState({loading: true})
		this.props.editCourse(data, this.props.course._id)
			.then(() => {
				this.setState({loading: false})
				if (!this.props.error) {
					this.setState({redirectToCourse: true})
				} else {
					this.props.addToast(
						(<div>{this.props.error}</div>),
						{type: 'error'}
					)
				}
			})
	}

	componentDidMount() {
		return this.setState({
			name: this.props.course.name,
			about: this.props.course.about
		})
	}

	onCancel = (e) => {
		e.preventDefault();
		this.setState({redirectToCourse: true})
	}

	render() {
		let {error, course} = this.props;
		let {name, about, redirectToCourse, loading} = this.state;
		if (redirectToCourse) {
			return (<Redirect to={`/classroom/course/${course._id}`}/>)
		}
		let isMobileWidth = (window.innerWidth <= 1000);
		let inlineStyle = {display: 'flex', alignItems: 'center'}
		return (
			<div
				className="container my-5"
				style={{width: isMobileWidth ? '90%' : '60%'}}
			>
				{loading && (<BigLoadingAbsolute/>)}
				<h2>Edit course info</h2>
				<div
					className="alert alert-danger"
					style={{display: error ? "" : "none"}}
				>
					{error}
				</div>
				<form onSubmit={this.onSubmit}>
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
						<label className="text-muted my-0 mx-2">About</label>
						<textarea
							style={{
								borderStyle: 'solid',
								borderWidth: '1px',
								borderColor: 'gray'
							}}
							onChange={this.handleChange("about")}
							className="form-control"
							value={about}
						/>
					</div>
					<button
						className="btn btn-raised ml-3"
						type="button"
						onClick={this.onCancel}
					>
						cancel
					</button>
					<button
						className="btn btn-raised btn-outline btn-success ml-3"
						type="submit"
					>
						Save changes
					</button>
				</form>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
	editCourse: (data, id) => dispatch(updateCourseJSON(data, id)),
	addNavItem: (item) => dispatch(addNavItem(item)),
	removeNavItem: (id) => dispatch(removeNavItem(id)),
	addToast: (component, options) => dispatch(addToast(component, options))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditInfo);