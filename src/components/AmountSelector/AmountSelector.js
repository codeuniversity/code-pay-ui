import React from 'react';
import './AmountSelector.css';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/remove';
class AmountSelector extends React.Component{
	onAmountChange = (amount)=>{
		this.props.onChange(this.props.id, amount)
	}
	render(){
		let amount = this.props.amount;
		return(
			<div className='AmountSelector'>
				<ContentClear className="clear" onClick={()=>{this.onAmountChange(amount-1)}}/>
				<span className="AmountSelector-amount">{amount}</span>
				<ContentAdd className="add" onClick={()=>{this.onAmountChange(amount+1)}}/>
			</div>
		)
	}
}
export default AmountSelector
