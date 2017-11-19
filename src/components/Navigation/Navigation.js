import React from 'react';
import './Navigation.css';
import Store from '../../services/Store';
import {NavLink,withRouter} from 'react-router-dom';
import ManyCoins from '../../assets/ManyCoins.svg';
import Logo from '../../assets/logo.png';
import Drawer from 'material-ui/Drawer';


class Navigation extends React.Component{
   constructor(props) {
    super(props);
    this.state = {open: false};
  }
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

	onLogout = ()=>{
		console.log('force')
		Store.deauthenticate();
		window.location.reload();

	}


	render(){
		return( 
			<div className='Navigation'>
      
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
              <div className="menu-item">
              <NavLink to="/" exact={true} activeClassName="mobile-active-link" className="nav-link Profile">
                Home
              </NavLink>
              </div>
              <div className="menu-item">
              <NavLink to="/profile" exact={true} activeClassName="mobile-active-link" className="nav-link Profile">
                Transactions
              </NavLink>
              </div>
              <div className="menu-item">
              <NavLink to="/logout" exact={true} activeClassName="mobile-active-link" className="nav-link Profile">
                <div onClick={this.onLogout}>Logout</div>
              </NavLink> 
              </div>   
        </Drawer>

				<div className='app-header'>
          <div className="hamburger" onClick={this.handleToggle}> <span> </span> <span> </span> <span> </span> </div>
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
