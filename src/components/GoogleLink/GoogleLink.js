import React from 'react';
import './GoogleLink.css';
import Logo from '../../assets/logotransp.png';
class GoogleLink extends React.Component{
	render(){
		return(
			<div className="GoogleLink-container">
        <div className="bubbles"></div>
				<div className='GoogleLink'>
          <img className="GoogleLink-logo" alt="Fling Logo" src={Logo}/>
					<a className="GoogleLink-link" href={`${process.env.REACT_APP_API_URL}/auth/google_oauth2?auth_origin_url=${process.env.REACT_APP_ORIGIN_URL}`}>Sign in with Google</a>
				</div>
			</div>
		)
	}
}
export default GoogleLink


