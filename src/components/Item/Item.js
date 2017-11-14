import React from 'react';
import './Item.css';
import utils from '../../utils';
import {Card, CardText} from 'material-ui/Card';
import ImageUpload from '../../ImageUpload'
import Store from '../../services/Store';
class Item extends React.Component{
	updateImage = (location) =>{
		let item_id = this.props.item.id;
		let image = {
			tmp_url: location,
			imageable_id: item_id,
			imageable_type: 'Item',
		}
		Store.post('images',image);
	}
	render(){
		let {image, name, price, amount} = this.props.item;
		return(
			<Card className='Item margy'>
				{image ? <img src={image.thumb} className="Item-img"/> : ''}
				<div className='Item-body'>
					<h2 className='marginless Item-name'>{name}</h2>
					<h5 className='marginless Item-description'>{utils.moneyFormat(price)} {amount ? `${amount} left` : ''}</h5>
				</div>
				{/* <ImageUpload onUpload={this.updateImage}/> */}
			</Card>
		)
	}
}
export default Item
