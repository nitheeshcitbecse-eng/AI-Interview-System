import {useState} from "react";
import hero from "../assets/hero.png";
import "../App.css";


export default function AIAvatar({setReport}){


const [messages,setMessages]=useState([
{
ai:"Hi 👋 Tell me about yourself."
}
]);


const [question,setQuestion]=useState(0);

const [finished,setFinished]=useState(false);


const [scores,setScores]=useState({

communication:50,
technical:50,
confidence:50,
clarity:50

});



const interviewQuestions=[

"Tell me about yourself.",

"Explain your recent project.",

"What technologies did you use?",

"What problem did your project solve?",

"What are your strengths?"

];



function speak(text){


let speech=new SpeechSynthesisUtterance(text);

speech.rate=0.9;

window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);

}



function start(){


speak(
interviewQuestions[question]
);


listen();

}




function listen(){


let Recognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!Recognition){

alert("Use Chrome browser");

return;

}



let rec=new Recognition();


rec.lang="en-US";

rec.start();



rec.onresult=(e)=>{


let answer =
e.results[0][0].transcript;



setMessages(prev=>[

...prev,

{
user:answer
}

]);



analyse(answer);


};


}




function analyse(answer){


let text=answer.toLowerCase();


let newScore={...scores};



// communication

if(answer.length>80)
newScore.communication+=15;

else
newScore.communication-=5;



// technical detection

let tech=[

"java",
"python",
"react",
"javascript",
"ai",
"machine learning",
"sql"

];


tech.forEach(word=>{

if(text.includes(word)){

newScore.technical+=10;

}

});



// confidence

if(
text.includes("created") ||
text.includes("built") ||
text.includes("developed")
){

newScore.confidence+=10;

}



newScore.clarity =
Math.min(
90,
newScore.communication
);



setScores(newScore);





// FOLLOW UP LOGIC


let nextQuestion="";



if(text.includes("project")){


nextQuestion=
"What was your role in that project?";


}

else if(text.includes("react")){


nextQuestion=
"Why did you choose React?";


}

else if(text.includes("java")){


nextQuestion=
"Explain one Java concept you know.";

}


else if(answer.length<30){


nextQuestion=
"Can you explain that with more details?";


}


else{


let next=question+1;


if(next>=interviewQuestions.length){


finishInterview(newScore);

return;


}


setQuestion(next);


nextQuestion=
interviewQuestions[next];


}





setTimeout(()=>{


setMessages(prev=>[

...prev,

{
ai:nextQuestion
}

]);

speak(nextQuestion);


},1200);



}




function finishInterview(finalScore){



let total=Math.round(

(
finalScore.communication+
finalScore.technical+
finalScore.confidence+
finalScore.clarity

)/4

);



setFinished(true);



setReport({

overall:total,

...finalScore,


strengths:

total>70
?
[
"Good communication",
"Good technical explanation"
]
:
[],


improve:

total<70
?
[
"Give detailed answers",
"Explain projects better"
]
:
[]

});



setMessages(prev=>[

...prev,

{
ai:"🎉 Interview completed. Your report is ready."
}

]);



speak(
"Interview completed. Your report is ready."
);



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



<button onClick={start} disabled={finished}>

🎤 Speak Answer

</button>



{
finished &&
<h2>
✅ Report Generated
</h2>
}



</div>




<div className="rankCard">


<h2>
LIVE SCORE
</h2>


<h1>
{
Math.round(
(
scores.communication+
scores.technical+
scores.confidence+
scores.clarity
)/4
)
}
/100
</h1>


<p>
Communication : {scores.communication}%
</p>

<p>
Technical : {scores.technical}%
</p>

<p>
Confidence : {scores.confidence}%
</p>

<p>
Clarity : {scores.clarity}%
</p>


</div>


</div>

)

}