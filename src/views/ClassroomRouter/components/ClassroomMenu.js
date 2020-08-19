import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../components/ModalRoot/services/actions';
import Signin from '../../components/Signin'
import { logout, getAuthenticatedUser } from '../../../services/actions'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBell as faBellSolid, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBell as faBellHollow } from '@fortawesome/free-regular-svg-icons'
import NavItem from "../../../components/reusables/navbar/NavItem";
import NavDropdown from "../../../components/reusables/navbar/NavDropdown";
import {propTypesByName} from "../../../services/helpers";

class ClassroomMenu extends Component {
	constructor(){
		super();
		this.state = {
			redirectToHome: false,
			searchQuery: '',
			redirectToSearch: false,
			display: false
		}
	}

	handleLogout = () => {

		this.props.logout()
			.then(() => {
				return this.props.getAuthenticatedUser();
			})
			.then(() => {
				this.setState({
					redirectToHome: true
				})
			})
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	showSigninModal = () => {
		this.props.showModal(
			<Signin onClose={this.props.hideModal} />
		)
	}

	onSubmitSearch = (e) => {
		if (e){
			e.preventDefault();
		}
		this.setState({
			redirectToSearch: true
		})
	}

	toggleNavbar = (e) => {
		e.preventDefault();
		this.setState({
			display: !this.state.display
		})
	}
			
	render() {
		//TODO customize each menu to differentiate better between them!!!!
		let { pathname } = this.props.location;
		let { authenticatedUser: curUser } = this.props
		let { redirectToHome, redirectToSearch, searchQuery, display } = this.state;
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
				<button
					className="navbar-toggler"
					type="button"
					onClick={this.toggleNavbar}
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className={(display ? '' : 'collapse ') + "navbar-collapse"}>
					{(() => {
						if (redirectToSearch){
							this.setState({
								redirectToSearch: false
							})
							return (
								<Redirect to={`/classroom/search/${searchQuery}`} />
							)
						}
					})()}
					<NavItem pageURI={pathname} path={pathname} name="Classroom" brand/>
					<ul className="navbar-nav mr-auto">
						<NavItem pageURI={pathname} path="/classroom/dashboard" name="Dashboard" />
						<NavItem pageURI={pathname} path="/classroom/courses" name="Course list" />
						<NavItem pageURI={pathname} path="/" name="Public page" />
					</ul>
					<ul className="navbar-nav">

						<form
							className="mr-3"
							style={{
								display: 'flex',
								alignItems: 'center'
							}}
							onSubmit={this.onSubmitSearch}
						>
							<input
								onChange={this.handleChange("searchQuery")}
								type="text"
								className="form-control py-0 px-2"
								value={this.state.searchQuery}
							/>
							<Icon
								style={{
									display: 'flex',
									cursor: 'pointer'
								}}
								type="submit"
								icon={faSearch}
								onClick={this.onSubmitSearch}
							/>
						</form>
						{(curUser && curUser._id) ? (
							<div style={{display: 'flex'}}>
								<NavDropdown
									name={ curUser.notifications.length > 0 ?
										curUser.notifications.length :
										''
									}
									displayComponent={

										<Icon
											icon={curUser.notifications.length > 0 ?
												faBellSolid :
												faBellHollow
											}
											size="2x"
										/>
									}
								>
									<div className="dropdown-item">
										{JSON.stringify(curUser.notifications)}
									</div>
								</NavDropdown>

								<NavDropdown name={curUser.name}>
									<Link className="dropdown-item text-right" to={`/classroom/user/${curUser._id}`}>
										Profile
									</Link>
									<Link className="dropdown-item" to="/classroom/dashboard">
										Dashboard
									</Link>
									<Link className="dropdown-item" to="/classroom/courses">
										Courses
									</Link>
									<span
										className="dropdown-item"
										onClick={(e) => this.handleLogout()}
										style={{
											cursor: 'pointer'
										}}
									>
										Log out
									</span>
								</NavDropdown>
							</div>
						) : (
							<div style={{display: 'flex'}}>
								<button
									className="btn btn-outline my-sm-0"
									onClick={(e) => this.showSigninModal()}
								>
									Sign in
								</button>
							</div>
						)}
					</ul>
					{redirectToHome && (<Redirect to="/" />)}
				</div>

			</nav>
		);
	}
}

let mapDispatchToProps = dispatch => {
	return {
		showModal: (Component) => dispatch(showModal(Component)),
		hideModal: () => dispatch(hideModal()),
		logout: () => dispatch(logout()),
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

ClassroomMenu.propTypes = {
	authenticatedUser: propTypesByName['authenticatedUser']
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ClassroomMenu))