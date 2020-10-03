const dictForm=document.querySelector("form");
const input=document.querySelector("input");
const word=document.querySelector("#word");
const meaning=document.getElementById("mean");
const example=document.querySelector("#example");
const audio=document.querySelector("#aud");

dictForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    var x=input.value;
    word.innerText="";
    meaning.innerText="";
    example.innerText="";
    fetch("/dict?word="+x).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                if(data.error.message){
                    word.innerText=data.error.message;
                }
                else{
                    word.innerText=data.error;
                }
            }
            else{
                audio.setAttribute("src",data.body[0].phonetics[0].audio);
                audio.play();
                word.innerText=data.body[0].word;
                meaning.innerText="Meaning : "+ data.body[0].meanings[0].definitions[0].definition;
                if(data.body[0].meanings[0].definitions[0].example){
                example.innerText="Example : " + data.body[0].meanings[0].definitions[0].example;}
            }
    })
})})