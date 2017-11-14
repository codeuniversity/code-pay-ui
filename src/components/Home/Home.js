import React from 'react';
import './Home.css';
import Store from '../../services/Store';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom';

class CollectionListItem extends React.Component{
	render(){
		let {collection, className} = this.props;
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

class Home extends React.Component{
	state = {
		collections:[],
	}
	getCollections = async ()=>{
		let collections = await Store.get('collections');
		this.setState({collections});
	}
	componentDidMount(){
		console.log('bla');
		this.getCollections();
	}
	render(){
		let {collections} = this.state;

		return(
			<div className='Home'>
				{collections.map(collection=>(
					<CollectionListItem collection={collection}/>
				))}
			</div>
		)
	}
}
export default Home;
