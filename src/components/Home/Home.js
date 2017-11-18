import React from 'react';
import './Home.css';
import Store from '../../services/Store';
import {Card, CardTitle} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import BaseComponent from '../BaseComponent/BaseComponent'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
class CollectionListItem extends React.Component{
	render(){
		let {collection} = this.props;
		return (
			<Link to={`/collections/${collection.id}`}>
				<Paper className='CollectionListItem margy padded' style={{overflow:'auto', minHeight:72}}>
				{collection.main_image ? <img src={collection.main_image.thumb} className="Collection-img" alt=''/> : ''}
				<h2 className="light Collection-name marginless">{collection.name}</h2>
				</Paper>
			</Link>
		)
	}
}

class Home extends BaseComponent{
	state = Object.assign(this.state,{
		publicCollections: [],
		myCollections: []
	})
	getPublicCollections = async ()=>{
		try {
			let publicCollections = await Store.get('collections');
			this.setState({publicCollections});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	getMyCollections = async ()=>{
		try {
			let myCollections = await Store.query('collections',{mine: true});
			this.setState({myCollections});
		} catch (error) {
			this.showMessage(error.message);
		}
	}
	componentDidMount(){
		this.getPublicCollections();
		this.getMyCollections();
	}
	render(){
		this.preRender();
		let {publicCollections, myCollections} = this.state;

		return(
			<div className='Home'>
				<div className="margy padded-left"><h3 className="light marginless">Public Flings</h3></div>
				{publicCollections.map(collection=>(
					<CollectionListItem collection={collection} key={collection.id}/>
				))}
				<Divider/>
				<div className="margy padded-left"><h3 className="light marginless">Your Flings</h3></div>
				{myCollections.map(collection=>(
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
