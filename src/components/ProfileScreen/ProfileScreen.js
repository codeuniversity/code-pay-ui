import React from 'react';
import './ProfileScreen.css';
import Store from '../../services/Store';
import PaypalButton from '../PaypalButton/PaypalButton'
import utils from '../../utils';
import BaseComponent from '../BaseComponent/BaseComponent'
import { transitions } from 'material-ui/styles';
class ProfileScreen extends BaseComponent{
	state = Object.assign(this.state,{
		profile: null,
		transactions:[],
	})
	getProfile = async ()=>{
		try {
			let profile = await Store.get('profile');
			this.setState({profile});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	getTransactions= async () =>{
		try {
			let transactions = await Store.get('transactions');
			this.setState({transactions});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	componentDidMount(){
		this.getProfile();
		this.getTransactions();
	}
	onPaid = ()=>{
		this.showMessage('Thank you for actually paying :)');
		this.getProfile();
	}
	render(){
		this.preRender();
		let {profile, transactions} = this.state;
		if(!profile){
			return (<div>{this.snackBar()}</div>)
		}
		return(
			<div className='ProfileScreen'>
				<span>{utils.moneyFormat(profile.dept)} in debt</span>
				<PaypalButton onPaid={this.onPaid}/>
				{transactions.map(transaction=>(
					<div>
						<h4>{transaction.item.name}</h4>
						<p>{transaction.amount}</p>
					</div>
				))}
				{this.snackBar()}
			</div>
		)
	}
}
export default ProfileScreen
