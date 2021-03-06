import React from 'react';
import './CollectionScreen.css';
import Store from '../../services/Store';
import AmountSelector from '../AmountSelector/AmountSelector';
import utils from '../../utils';
import BaseComponent from '../BaseComponent/BaseComponent'
import { GridList, GridTile } from 'material-ui/GridList';
import { RaisedButton } from 'material-ui';
import Divider from 'material-ui/Divider';

class ItemGridTile extends React.Component{
	render(){
		let {onAmountChange, item, amount, index} = this.props;
		let {image, name, price, amount_left, id} = item;
		let titleStyle = {
			color: '#e0fbff',
		}
		let tileStyle = {
			background: utils.getColorByIndex(index),
			width: '100%',
			height: '100%',
		};
		return(
			<div style={{width: '100%',height: '100%', position:'relative'}}>
				<GridTile
				title={name}
				titleStyle={titleStyle}
				style={tileStyle}
				subtitle={<span>{utils.moneyFormat(price)} {amount_left || amount_left === 0 ? `${amount_left} left` : ''}</span>}>
				<img src={image ? image.small : ''} alt=''/>
				</GridTile>
				<AmountSelector id={id} onChange={onAmountChange} amount={amount || 0}/>
			</div>
		)
	}
}
class PriceScreen extends BaseComponent{
render(){
	let price = this.props.price;
	let correctPrice = Math.round(price*100)/100;
	if(!correctPrice){
		return (
			<div></div>
		)
	}
	return (
		<div className="PriceScreen">
			<Divider/>
			<div className="margy">
				<span className="money-total">{utils.moneyFormat(price)} total</span>
				{this.props.children}
			</div>
		</div>
	)
}
}
class CollectionScreen extends BaseComponent{
	state = Object.assign(this.state,{
		collection: null,
		items: [],
		images: [],
		transactions: {},
		buying: false,
	})
	getCollection = async ()=>{
		try {
			let collection_id = this.props.match.params.collection_id;
			let collection = await Store.get(`collections/${collection_id}`);
			this.setState({collection});
		} catch (error) {
			this.showMessage(error.message);
		}

	}
	getItems = async ()=>{
		try {
			let collection_id = this.props.match.params.collection_id;
			let items = await Store.get(`collections/${collection_id}/items`);
			this.setState({items});
		} catch (error) {
			this.showMessage(error.message);
		}

	}
	getImages = async ()=>{
		try {
			let collection_id = this.props.match.params.collection_id;
			let images = await Store.get(`collections/${collection_id}/images`);
			this.setState({images});
		} catch (error) {
			this.showMessage(error.message);
		}

	}
	loadResources = async ()=>{
		this.getCollection();
		this.getItems();
		this.getImages();
	}
	componentDidMount(){
		this.loadResources();
	}
	onAmountChange = (id, amount)=>{
		let transactions = Object.assign(this.state.transactions);
		transactions[id] = amount;
		this.setState({transactions});
	}
	getTransactionArr = ()=>{
		let transactions=this.state.transactions;
		let keys = Object.keys(transactions);
		let transactionArr = keys.map(id=>{
			let item = this.getItemById(id);
			let amount = transactions[id]
			return {id: id, item_name:item.name, item_price: item.price, amount: amount}
		});
		return transactionArr;
	}
	getPrice = () =>{
		let transactions = this.getTransactionArr();
		let price = 0;
		transactions.forEach(transaction=>{
			price += transaction.item_price * transaction.amount;
		});
		return price;
	}
	getItemById(id){
		let items = this.state.items;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if(item.id === id){
				return item
			}
		}
	}
	makeTransactions = async ()=>{
		let transactionArr = this.getTransactionArr();
		this.setState({buying:true});
		try {
			let promises = transactionArr.filter(t=>t.amount>0).map(t=>{
				let transaction = {item_id: t.id, amount: t.amount};
				return Store.post('transactions',transaction);
			});
		await Promise.all(promises);

		this.props.history.push("/profile");
		this.props.history.goForward();
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
		this.setState({buying:false});
	}
	colAmount = ()=>{
		let width = window.innerWidth < 800 ? window.innerWidth : 800;
		return Math.floor(width/180);
	}
	render(){
		this.preRender();
		let {collection, transactions, items, buying} = this.state;
		let totalPrice = this.getPrice();
		return(
			<div className='CollectionScreen'>
				<div className='CollectionScreen-title'>{collection ? <h2 className=" margy light">{collection.name}</h2> : ''}</div>
				<div className='CollectionScreen-images'></div>
				<div className='CollectionScreen-items'>
					<GridList padding={2} cols={this.colAmount()}>
						{items.map((item, index)=>(
							<ItemGridTile
							index={index}
							item={item}
							key={item.id}
							onAmountChange={this.onAmountChange}
							amount={transactions[item.id]}/>
						))}
					</GridList>
				</div>
				<div className='CollectionScreen-price'>
					<PriceScreen price={totalPrice}>
						<RaisedButton
						onClick={this.makeTransactions}
						disabled={buying}
						label='Buy'
						style={{float:'right'}}
						primary={true}/>
					</PriceScreen>
				</div>
			{this.snackBar()}
			</div>
		)
	}
}
export default CollectionScreen
