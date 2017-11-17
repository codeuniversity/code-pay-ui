import React from 'react';
import ImageStore from './services/ImageStore';
import './ImageUpload.css';
import Store from './services/Store';
class ImageUpload extends React.Component{
  state={
    file:null,
    imgSrc:null,
    formData:null,
    uploading:false,
    finishedUpload:false,
  }
  handleChange = (e)=>{

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e)=>{
      this.setState({imgSrc:e.target.result});
    }
    reader.readAsDataURL(file);
    this.setState({file:file});
    if(this.props.autoUpload){
      this.uploadFile(file);
    }
  }
  buttonShouldBeDisabled=()=>{
    return this.state.file == null;
  }
  handleSubmit = ()=>{
    var file = this.state.file;
    this.uploadFile(file);

  }
  uploadFile = (file)=>{
    this.setState({uploading:true,finishedUpload:false});
    Store.query("signed_image_url",{}).then((response)=>{
      ImageStore.uploadFile(response.presignedPost,file,(location)=>{
        this.props.onUpload(location);
        this.setState({uploading:false,finishedUpload:true});
      })}).catch(error=>{
        console.log(error);
      });
  }
render(){

      return (
    <div className="ImageUpload">
      <div className="image-container">
      { this.state.imgSrc ? <img src={this.state.imgSrc} alt="" className="image-preview"/> : <div></div>}

      </div>
      <form className="file-upload">
          <input type="file" accept="image/*" id="input" name="file" onChange={this.handleChange} className="image-input"/>

      </form>
      {this.state.uploading ? <span>uploading...</span> : <div></div>}
      {this.state.finishedUpload ? <span >done</span> : <div></div>}

      {!this.props.autoUpload ? <button onClick={this.handleSubmit} disabled={this.buttonShouldBeDisabled()}>Upload</button> : <div></div>}

    </div>
  )
}


}
export default ImageUpload;
