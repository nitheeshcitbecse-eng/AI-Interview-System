import {useState,useEffect} from "react";
import "../App.css";


export default function AIAvatar({setReport}){


const user=localStorage.getItem("user");


const questions=[

"Tell me about yourself.",

"Why did you choose this field?",

"What are your technical skills?",

"Explain your project.",

"What challenges did you face?",

"Why should we hire you?"

];


const [current,setCurrent]=useState(0);


const [chat,setChat]=useState([
{
ai:`Hi ${user} 👋. Welcome to your AI interview. ${questions[0]}`
}
]);


const [listening,setListening]=useState(false);



let scores={
communication:50,
technical:50,
confidence:50,
clarity:50
};



useEffect(()=>{

speak(
`Hi ${user}. ${questions[0]}`
);

},[]);




function speak(text){


let speech=new SpeechSynthesisUtterance(text);

speech.rate=0.9;

speech.pitch=1;


window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);


}





function startListening(){


let SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert("Please use Chrome");

return;

}



let recognition=new SpeechRecognition();


recognition.lang="en-US";

recognition.start();


setListening(true);



recognition.onresult=(event)=>{


let answer =
event.results[0][0].transcript;



setChat(prev=>[

...prev,

{
user:answer
}

]);



analyzeAnswer(answer);



};



recognition.onend=()=>{

setListening(false);

};


}





function analyzeAnswer(answer){


let text=answer.toLowerCase();



// communication

if(answer.length>70)
scores.communication+=20;

else
scores.communication-=5;



// technical detection


let tech=[

"java",
"python",
"react",
"ai",
"machine learning",
"sql",
"database",
"algorithm"

];


tech.forEach(word=>{

if(text.includes(word)){

scores.technical+=8;

}

});




// confidence

if(
text.includes("created") ||
text.includes("developed") ||
text.includes("built")
){

scores.confidence+=10;

}

else{

scores.confidence-=5;

}




scores.clarity =
Math.min(
90,
scores.communication
);





let total=Math.round(

(
scores.communication+
scores.technical+
scores.confidence+
scores.clarity

)/4

);





setReport({

overall:total,

communication:
scores.communication,

technical:
scores.technical,

confidence:
scores.confidence,

clarity:
scores.clarity,

strengths:

total>70
?
["Good explanation","Good confidence"]
:
[],

improve:

total<70
?
["Explain with more details","Improve technical depth"]
:
[]

});





let nextQuestion;



if(
text.includes("project")
){

nextQuestion=
"Interesting. What technologies did you use in your project?";

}

else if(
text.includes("skill")
){

nextQuestion=
"Which skill are you strongest in and why?";

}

else if(
text.includes("java")
||
text.includes("python")
){

nextQuestion=
"Can you explain one concept from that technology?";

}

else{


let next=current+1;


nextQuestion=
questions[next] ||
"Tell me more about your experience.";


setCurrent(next);


}




setTimeout(()=>{


setChat(prev=>[

...prev,

{
ai:nextQuestion
}

]);


speak(nextQuestion);



},1200);



}





return(


<div className="interview">



<div className="avatar">


<img
src="/src/assets/hero.png"
alt="AI"
/>


</div>



<div className="chat">



<h2>
🤖 AI Interviewer
</h2>



<div className="messages">


{

chat.map((item,i)=>(


<div key={i}>


{
item.ai &&

<p className="ai">

🤖 {item.ai}

</p>

}



{
item.user &&

<p className="user">

You: {item.user}

</p>

}



</div>


))

}


</div>




<button onClick={startListening}>

🎤 Speak Answer

</button>



<button
onClick={()=>
speak(
questions[current]
)
}
>

🔊 Repeat Question

</button>




{

listening &&

<h3>

🎙 Listening...

</h3>

}




</div>



</div>


)

}