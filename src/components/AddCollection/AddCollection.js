import React from 'react';
import './AddCollection.css';
import TextField from 'material-ui/TextField';
import ImageUpload from '../../ImageUpload';
import RaisedButton from 'material-ui/RaisedButton';
import Store from '../../services/Store';
import {withRouter} from 'react-router-dom';
import { Divider } from 'material-ui';

class EditItem extends React.Component{
	onChange = (e)=>{
		let index = this.props.index;
		this.props.onChange(index, e.target.name, e.target.value)
	}
	onImageLocationUpdate = (location)=>{
		let index = this.props.index;
		this.props.onChange(index,'imgLocation', location);
	}
	render(){
		let {item} = this.props;
		let numberInputStyle = {
			width: '50%',
		}
		return(
			<div className="margy padded EditItem">
				<Divider/>

				<TextField
				floatingLabelText="Item Name"
				value={item.name}
				name='name'
				onChange={this.onChange}
				fullWidth={true}/>

				<TextField
				floatingLabelText="Price of an Item"
				value={item.price}
				type="number"
				name='price'
				onChange={this.onChange}
				style={numberInputStyle}/>

				<TextField
				floatingLabelText="Amount of Items"
				value={item.amount}
				type="number"
				name='amount'
				onChange={this.onChange}
				style={numberInputStyle}/>
				<h4 className="light grey">Image</h4>
				<ImageUpload className="margy" autoUpload={true} onUpload={this.onImageLocationUpdate}/>
			</div>
		)
	}
}
class AddCollection extends React.Component{
	state = {
		collectionName: '',
		collectionImageLocation: null,
		items: [],
	}
	addItem = ()=>{
		let items = this.state.items.slice();
		items.push({name:'', price:null, amount: null});
		this.setState({items});
	}
	checkIfNewItemNecessary = ()=>{
		let items = this.state.items;
		let necessity = true;
		items.forEach(item => {
			if(!(item.name && item.price)){
				necessity = false;
			}
		});
		if(necessity){
			this.addItem();
		}
	}
	onNameChange = (e)=>{
		e.preventDefault();
		this.setState({collectionName:e.target.value});
	}
	onCollectionImageChange = (location)=>{
		this.setState({collectionImageLocation:location});
	}
	componentDidMount(){
		this.addItem();
	}
	onItemChange = (index, key, value)=>{
		let items = this.state.items.slice();
		items[index][key] = value;
		this.setState({items});
		this.checkIfNewItemNecessary();
	}
	shouldButtonBeDisabled = ()=>{
		let {collectionName, items} = this.state;
		if(!collectionName){
			return true;
		}
		let validItemCount = 0;
		items.forEach(item=>{
			if(item.name && item.price){
				validItemCount++;
			}
		});
		if(validItemCount === 0){
			return true;
		}
		return false;
	}
	save = ()=>{
		let {collectionName, collectionImageLocation, items} = Object.assign({},this.state);
		Store.post('collections',{name: collectionName}).then(collection=>{
			if(collectionImageLocation){
				Store.post(`collections/${collection.id}/images`,{tmp_url: collectionImageLocation});
			}
			let promises = items.map(item=>{
				if(!(item.name && item.price)){
					return new Promise((resolve,reject)=>{
						resolve();
				})}
				let itemObj = {name: item.name, price: item.price};
				if(item.amount){
					itemObj.amount = item.amount;
				}
				return Store.post(`collections/${collection.id}/items`,itemObj).then(itemResult=>{
					if(item.imgLocation){
						let image = {
							tmp_url: item.imgLocation,
							imageable_id:itemResult.id,
							imageable_type:'Item',
						}
						Store.post('images',{image}).then(imageResult=>{
							console.log(imageResult);
						});
					}
				});
			});
			Promise.all(promises).then(()=>{
				this.props.history.push(`/`);
				this.props.history.goForward();
			});
		});
		this.setState({collectionName:'',items:[{name:'', price:null, amount: null}]});
	}
	render(){
		let {collectionName, items} = this.state;
		return(
			<div className='AddCollection'>
				<div className="margy padded">

					<TextField
					floatingLabelText="Item Group Name"
					value={collectionName}
					autoFocus={true}
					onChange={this.onNameChange}
					fullWidth={true}/>
					<h4 className="light grey">Image</h4>
					<ImageUpload autoUpload={true} onUpload={this.onCollectionImageChange}/>
				</div>
				{items.map((item, index)=>(
					<EditItem item={item} index={index} onChange={this.onItemChange}/>
				))}
				<RaisedButton
				label="Save"
				primary={true}
				style={{margin:10,float:'right'}}
				onClick={this.save}
				disabled={this.shouldButtonBeDisabled()} />
			</div>
		)
	}
}
export default withRouter(AddCollection);
