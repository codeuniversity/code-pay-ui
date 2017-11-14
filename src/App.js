import React, { Component } from 'react';
import './App.css';
import Store from './services/Store';
import StorageAdaptor from './services/StorageAdaptor';
import queryString from 'query-string';
import GoogleLink from './components/GoogleLink/GoogleLink'
import Router from './Router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  getCollections=()=>{
    Store.get('collections').then(collections=>{
      console.log(collections);
      console.log(Store);
    })
  }
  componentWillMount(){
    var params = queryString.parse(window.location.search)

    if (params["auth_token"] && params["uid"] && params["client_id"] && params["expiry"]) {

      var auth_details = {};
      auth_details["access-token"]=params["auth_token"];
      auth_details["uid"]=params["uid"];
      auth_details["client"]=params["client_id"];
      auth_details["expiry"]=params["expiry"];
      auth_details["token-type"]="Bearer";
      StorageAdaptor.setObject("auth_details",auth_details);
      StorageAdaptor.setItem("authenticated","true");
      params["auth_token"] = undefined;
      params["uid"] = undefined;
      params["client_id"] = undefined;
      params["expiry"] = undefined;
    window.location.search = '?';
    }
  }
  onImageUpload= async (location)=>{
    let collections = await Store.get('collections');
    let collection = collections[collections.length-1];
    let image = {tmp_url:location, imageable_id: collection.id, imageable_type: "Collection"};
    let imageResult = await Store.post('images',image);
    console.log(imageResult);
  }
  render() {
    if(Store.isAuthenticated()){
      return (
        <div className="App">
          <Router/>
        </div>
      );
    }else{
      return (
        <div>
          <MuiThemeProvider>
            <GoogleLink />
          </MuiThemeProvider>
        </div>
      )
    }
  }
}

export default App;
