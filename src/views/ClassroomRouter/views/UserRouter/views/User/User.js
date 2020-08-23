import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link, Redirect} from "react-router-dom";
import DefaultUserAvatar from '../../../../../../res/images/DefaultUserAvatar.png'
import { sendActivation } from "../../services/actions";
import { REACT_APP_API_URL } from "../../../../../../constants";
import { addToast } from '../../../../../../components/ToastRoot/services/actions'

class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reload: false
		}
	}


	onResendActivation = (e) => {
		e.preventDefault();

		this.props.sendActivation()
			.then(() => {
				if (!this.props.error){
					this.setState({
						reload: true
					})

					this.props.addToast(
						(
							<div>
								Activation link sent to email
							</div>
						),
						{
							type: 'info'
						}
					)
				} else {
					this.props.addToast(
						(
							<div>
								{this.props.error}
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
		let { user, authenticatedUser } = this.props;


		if (this.state.reload){
			this.setState({
				reload: false
			})
			return (
				<Redirect
					to={`/classroom/user/${user._id}`}
				/>
			)
		}

		let isAuthenticated = (authenticatedUser && (authenticatedUser._id === user._id) );

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				{(() => {
					if (!user.activated) {
						return (
							<h1 className="alert alert-info">
								User is not yet activated.
							</h1>
						)
					}
				})()}

				<div className="row">
					<div
						className="col-md-4"
						style={{
							display: (!isAuthenticated &&
								(!user.photo || user.hiddenFields.includes("photo") ) ) ?
								'none' : ''
						}}
					>

						<img
							src={`${REACT_APP_API_URL}/files/download/${user.photo}`}
							alt={user.name}
							className="card-img-top"
							style={{
								width: 'auto',
								height: '200px'
							}}
							onError={e => (e.target.src = `${DefaultUserAvatar}`)}
						/>



					</div>

					<div
						className="col-md-8"
					>
						<div className="lead mt-2">
							<p
								style={{
									display: (!isAuthenticated &&
										(!user.name || user.hiddenFields.includes("name") ) ) ?
										'none' : ''
								}}
							>
								{user.name}
							</p>
							<p style={{
								display: (!isAuthenticated &&
									(!user.email || user.hiddenFields.includes("email") ) ) ?
									'none' : ''
								}}
							>
								Email: {user.email}
							</p>
							<p style={{
									display: (!isAuthenticated &&
										(!user.created || user.hiddenFields.includes("created") ) ) ?
										'none' : ''
								}}
							>
								{`Joined ${new Date(user.created).toDateString()}`}
							</p>
						</div>

						{(authenticatedUser && authenticatedUser._id === user._id) ?
							(
								<div className="d-inline-block">
									<Link
										className="btn btn-raised btn-success mr-5"
										to={`/classroom/user/${user._id}/edit`}
									>
										Edit profile
									</Link>
									<a
										href="#void"
										style={{
											display: user.activated ? 'none' : '',
											color: 'red'
										}}
										onClick={this.onResendActivation}
									>
										<strong>Resend activation link</strong>
									</a>

								</div>
							) : null}


					</div>
				</div>
				<div className="row">
					<div className="col-md-12 mt-5 mb-5">

						<hr/>
						<div
							style={{
								display: (!isAuthenticated &&
									(!user.about || user.hiddenFields.includes("about") ) ) ?
									'none' : ''
							}}
						>
							<h4>About</h4>
							<p className="lead">
								{user.about}
							</p>
							<hr/>
						</div>


						<div className="row">
							<div
								className="col-md-6"
								style={{
									display: (!isAuthenticated &&
										(!user.enrolledCourses || user.hiddenFields.includes("enrolledCourses") ) ) ?
										'none' : ''
								}}
							>
								<h5>Enrolled courses</h5>
								{user.enrolledCourses.map((course, i) => (
									<div>
										<Link to={`/classroom/course/${course._id}`}>
											{course.name}
										</Link>
									</div>
								))}
							</div>
							<div
								className="col-md-6"
								style={{
									display: (!isAuthenticated &&
										(!user.teacherCourses || user.hiddenFields.includes("teacherCourses") ) ) ?
										'none' : ''
								}}
							>
								<h5>Teacher courses</h5>
								{user.teacherCourses && user.teacherCourses.map((course, i) => (
									<div>

										<Link to={`/classroom/course/${course._id}`}>
											{course.name}
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.user,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		sendActivation: () => dispatch(sendActivation()),
		addToast: (component, options) => dispatch(addToast(component, options))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)