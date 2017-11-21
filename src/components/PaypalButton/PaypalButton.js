import React from 'react';
import './PaypalButton.css';
import PaypalCheckout from 'paypal-checkout';
import Store from '../../services/Store';
class PaypalButton extends React.Component{
	payment = () => {
		return new PaypalCheckout.Promise((resolve, reject)=>{
			Store.post('paypal/create',{})
			.then(data=>{resolve(data.payment_id)})
			.catch(error=>{reject(error)});
		});
	}
	onAuthorize = (data) => {
		console.log('The payment was authorized!');
		console.log('Payment ID = ',data.paymentID);
		console.log('PayerID = ', data.payerID);
		Store.post('paypal/execute', {payment_id: data.paymentID, payer_id: data.payerID})
		.then(data=>{
			this.props.onPaid();
		})
		.catch(error=>console.log(error));
	}
	onCancel = (data)=>{
		console.log('The payment was cancelled!');
		console.log('Payment ID = ', data.paymentID);
	}
	componentDidMount(){
		PaypalCheckout.Button.render({
			env: process.env.REACT_APP_PAYPAL_ENVIRONMENT || 'sandbox',
			payment: this.payment,
			onAuthorize: this.onAuthorize,
			onCancel: this.onCancel,
			style: {
				size: 'small',
				color: 'blue',
				shape: 'rect',
				label: 'pay'
			},
		},'#PaypalButtonContainer');
	}
	render(){
		return(
			<div className='PaypalButton' id="PaypalButtonContainer">

			</div>
		)
	}
}
export default PaypalButton;
