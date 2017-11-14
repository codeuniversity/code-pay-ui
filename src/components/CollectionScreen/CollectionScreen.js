import React from 'react';
import './CollectionScreen.css';
import Store from '../../services/Store';
import Item from '../Item/Item';
class CollectionScreen extends React.Component{
	state = {
		collection: null,
		items: [],
		images: [],
	}
	getCollection = async ()=>{
		let collection_id = this.props.match.params.collection_id;
		let collection = await Store.get(`collections/${collection_id}`);
		this.setState({collection});
	}
	getItems = async ()=>{
		let collection_id = this.props.match.params.collection_id;
		let items = await Store.get(`collections/${collection_id}/items`);
		this.setState({items});
	}
	getImages = async ()=>{
		let collection_id = this.props.match.params.collection_id;
		let images = await Store.get(`collections/${collection_id}/images`);
		this.setState({images});
	}
	loadResources(){
		this.getCollection();
		this.getItems();
		this.getImages();
	}
	componentDidMount(){
		this.loadResources();
	}
	render(){
		return(
			<div className='CollectionScreen'>
				<div className='CollectionScreen-title'></div>
				<div className='CollectionScreen-images'></div>
				<div className='CollectionScreen-items'>
					{this.state.items.map(item=>(
						<Item item={item}/>
					))}
				</div>
			</div>
		)
	}
}
export default CollectionScreen
