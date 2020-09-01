import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../components/ModalRoot/services/actions';
import Signin from '../../components/Signin'
import NavDropdown from "../../../components/reusables/navbar/NavDropdown";
import NavItem from "../../../components/reusables/navbar/NavItem";
import {getAuthenticatedUser, logout} from "../../../services/main/actions";

/**
 * This navigation bar is displayed on all pages, that
 * are indexed by the {@link components.views.public.PublicRouter}
 * @memberOf components.views.public
 * @component
 */
class PublicMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			redirectToHome: false,
			display: false
		}
	}

	handleLogout = (e) => {

		e.preventDefault();
		this.props.logout()
			.then(() => this.props.getAuthenticatedUser())
			.then(() => this.setState({
				redirectToHome: true
			}))
	}

	showSigninModal = () => {
		this.props.showModal(
			<Signin shouldRedirect shouldCloseModal/>
		)
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
		let { display } = this.state;
		return (
			<nav 
				className="navbar navbar-expand-lg navbar-light sticky-top"
				style={{
					backgroundColor: '#64B5F6'
				}}
			>
				{/*
					This button is not shown on desktop,
					but is very important for navigation on mobile
					version of the site
				*/}
				<button
					className="navbar-toggler"
					type="button"
					onClick={this.toggleNavbar}
					tabIndex={0}
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className={(display ? '' : 'collapse ') + "navbar-collapse"}>
					<NavItem
						pageURI={pathname}
						path="/"
						name="mmLearnJS"
						brand
					/>
					<ul className="navbar-nav mr-auto">
						<NavItem
							pageURI={pathname}
							path="/classroom/courses"
							name="Classroom"
						/>
					</ul>
					{/*
						If user is authenticated, show links to dashboard / course list
						and some other options
					*/}
					{(curUser && curUser._id) ? (
						<ul className="navbar-nav">
						<NavDropdown
							name={curUser.name}
							tabIndex={0}
						>
							<Link
								className="dropdown-item text-right"
								to={`/classroom/user/${curUser._id}`}
								tabIndex={0}
							>
								Profile
							</Link>
							<Link
								className="dropdown-item"
								to="/classroom/dashboard"
								tabIndex={0}
							>
								Dashboard
							</Link>
							<Link
								className="dropdown-item"
								to="/classroom/courses"
								tabIndex={0}
							>
								Courses
							</Link>
							<a
								className="dropdown-item"
								onClick={this.handleLogout}
								href="#void"
							>
								Log out
							</a>
						</NavDropdown>
					</ul>
					/*
						Otherwise, if user is not logged in,
						display the button, that opens the sign in modal
					 */
					) : (
						<ul className="navbar-nav">
							<button
								className="btn btn-outline my-sm-0"
								style={{
									background: 'white'
								}}
								onClick={this.showSigninModal}
								tabIndex={0}
							>
								Sign in
							</button>
						</ul>
					)}

					{/*
						This should be a part of the whole navigation bar,
						because through all redirect the bar should be visible.
						If we simply returned the redirect to '/', the navbar would
						disappear.
					*/}
					{this.state.redirectToHome && (<Redirect to="/" />)}
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
	...state.services
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(PublicMenu))