import React from 'react';
import './GoogleLink.css';

class GoogleLink extends React.Component{
	render(){
		return(
			<div className="GoogleLink-container">
				<div className='GoogleLink'>
          <img className="GoogleLink-logo" alt="Fling Logo" src={require('./../../assets/logo.png')}/>
					<a className="GoogleLink-link" href={`${process.env.REACT_APP_API_URL}/auth/google_oauth2?auth_origin_url=${process.env.REACT_APP_ORIGIN_URL}`}>Sign in with Google</a>
				</div>
			</div>
		)
	}
}
export default GoogleLink


