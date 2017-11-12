function uploadFile(presignedPost,file,cb){
    var formData = new FormData();
    Object.keys(presignedPost.fields).forEach((key) => {
        formData.append(key, presignedPost.fields[key]);
      });
      formData.append('file',file);
      formData.set('Content-Type',file.type) ;
      const presignedUrl = presignedPost.url

      fetch(presignedUrl, { method: 'POST', body: formData, "Content-Type" : file.type }).then((response)=>{
        console.log(response);
        response.text().then((text)=>{
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(text,"text/xml");
          var location = xmlDoc.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
          cb(location);
        });
      });
  }
  const ImageStore = {uploadFile};
  export default ImageStore;