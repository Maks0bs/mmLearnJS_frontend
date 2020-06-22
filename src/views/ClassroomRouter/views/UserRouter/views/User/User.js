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
			return (
				<Redirect
					to={{
						pathname: '/reload',
						state: {
							page: this.props.location.pathname
						}
					}}
				/>
			)
		}
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				{(() => {
					if ((!authenticatedUser || authenticatedUser._id !== user._id) && !user.activated) {
						return (
							<h1 className="alert alert-info">
								This user's account is not yet activated.
							</h1>
						)
					}
				})()}

				<div className="row">
					<div className="col-md-4">

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

					<div className="col-md-8">
						<div className="lead mt-2">
							<p>{user.name}</p>
							<p>Email: {user.email}</p>
							<p>{`Joined ${new Date(user.created).toDateString()}`}</p>
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
						<h4>About</h4>
						<p className="lead">{user.about}</p>
						<hr/>

						<div>
							Courses: ...
						</div>
					</div>
				</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		user: state.views.classroom.user.user,
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