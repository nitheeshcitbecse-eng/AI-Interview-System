import {useState} from "react";
import hero from "../assets/hero.png";
import "../App.css";


export default function AIAvatar({setReport}){


const questions=[

"Tell me about yourself.",

"Why did you choose this career field?",

"Explain your project.",

"What technologies did you use?",

"What challenges did you face?",

"What are your strengths?"

];



const [current,setCurrent]=useState(0);


const [messages,setMessages]=useState([
{
type:"ai",
text:"Hello 👋 Tell me about yourself."
}
]);


const [listening,setListening]=useState(false);


const [score,setScore]=useState({

overall:50,
communication:50,
technical:50,
confidence:50,
clarity:50

});



function speak(text){


const speech =
new SpeechSynthesisUtterance(text);


speech.rate=0.9;


window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);


}





function startInterview(){


speak(
questions[current]
);


setTimeout(()=>{

startListening();

},1500);


}




function startListening(){


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert(
"Please use Chrome and allow microphone"
);

return;

}



const recognition =
new SpeechRecognition();



recognition.lang="en-US";

recognition.continuous=false;

recognition.interimResults=false;



recognition.start();



recognition.onstart=()=>{

setListening(true);

};



recognition.onresult=(event)=>{


const answer =
event.results[0][0].transcript;



setMessages(prev=>[

...prev,

{
type:"user",
text:answer
}

]);



analyseAnswer(answer);


};



recognition.onend=()=>{

setListening(false);

};



}




function analyseAnswer(answer){


let text =
answer.toLowerCase();



let newScore={
...score
};




// Communication

if(answer.length>70){

newScore.communication+=15;
newScore.clarity+=10;

}

else{

newScore.communication-=5;

}





// Technical


let skills=[

"java",
"python",
"react",
"javascript",
"ai",
"machine learning",
"sql"

];



skills.forEach(skill=>{


if(text.includes(skill)){

newScore.technical+=10;

}


});




// Confidence


if(

text.includes("built") ||
text.includes("created") ||
text.includes("developed")

){

newScore.confidence+=10;

}




newScore.overall=Math.round(

(
newScore.communication+
newScore.technical+
newScore.confidence+
newScore.clarity

)/4

);



setScore(newScore);



setReport({

...newScore,

strengths:

newScore.overall>70

?
[
"Good communication",
"Good technical knowledge"
]

:
[],


improve:

newScore.overall<70

?
[
"Give detailed answers",
"Explain projects deeply"
]

:
[]

});






let nextQuestion;



if(text.includes("project")){


nextQuestion=
"Great. What was your role in that project?";


}

else if(text.includes("react")){


nextQuestion=
"Why did you select React?";


}

else if(text.includes("java")){


nextQuestion=
"Explain one Java concept you know.";


}

else{


let next=current+1;



if(next>=questions.length){


nextQuestion=
"Interview completed. Your report is generated.";


speak(nextQuestion);


return;


}



setCurrent(next);


nextQuestion =
questions[next];

}



setTimeout(()=>{


setMessages(prev=>[

...prev,

{
type:"ai",
text:nextQuestion
}

]);



speak(nextQuestion);



},1000);



}





return(

<div className="interviewBox">


<div className="avatarBox">


<img
src={hero}
alt="AI"
/>


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
m.type==="ai" &&

<p className="aiMsg">

🤖 {m.text}

</p>

}



{
m.type==="user" &&

<p className="userMsg">

👤 {m.text}

</p>

}



</div>


))

}


</div>




<button onClick={startInterview}>

🎤 Speak Answer

</button>



{
listening &&

<h3 className="listen">

🎙 Listening...

</h3>

}





<div className="miniScore">


<h2>
Live Score
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


</div>

)

}