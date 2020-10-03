const request=require("request");
const meaning=(word,callback)=>{
    url="https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(word).toLowerCase();
    request({url:url,json:true},(err,res)=>{
        if(!Array.isArray(res.body)){
            callback(res.body);
        }
        else{
            callback(undefined,res)
        }
    })
}

module.exports={
    meaning:meaning,
}