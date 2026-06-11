import {useState,useEffect} from "react";
import "../App.css";


function AIAvatar(){

const user=localStorage.getItem("user");


const questions=[

{
q:"Tell me about yourself and your background.",
type:"communication"
},

{
q:"Why did you choose Artificial Intelligence and Machine Learning?",
type:"technical"
},

{
q:"Explain your recent project.",
type:"technical"
},

{
q:"What are your strengths and weaknesses?",
type:"communication"
},

{
q:"Where do you see yourself after 5 years?",
type:"confidence"
}

];


const [current,setCurrent]=useState(0);

const [answer,setAnswer]=useState("");

const [scores,setScores]=useState({

confidence:70,
communication:70,
technical:70,
clarity:70

});


const [status,setStatus]=useState(
"Ready for interview"
);



useEffect(()=>{

speak(
`Hi ${user}. Welcome back. ${questions[0].q}`
)

},[]);



function speak(text){

let speech=new SpeechSynthesisUtterance(text);

speech.rate=0.9;

speech.pitch=1;

window.speechSynthesis.speak(speech);

}



function startListening(){


let SpeechRecognition=
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert("Use Chrome browser");

return;

}



let recognition=new SpeechRecognition();


recognition.lang="en-US";

recognition.start();


setStatus("Listening...");


recognition.onresult=(event)=>{


let text =
event.results[0][0].transcript;



setAnswer(text);

analyze(text);


};



recognition.onend=()=>{

setStatus("Processing answer...");

}


}



function analyze(text){


let words=text.toLowerCase().split(" ");


let lengthScore =
Math.min(90,50+words.length);


let technicalBonus =
(
words.includes("python") ||
words.includes("machine") ||
words.includes("ai") ||
words.includes("project")
)
?15:0;



setScores(prev=>({

confidence:
Math.min(
95,
prev.confidence+5
),


communication:
Math.min(
95,
prev.communication+lengthScore/10
),


technical:
Math.min(
95,
prev.technical+technicalBonus
),


clarity:
Math.min(
95,
prev.clarity+5
)

}));



// next question

setTimeout(()=>{


let next =
current+1;



if(next < questions.length){


setCurrent(next);

setAnswer("");

speak(
questions[next].q
);


}


else{


speak(
"Interview completed. Generating your report."
);


setStatus("Completed");


}


},2000);



}





return(

<div className="interview">


<div className="avatar">

<img src="/src/assets/hero.png"/>

</div>



<div className="chat">


<h2>
AI Interviewer
</h2>


<h3>
Hi {user} 👋
</h3>



<div className="question">

{questions[current].q}

</div>



<p className="status">

{status}

</p>



<div className="answer">

{answer || "Your answer will appear here..."}

</div>



<button onClick={()=>speak(questions[current].q)}>
🔊 Ask Question
</button>


<button onClick={startListening}>
🎤 Speak Answer
</button>



<div className="analysis">


<h3>Live Analysis</h3>


<p>
Confidence:
{Math.round(scores.confidence)}%
</p>


<p>
Communication:
{Math.round(scores.communication)}%
</p>


<p>
Technical:
{Math.round(scores.technical)}%
</p>


<p>
Clarity:
{Math.round(scores.clarity)}%
</p>


</div>



</div>


</div>


)


}


export default AIAvatar;