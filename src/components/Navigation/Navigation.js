import React from 'react';
import './Navigation.css';
import Store from '../../services/Store';
import {Link,withRouter} from 'react-router-dom';

class Navigation extends React.Component{
	onLogout = ()=>{
		console.log('force')
		Store.deauthenticate();
		window.location.reload();

	}
	render(){
		return(
			<div className='Navigation'>
				<div className='app-header'>
					<Link to="/" className="nav-link Home">Home</Link>
					<div className='logout' onClick={this.onLogout}>Logout</div>
				</div>
				<div className='main-body'>
					{this.props.children}
				</div>
			</div>
		)
	}
}
export default withRouter(Navigation);
