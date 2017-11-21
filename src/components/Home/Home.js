import React from 'react';
import './Home.css';
import Store from '../../services/Store';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import BaseComponent from '../BaseComponent/BaseComponent'
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';
import utils from '../../utils';
import Paper from 'material-ui/Paper';
class CollectionGridListItem extends React.Component{

	render(){
		let {collection, index} = this.props;
		let image = collection.main_image

		let titleStyle = {
			color: '#e0fbff',
		}
		let tileStyle = {
			background: utils.getColorByIndex(index),
		};

		return (
			<Link to={`/collections/${collection.id}`}>
				<GridTile
				title={collection.name}
				titleStyle={titleStyle}
				style={tileStyle}
				titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
				>
				<img src={image ? image.small : ''} alt='' />
				</GridTile>
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
	colAmount = ()=>{
		let width = window.innerWidth < 800 ? window.innerWidth : 800;
		return Math.floor(width/180);
	}
	render(){
		this.preRender();
		let {publicCollections, myCollections} = this.state;
		let noOwnCollectionMessage;
		if (myCollections.length === 0){
			noOwnCollectionMessage = (
				<Paper style={{margin:10,padding:10, paddingBottom: 30}}>
					You have no own Flings, create one:
					<Link to="/add">
						<FloatingActionButton secondary={true} mini={true} style={{position:'relative', top: 10, left: 10}}>
							<ContentAdd/>
						</FloatingActionButton>
					</Link>
				</Paper>
			)
		}
		return(
			<div className='Home'>
				<div className="margy padded-left"><h3 className="light marginless">Public Flings</h3></div>
				<GridList padding={2} cols={this.colAmount()}>
					{publicCollections.map((collection, index)=>(
						<CollectionGridListItem index={index} collection={collection} key={collection.id}/>
					))}
				</GridList>
				<Divider style={{marginTop:10}}/>
				<div className="margy padded-left"><h3 className="light marginless">Your Flings</h3></div>
				<GridList padding={2} cols={this.colAmount()}>
					{myCollections.map((collection, index)=>(
						<CollectionGridListItem index={index} collection={collection} key={collection.id}/>
					))}
				</GridList>
				{noOwnCollectionMessage}
				<Link to="/add">
					<FloatingActionButton secondary={true} style={{position:'fixed', bottom:20,right:20}}>
						<ContentAdd/>
					</FloatingActionButton>
				</Link>
				{this.snackBar()}
			</div>
		)
	}
}
export default Home;


