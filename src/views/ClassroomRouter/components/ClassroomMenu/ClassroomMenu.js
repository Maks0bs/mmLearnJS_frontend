import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../../components/ModalRoot/services/actions';
import Signin from '../../../components/Signin'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import NavItem from "../../../../components/reusables/navbar/NavItem";
import {getAuthenticatedUser, logout} from "../../../../services/main/actions";
import ClassroomMenuUserActions from "./components/ClassroomMenuUserActions";

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
			redirectToHome: false, redirectToSearch: false,
			searchQuery: '', display: false
		}
	}

	handleLogout = () => {
		this.props.logout()
			.then(() => this.setState({redirectToHome: true}))
	}

	handleChange = (name) => (event) => {
		this.setState({[name]: event.target.value})
	}

	showSigninModal = (e) => {
		e.preventDefault();
		this.props.showModal(<Signin shouldCloseModal/>)
	}

	onSubmitSearch = (e) => {
		e && e.preventDefault();
		this.setState({redirectToSearch: true})
	}

	toggleNavbar = (e) => {
		e.preventDefault();
		this.setState({display: !this.state.display})
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
						// This allows the navbar to remain, when the user inputs
						// a search request into the search form
						if (redirectToSearch){
							this.setState({redirectToSearch: false})
							return (<Redirect to={`/classroom/search/${searchQuery}`} />)
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
							// Navigation items, which get added while the user
							// goes on different routers (e. g. course router, user router)
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
							style={{display: 'flex', alignItems: 'center'}}
							onSubmit={this.onSubmitSearch}
						>
							<input
								onChange={this.handleChange("searchQuery")}
								type="text"
								placeholder="search courses"
								className="form-control py-0 px-2"
								value={this.state.searchQuery}
							/>
							<Icon
								style={{display: 'flex', cursor: 'pointer'}}
								type="submit"
								icon={faSearch}
								onClick={this.onSubmitSearch}
							/>
						</form>
						{(curUser && curUser._id) ? (
							<ClassroomMenuUserActions
								onLogout={this.handleLogout}
								userId={curUser._id}
								notifications={curUser.notifications}
								userName={curUser.name}
							/>
						) : (
							<button
								className="btn btn-outline-info my-sm-0 my-2"
								style={{color: 'black'}}
								onClick={this.showSigninModal}
							>
								Sign in
							</button>
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