import React from 'react';
import './BaseComponent.css';
import {Snackbar} from 'material-ui'
import Store from '../../services/Store';
class BaseComponent extends React.Component{
	state = {
		message: '',
		snackbarOpen: false,
	}
	onSnackbarRequestClose = ()=>{
		this.setState({snackbarOpen:false});
	}
	showMessage = (message)=>{
		this.setState({message, snackbarOpen: true});
	}
	snackBar = ()=>{
		let {message, snackbarOpen} = this.state;
		return(
			<Snackbar
			open={snackbarOpen}
			message={message}
			autoHideDuration={10000}
			onRequestClose={this.onSnackbarRequestClose}/>
		)
	}
	preRender = ()=>{
		if(!Store.isAuthenticated()){
			window.location.reload();
		}
	}
}
export default BaseComponent;
