import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editCourse, getCourseById } from './services/actions'
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";

class EditInfo extends Component {
	constructor () {
		super();

		this.state = {
			name: '',
			about: '',
			redirectToCourse: false,
			show: false
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault()
		let {name, about } = this.state;
		let data ={
			name,
			about
		}

		this.props.editCourse(data, this.props.courseData._id)
		.then(() => {
			if (!this.props.error){
				this.setState({
					redirectToCourse: true
				})
			}
		})
	}

	componentDidMount(){
		let courseId = this.props.match.params.courseId;
		this.props.getCourseById(courseId)
		.then(() => {
			return this.setState({
				name: this.props.courseData.name,
				about: this.props.courseData.about,
				show: true
			})
		})
	}


	render() {
		let { error, match } = this.props;
		let { name, about, redirectToCourse, show } = this.state;
		if (redirectToCourse) {
			return (
				<Redirect 
					to={`/classroom/course/${match.params.courseId}`}
				/>
			)
		}

		if (!show){
			return (
				<BigLoadingCentered />
			)
		}

		return (
			<div className="container">
				<h2>Edit course info</h2>
				<div 
					className="alert alert-danger"
					style={{display: error ? "" : "none"}}
				>
					{JSON.stringify(error)}
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="text-muted">Name</label>
						<input 
							onChange={this.handleChange("name")/*can be changed to this.handleChane.bind(this, "name")*/} 
							type="text" 
							className="form-control"
							value={name}
						/>
					</div>

					<div className="form-group">
						<label className="text-muted">About</label>
						<input 
							onChange={this.handleChange("about")/*can be changed to this.handleChane.bind(this, "name")*/} 
							type="text" 
							className="form-control"
							value={about}
						/>
					</div>

					<button 
						className="btn btn-raised btn-outline ml-3"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							this.setState({
								redirectToCourse: true
							})
						}}
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

let mapDispatchToProps = (dispatch) => {
	return {
		editCourse: (data, id) => dispatch(editCourse(data, id)),
		getCourseById: (id) => dispatch(getCourseById(id))
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.editInfo
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(EditInfo);