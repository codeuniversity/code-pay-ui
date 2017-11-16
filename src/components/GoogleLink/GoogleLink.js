import React from 'react';
import './GoogleLink.css';

class GoogleLink extends React.Component{
	render(){
		return(
			<div className="GoogleLink-container">
				<div className='GoogleLink'>
					<a href={`${process.env.REACT_APP_API_URL}/auth/google_oauth2?auth_origin_url=${process.env.REACT_APP_ORIGIN_URL}`}>Google</a>
				</div>
			</div>
		)
	}
}
export default GoogleLink
