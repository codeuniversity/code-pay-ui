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
          <div className= "container">
            <NavLink to="/" exact={true}  className="nav-link Home">
              <img className="nav-icon" src={Logo} alt=''/>
            </NavLink>   
  					<nav className="header-nav">
              <NavLink to="/" exact={true} activeClassName="active-link" className="nav-link Profile">
                Home
              </NavLink>
              <NavLink to="/profile" exact={true} activeClassName="active-link" className="nav-link Profile">
  						  Transactions
  					  </NavLink>
              <NavLink to="/logout" exact={true} activeClassName="active-link" className="nav-link Profile">
                <div onClick={this.onLogout}>Logout</div>
              </NavLink>		
            </nav>
          </div>
				</div>

				<div className='main-body'>
          <div className='container'>
					{this.props.children}
          </div>
				</div>
			</div>
		)
	}
}
export default withRouter(Navigation);
