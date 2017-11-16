import React from 'react';
import './Home.css';
import Store from '../../services/Store';
import {Card, CardTitle} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import BaseComponent from '../BaseComponent/BaseComponent'
class CollectionListItem extends React.Component{
	render(){
		let {collection} = this.props;
		return (
			<Link to={`/collections/${collection.id}`}>
				<Card className='CollectionListItem'>
					<CardTitle title={collection.name} />
						{/* <CardMedia>
							{collection.images.map(image=>(
								<img src={image.large} alt="" />
							))}
						</CardMedia> */}
				</Card>
			</Link>
		)
	}
}

class Home extends BaseComponent{
	state = Object.assign(this.state,{
		collections:[],
	})
	getCollections = async ()=>{
		try {
			let collections = await Store.get('collections');
			this.setState({collections});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	componentDidMount(){
		this.getCollections();
	}
	render(){
		this.preRender();
		let {collections} = this.state;

		return(
			<div className='Home'>
				{collections.map(collection=>(
					<CollectionListItem collection={collection} key={collection.id}/>
				))}
				<Link to="/add">
					<FloatingActionButton style={{position:'fixed', bottom:20,right:20}}>
						<ContentAdd/>
					</FloatingActionButton>
				</Link>
				{this.snackBar()}
			</div>
		)
	}
}
export default Home;
