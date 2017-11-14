import React from 'react';
import './GoogleLink.css';

class GoogleLink extends React.Component{
	render(){
		return(
			<div className='GoogleLink'>
				<a href='http://localhost:3000/auth/google_oauth2?auth_origin_url=http://localhost:3005'>Google</a>
			</div>
		)
	}
}
export default GoogleLink
