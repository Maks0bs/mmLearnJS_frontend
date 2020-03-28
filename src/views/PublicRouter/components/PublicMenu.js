import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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
		const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? 'show' : '')
		return (
			<li className="nav-item dropdown">
			    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown"
			        aria-haspopup="true" aria-expanded="false"
			        onClick={(e) => {this.showDropdown(e)}}>
			    {this.props.name}
			    </a>
			    <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
			        {this.props.children}
			    </div>
			</li>

		)
	}
}

class PublicMenu extends Component {
			
	render() {
		console.log(this.props);
		let { pathname } = this.props.location;
		/* doesn't have mobile support. Visit bootstrap navbar docs to see how to implement it */
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<NavItem pageURI={pathname} path="/" name="mmLearnJS" brand="true"/>
		        <ul className="navbar-nav mr-auto">
		            <NavItem pageURI={pathname} path="/page2" name="Page2" />
		            <NavItem pageURI={pathname} path="/page3" name="Disabled" disabled="true" />
		        </ul>
		        <ul className="navbar-nav">
		        	<button 
		        		className="btn btn-outline my-2 my-sm-0"
		        	>
		        		Sign in
		        	</button>
		        </ul>
			</nav>
		);
	}
}

export default withRouter(PublicMenu)