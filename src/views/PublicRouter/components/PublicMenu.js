import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../../components/ModalRoot/services/actions';
import Signin from '../../components/Signin'
import { logout } from '../../../services/actions'
import NavDropdown from "../../../components/reusables/navbar/NavDropdown";
import NavItem from "../../../components/reusables/navbar/NavItem";
import PropTypes from "prop-types";

class PublicMenu extends Component {
	constructor(){
		super();
		this.state = {
			redirectToHome: false,
			display: false
		}
	}


	handleLogout = () => {
		
		this.props.logout()
		.then(() => {
			this.setState({
				redirectToHome: true
			})
		})
	}

	showSigninModal = () => {
		this.props.showModal(
			<Signin
				onClose={this.props.hideModal}
				shouldRedirect={true}
			/>
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
		/* doesn't have mobile support. Visit bootstrap navbar docs to see how to implement it */
		return (
			<nav 
				className="navbar navbar-expand-lg navbar-light sticky-top"
				style={{
					backgroundColor: '#64B5F6'
				}}
			>
				<button
					className="navbar-toggler"
					type="button"
					onClick={this.toggleNavbar}
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className={(display ? '' : 'collapse ') + "navbar-collapse"}>
					<NavItem pageURI={pathname} path="/" name="mmLearnJS" brand/>
					<ul className="navbar-nav mr-auto">
						<NavItem pageURI={pathname} path="/page2" name="Page2" />
						<NavItem pageURI={pathname} path="/page3" name="Disabled" disabled="true" />
					</ul>
					{(curUser && curUser._id) ? (
						<ul className="navbar-nav">
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
					</ul>
					) : (
						<ul className="navbar-nav">
							<button
								className="btn btn-outline my-sm-0"
								style={{
									background: 'white'
								}}
								onClick={this.showSigninModal}
							>
								Sign in
							</button>
						</ul>
					)}

					{this.state.redirectToHome && (<Redirect to="/" />)}
				</div>
			</nav>
		);
	}
}

let mapDispatchToProps = dispatch => {
	return {
		showModal: (Component) => dispatch(showModal(Component)),
		hideModal: () => dispatch(hideModal()),
		logout: () => dispatch(logout())
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

PublicMenu.propTypes = {
	authenticatedUser: PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string
	})
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(PublicMenu))