import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../components/ModalRoot/services/actions';
import Signin from '../../components/Signin'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faBell as faBellSolid, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBell as faBellHollow } from '@fortawesome/free-regular-svg-icons'
import NavItem from "../../../components/reusables/navbar/NavItem";
import NavDropdown from "../../../components/reusables/navbar/NavDropdown";
import NotificationItem from "../../../components/reusables/navbar/NotificationItem";
import {getAuthenticatedUser, logout} from "../../../services/main/actions";

/**
 * This navigation bar is displayed on all pages, that
 * are indexed by the {@link components.views.classroom.ClassroomRouter}
 * @memberOf components.views.classroom
 * @component
 */
class ClassroomMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			redirectToHome: false,
			searchQuery: '',
			redirectToSearch: false,
			display: false
		}
	}

	handleLogout = (e) => {
		e.preventDefault();
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

	showSigninModal = (e) => {
		e.preventDefault();
		this.props.showModal(
			<Signin shouldCloseModal/>
		)
	}

	onSubmitSearch = (e) => {
		e && e.preventDefault();
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
						/*
							This allows the navbar to remain, when the user inputs
							a search request into the search form
						 */
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
						<NavItem
							pageURI={pathname}
							path="/"
							name="Public page"
							key={-3}
						/>
						<NavItem
							pageURI={pathname}
							path="/classroom/dashboard"
							name="Dashboard"
							key={-1}
						/>
						<NavItem
							pageURI={pathname}
							path="/classroom/courses"
							name="Course list"
							key={-2}
						/>
						{this.props.navItems.map((item, i) => (
							/*
								Navigation items, which get added while the user
								goes on different routers (e. g. course router, user router)
							 */
							<NavItem
								pageURI={pathname}
								path={item.path}
								name={item.name}
								key={i}
								dynamic
							/>
						))}
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
										curUser.notifications.length : ''
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
									tabIndex={0}
								>
									{curUser.notifications.map((n, i) => (
										<NotificationItem
											key={i}
											created={n.created}
											title={n.title}
											text={n.text}
										/>
									))}
								</NavDropdown>

								<NavDropdown name={curUser.name} tabIndex={0}>
									<Link className="dropdown-item text-right" to={`/classroom/user/${curUser._id}`}>
										Profile
									</Link>
									<Link className="dropdown-item" to="/classroom/dashboard">
										Dashboard
									</Link>
									<Link className="dropdown-item" to="/classroom/courses">
										Courses
									</Link>
									<a
										className="dropdown-item"
										onClick={this.handleLogout}
										tabIndex={0}
										href="#void"
									>
										Log out
									</a>
								</NavDropdown>
							</div>
						) : (
							<div style={{display: 'flex'}}>
								<button
									className="btn btn-outline my-sm-0"
									onClick={this.showSigninModal}
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

let mapDispatchToProps = dispatch => ({
	showModal: (Component) => dispatch(showModal(Component)),
	hideModal: () => dispatch(hideModal()),
	logout: () => dispatch(logout()),
	getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
})
let mapStateToProps = (state) => ({
	...state.services,
	...state.routing
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ClassroomMenu))