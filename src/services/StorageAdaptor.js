function setObject(key,obj){
    localStorage.setItem(key,JSON.stringify(obj));
  }

  function getObject(key){
    return JSON.parse(localStorage.getItem(key));
  }
  function setItem(key,val){
    localStorage.setItem(key,val);
  }
  function getItem(key,val){
    return localStorage.getItem(key,val);
  }
  function remove(key){
    localStorage.removeItem(key);
  }

  function getResultFromCache(url,cb){
    var result = getObject(url);
    if(result){
      cb(result);
    }
  }
  function cacheResult(url,result){
    setObject(url,result);
  }


  const StorageAdaptor = {setObject,getObject,setItem,getItem,remove,getResultFromCache,cacheResult};
  export default StorageAdaptor;