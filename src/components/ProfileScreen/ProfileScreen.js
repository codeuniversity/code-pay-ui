import React from 'react';
import './ProfileScreen.css';
import Store from '../../services/Store';
import PaypalButton from '../PaypalButton/PaypalButton'
import utils from '../../utils';
import BaseComponent from '../BaseComponent/BaseComponent'
class ProfileScreen extends BaseComponent{
	state = Object.assign(this.state,{
		profile: null,
	})
	getProfile = async ()=>{
		try {
			let profile = await Store.get('profile');
			this.setState({profile});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	componentDidMount(){
		this.getProfile();
	}
	onPaid = ()=>{
		this.showMessage('Thank you for actually paying :)');
		this.getProfile();
	}
	render(){
		this.preRender();
		let profile = this.state.profile;
		if(!profile){
			return (<div>{this.snackBar()}</div>)
		}
		return(
			<div className='ProfileScreen'>
				<span>{utils.moneyFormat(profile.dept)} in debt</span>
				<PaypalButton onPaid={this.onPaid}/>
				{this.snackBar()}
			</div>
		)
	}
}
export default ProfileScreen
