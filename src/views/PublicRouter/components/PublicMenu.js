import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hideModal, showModal } from '../../components/ModalRoot/services/actions';
import SigninModal from '../../components/SigninModal'
import _ from 'lodash'
import { getAuthenticatedUser, logout } from '../../../services/actions'

let NavItem = props => {
	if (props.brand){
		return (
			<Link className="navbar-brand" to={props.path}
			>
				{props.name}
			</Link>
		)
	}
  	return (
    	<li className={(props.path === props.pageURI) ? 'nav-item active' : 'nav-item'}>
      		<Link
      			to={props.path} 
      			className={props.disabled ? 'nav-link disabled' : 'nav-link'}
      		>
      			{props.name}
      		</Link>
    	</li>
  	);
}

class NavDropdown extends React.Component {
	constructor(props) {
	super(props);
		this.state = {
			isToggleOn: false
		};
	}
	showDropdown(e) {
		e.preventDefault();
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}
	render() {
		const classDropdownMenu = 'dropdown-menu ' + (this.state.isToggleOn ? 'show' : '')
		return (
			<li className="nav-item dropdown">
			    <a 
			    	className="nav-link dropdown-toggle" 
			    	data-toggle="dropdown"
			        onClick={(e) => {this.showDropdown(e)}}
			        style={{
			        	cursor: 'pointer',
			        	textTransform: 'none'
			        }}
			    >
			    	{this.props.name}
			    </a>
			    <ul className={`${classDropdownMenu} dropdown-menu-right`}>
			        {this.props.children}
			    </ul>
			</li>

		)
	}
}

class PublicMenu extends Component {
	constructor(){
		super();
		this.state = {
			redirectToHome: false
		}
	}

	shouldComponentUpdate(nextProps){
		
		if (_.isEqual(this.props.authenticatedUser, nextProps.authenticatedUser)){
			return false;
		}
		else{
			return true;
		}
	}

	handleLogout = () => {
		this.setState({
			redirectToHome: true
		})
		this.props.logout();
	}
			
	render() {
		this.props.getAuthenticatedUser()
		let { pathname } = this.props.location;
		let { authenticatedUser: curUser } = this.props
		/* doesn't have mobile support. Visit bootstrap navbar docs to see how to implement it */
		return (
			<nav 
				className="navbar navbar-expand-lg navbar-light"
				style={{
					backgroundColor: '#8C9EFF'
				}}
			>
				<NavItem pageURI={pathname} path="/" name="mmLearnJS" brand="true"/>
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
				    		Classroom
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
			        		onClick={(e) => this.props.showModal(SigninModal)}
			        	>
			        		Sign in
			        	</button>
			        </ul>
			    )}
			    
			    {this.state.redirectToHome && (<Redirect to="/" />)}
			</nav>
		);
	}
}

let mapDispatchToProps = dispatch => {
	return {
		showModal: (Component) => dispatch(showModal(Component)),
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser()),
		logout: () => dispatch(logout())
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(PublicMenu))