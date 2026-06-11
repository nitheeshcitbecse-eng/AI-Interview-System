import {useState} from "react";
import "../App.css";


export default function AIAvatar(){


const user=localStorage.getItem("user");


const questions=[

"Tell me about yourself.",

"Why did you choose this career field?",

"What technical skills do you have?",

"Explain your latest project.",

"What challenges did you face in your project?",

"How do you handle pressure?",

"Where do you see yourself in five years?"

];


const [index,setIndex]=useState(0);

const [chat,setChat]=useState(
[
{
ai:`Hi ${user} 👋. Let's start your interview. ${questions[0]}`
}
]
);


const [listening,setListening]=useState(false);


const [score,setScore]=useState({

confidence:70,
technical:70,
communication:70,
clarity:70

});



function speak(text){

let speech=new SpeechSynthesisUtterance(text);

speech.rate=0.9;

window.speechSynthesis.speak(speech);

}



function startInterview(){


speak(
questions[index]
);


listen();


}




function listen(){


let SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;


if(!SpeechRecognition){

alert("Use Chrome browser");

return;

}


let recognition=new SpeechRecognition();


recognition.lang="en-US";


recognition.start();


setListening(true);



recognition.onresult=(e)=>{


let answer=e.results[0][0].transcript;



setChat(prev=>[

...prev,

{
user:answer
}

]);



analyzeAnswer(answer);



};


}



function analyzeAnswer(answer){


let text=answer.toLowerCase();



let newScore={...score};



if(answer.length>40){

newScore.communication+=8;

newScore.clarity+=5;

}


if(
text.includes("python") ||
text.includes("java") ||
text.includes("react") ||
text.includes("machine")
){

newScore.technical+=10;

}



newScore.confidence+=5;



setScore(newScore);



let followUp="";


if(text.includes("project")){


followUp=
"Great. Can you explain what technologies you used in that project?";


}

else if(text.includes("skill")){


followUp=
"Nice. Which skill are you most confident about and why?";


}

else if(text.includes("ai")){


followUp=
"Interesting. Explain one real world application of AI.";


}

else{


followUp=
questions[index+1] ||
"Tell me more about your experience.";

}



setTimeout(()=>{


let next=index+1;


setIndex(next);



setChat(prev=>[

...prev,

{
ai:followUp
}

]);


speak(followUp);



},1500);



}





return(


<div className="interview">


<div className="avatar">

<img src="/src/assets/hero.png"/>

</div>



<div className="chat">


<h2>
🤖 AI Interviewer
</h2>


<div className="messages">


{
chat.map((c,i)=>(

<div key={i}>


{
c.ai &&
<p className="ai">
AI: {c.ai}
</p>
}


{
c.user &&
<p className="user">
You: {c.user}
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
<p>
Listening...
</p>
}




<div className="liveScore">


<h3>
Live Analysis
</h3>


<p>
Confidence {score.confidence}%
</p>


<p>
Communication {score.communication}%
</p>


<p>
Technical {score.technical}%
</p>


<p>
Clarity {score.clarity}%
</p>


</div>


</div>


</div>


)


}