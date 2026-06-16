import {useState} from "react";
import VoiceButton from "./VoiceButton";
import {speak} from "../utils/speak";


export default function ChatWindow(){


const [messages,setMessages]=useState([

{
type:"ai",
text:"Hi! I am your AI interviewer. Tell me about yourself."
}

]);



function answer(text){


setMessages(prev=>[

...prev,

{
type:"user",
text:text
}

]);



let reply;


if(text.toLowerCase().includes("project")){

reply=
"Great. What was your role in that project and what challenges did you face?"

}

else{


reply=
"Interesting answer. Can you explain more with an example?"

}



setTimeout(()=>{


setMessages(prev=>[

...prev,

{
type:"ai",
text:reply
}

]);


speak(reply);


},1000)



}




return (

<div className="chatAI">


<div className="chatMessages">


{
messages.map((m,i)=>(


<div
key={i}
className={m.type}
>

{m.text}

</div>


))

}


</div>



<VoiceButton
onResult={answer}
/>



</div>

)

}