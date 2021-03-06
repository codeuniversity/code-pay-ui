import React from 'react';
import './ProfileScreen.css';
import Store from '../../services/Store';
import PaypalButton from '../PaypalButton/PaypalButton'
import utils from '../../utils';
import BaseComponent from '../BaseComponent/BaseComponent'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
class TransactionListItem extends React.Component{
	onPay = ()=>{
		let transaction = this.props.transaction;
		this.props.onPay(transaction.id);
	}
	render(){
		let {className, transaction, balance} = this.props;
		return (
			<div className={`TransactionListItem ${className || ''} ${transaction.status}`}>
				<div className="TransactionListItem-name">
					<span className="TransactionListItem-amount">{transaction.amount} </span>
					<span>{transaction.item.name} </span>
					<span>{utils.moneyFormat(transaction.cost)}</span>
					<div>
						<span className="date">{new Date(transaction.created_at).toLocaleString()}</span>
					</div>
				</div>
				<div className="TransactionListItem-actions">
					{transaction.status === "outstanding"? (
					Number(balance) >= Number(transaction.cost) ?
					<RaisedButton label="pay" disabled={Number(balance) < Number(transaction.cost)} onClick={this.onPay}/> : '') :
					<div className="paid-at">
						<div className="label">Paid</div>
						<div>{new Date(transaction.created_at).toLocaleString()}</div>
					</div>}
				</div>
			</div>
		)
	}
}
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
			this.setState({transactions:transactions});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	componentDidMount(){
		this.getProfile();
		this.getTransactions();
	}
	onPaid = (message = 'Thank you for actually paying :)')=>{
		this.showMessage(message);
		this.getProfile();
		this.getTransactions();
	}
	payWithBalanceWith = async (transaction_id)=>{
		try {
			await Store.post(`transactions/${transaction_id}/pay`,{})
			this.onPaid('Fling! Fling! Fling! Fling! Fling! Fling! Fling!');
		} catch (error) {
			if(error.response){
				let message = await error.response.json();
				Object.keys(message).forEach(key=>{
					this.showMessage(`${key}: ${message[key]}`);
				})
			}else{
				this.showMessage(error.message);
			}
		}
	}
	render(){
		this.preRender();
		let {profile, transactions} = this.state;
		if(!profile){
			return (<div>{this.snackBar()}</div>)
		}
		let hasBalance = Number(profile.balance);
		let hasReceivingMoney = Number(profile.receiving_money)
		let both = hasBalance && hasReceivingMoney;
		let either = hasBalance || hasReceivingMoney;
		return(
			<div className='ProfileScreen'>
				<div className="debt-container" style={{clear:"both",overflow:"auto"}}>
					<div className="left">
						<span>You owe {utils.moneyFormat(profile.dept)}</span>
					</div>
					<div className="right">
						<PaypalButton onPaid={this.onPaid}/>
					</div>
				</div>
				<Divider/>
				{either ?
				<div className="balance-container">
					{ hasBalance ? `You have ${utils.moneyFormat(profile.balance)} available` : ''}
					{both ? ` and people owe you ${utils.moneyFormat(profile.receiving_money)}` :
					hasReceivingMoney ? `People owe you ${utils.moneyFormat(profile.receiving_money)}` : ''}

				</div>: ''}
				{either ? <Divider/> : ''}
				{transactions.map(transaction=>(
					<TransactionListItem
					key={transaction.id}
					transaction={transaction}
					balance={profile.balance}
					onPay={this.payWithBalanceWith}/>
				))}
				{this.snackBar()}
			</div>
		)
	}
}
export default ProfileScreen
