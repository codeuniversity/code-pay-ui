import React, { Component } from 'react';
import './App.css';
import Store from './services/Store';
import StorageAdaptor from './services/StorageAdaptor';
import queryString from 'query-string';
import ImageUpload from './ImageUpload';
import PaypalButton from './components/PaypalButton/PaypalButton';
class App extends Component {
  getCollections=()=>{
    Store.get('collections').then(collections=>{
      console.log(collections);
      console.log(Store);
    })
  }
  componentDidMount(){
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
      window.location.search = Store.constructQueryParams(params);
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
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <a href='http://localhost:3000/auth/google_oauth2?auth_origin_url=http://localhost:3005'>Google</a>
        <button onClick={this.getCollections}>Get!</button>
        <ImageUpload onUpload={this.onImageUpload}/>
        <PaypalButton/>
      </div>
    );
  }
}

export default App;
