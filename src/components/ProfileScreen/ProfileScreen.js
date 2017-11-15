import React from 'react';
import './ProfileScreen.css';
import Store from '../../services/Store';
import PaypalButton from '../PaypalButton/PaypalButton'
import utils from '../../utils';
class ProfileScreen extends React.Component{
	state = {
		profile: null,
	}
	getProfile = async ()=>{
		let profile = await Store.get('profile');
		this.setState({profile});
	}
	componentDidMount(){
		this.getProfile();
	}
	render(){
		let profile = this.state.profile;
		if(!profile){
			return (<div></div>)
		}
		return(
			<div className='ProfileScreen'>
				<span>{utils.moneyFormat(profile.dept)} in debt</span>
				<PaypalButton />
			</div>
		)
	}
}
export default ProfileScreen
