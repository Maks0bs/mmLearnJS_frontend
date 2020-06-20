import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import DefaultUserAvatar from '../../../../../../res/images/DefaultUserAvatar.png'
import { REACT_APP_API_URL } from "../../../../../../constants";

class User extends Component {

	render() {
		let { user, authenticatedUser } = this.props;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
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
									<button>
										Delete Profile
									</button>

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
		...state.views.classroom.user,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)