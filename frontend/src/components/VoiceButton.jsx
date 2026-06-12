import {useEffect,useState} from "react";


export default function VoiceButton({onResult}){


const [active,setActive]=useState(false);

const [recognition,setRecognition]=useState(null);



useEffect(()=>{


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition)
return;



const rec=new SpeechRecognition();


rec.continuous=true;

rec.interimResults=true;



rec.onresult=(e)=>{


let text="";


for(
let i=e.resultIndex;
i<e.results.length;
i++
){

text+=e.results[i][0].transcript;

}


onResult(text);


}



setRecognition(rec);



},[]);





function start(){


if(active){

recognition.stop();

setActive(false);


}

else{


recognition.start();

setActive(true);


}



}




return(

<button onClick={start}>


{
active
?
"🎤 Listening"
:
"🎤 Speak"

}


</button>


)

}