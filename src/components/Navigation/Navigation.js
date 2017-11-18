import React from 'react';
import './Navigation.css';
import Store from '../../services/Store';
import {NavLink,withRouter} from 'react-router-dom';
import ManyCoins from '../../assets/ManyCoins.svg';
import Logo from '../../assets/logo.png';
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
					<NavLink to="/" exact={true} activeClassName="active-link" className="nav-link Home">
					<img className="nav-icon" src={Logo} alt=''/>
					</NavLink>
					<NavLink to="/profile" exact={true} activeClassName="active-link" className="nav-link Profile">
						<img className="nav-icon" src={ManyCoins} alt=''/>
					</NavLink>
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
