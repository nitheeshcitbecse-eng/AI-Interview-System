import {useState} from "react";
import "../App.css";


function AIAvatar(){

const user=localStorage.getItem("user");


const questions=[

"Tell me about yourself",

"Why do you want this field?",

"What are your technical skills?",

"Explain your recent project",

"What are your strengths?"

];


const [index,setIndex]=useState(0);
const [answer,setAnswer]=useState("");
const [score,setScore]=useState(0);


function speak(){

let speech=new SpeechSynthesisUtterance(
questions[index]
);

speechSynthesis.speak(speech);

}



function listen(){


let SpeechRecognition=
window.SpeechRecognition ||
window.webkitSpeechRecognition;


if(!SpeechRecognition){

alert("Browser does not support voice");

return;

}


let rec=new SpeechRecognition();


rec.start();


rec.onresult=(e)=>{


let text=e.results[0][0].transcript;

setAnswer(text);

setScore(score+10);


}


}



function next(){


setIndex((index+1)%questions.length);


}



return(

<div className="interview">


<img src="/hero.png"/>


<div className="chat">


<h2>
Hi {user} 👋
</h2>


<h3>
{questions[index]}
</h3>


<p>{answer}</p>


<button onClick={speak}>
🔊 Ask
</button>


<button onClick={listen}>
🎤 Answer
</button>


<button onClick={next}>
Next
</button>


<h3>
Score : {score}/100
</h3>


</div>


</div>


)


}


export default AIAvatar;