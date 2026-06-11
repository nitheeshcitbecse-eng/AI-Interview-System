import {useState} from "react";
import hero from "../assets/hero.png";
import "../App.css";


export default function AIAvatar({setReport}){


const questions=[

"Tell me about yourself.",

"Why did you choose this career?",

"Explain your project.",

"What are your technical skills?",

"What is your biggest strength?"

];


const [index,setIndex]=useState(0);

const [listening,setListening]=useState(false);

const [messages,setMessages]=useState([
{
ai:questions[0]
}
]);



const [score,setScore]=useState({

overall:50,
technical:50,
communication:50,
confidence:50

});





function speak(text){


let speech=new SpeechSynthesisUtterance(text);

speech.rate=0.9;

window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);


}




function startInterview(){


speak(
questions[index]
);


startVoice();


}





function startVoice(){



const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert(
"Please open in Chrome and allow microphone"
);

return;

}



let recognition =
new SpeechRecognition();



recognition.lang="en-US";


recognition.start();



setListening(true);



recognition.onresult=(event)=>{


let text =
event.results[0][0].transcript;



setMessages(prev=>[

...prev,

{
user:text
}

]);



analyse(text);



};



recognition.onend=()=>{

setListening(false);

};


}





function analyse(text){



let t=text.toLowerCase();


let newScore={...score};



if(text.length>80){

newScore.communication+=15;

newScore.confidence+=10;

}

else{

newScore.communication-=5;

}



if(
t.includes("java")||
t.includes("python")||
t.includes("react")||
t.includes("ai")
){

newScore.technical+=15;

}



newScore.overall=Math.round(

(
newScore.communication+
newScore.technical+
newScore.confidence
)/3

);



setScore(newScore);



setReport(newScore);



let next =
questions[index+1] ||
"Interview completed. Great work.";



setIndex(index+1);



setTimeout(()=>{


setMessages(prev=>[

...prev,

{
ai:next
}

]);



speak(next);



},1200);



}





return(

<div className="interviewBox">


<div className="avatarBox">


<img src={hero}/>


</div>



<div className="chatBox">


<h1>
🤖 AI Interviewer
</h1>



<div className="messages">


{

messages.map((m,i)=>(


<div key={i}>


{
m.ai &&
<p className="aiMsg">
🤖 {m.ai}
</p>
}



{
m.user &&
<p className="userMsg">
👤 {m.user}
</p>
}



</div>


))

}


</div>



<button onClick={startInterview}>

🎤 Start Speaking

</button>



{
listening &&

<h2 className="listen">

🎙 Listening...

</h2>

}


</div>



<div className="rankCard">


<h2>
Live Rank Card
</h2>


<h1>
{score.overall}/100
</h1>


<p>
Communication {score.communication}%
</p>


<p>
Technical {score.technical}%
</p>


<p>
Confidence {score.confidence}%
</p>



</div>



</div>

)

}