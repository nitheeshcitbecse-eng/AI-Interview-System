import AIAvatar from "../components/AIAvatar";
import ChatWindow from "../components/ChatWindow";
import {useNavigate} from "react-router-dom";


export default function MockInterview(){


const navigate = useNavigate();



const endInterview = ()=>{


const oldHistory = JSON.parse(
localStorage.getItem("interviews")
) || [];



const newInterview = {

id:Date.now(),

title:"AI Mock Interview",

date:new Date().toLocaleString(),

score:"88%",

confidence:"82%",

communication:"90%",

technical:"85%",

status:"Completed"

};



localStorage.setItem(

"interviews",

JSON.stringify(
[
newInterview,
...oldHistory
]
)

);



navigate("/history");


};





return (

<div className="mockPage">



<div className="mockHeader">


<h1>
🔴 Live Mock Interview
</h1>


<div className="mockProfile">

👩 Deepika

</div>


</div>





<div className="mockMain">





<div className="bigRobot">



<div className="robotTitle">

🤖 AI Interviewer

<p>
Listening...
</p>

</div>




<div className="robotImage">

<AIAvatar/>

</div>





<div className="voice">

〰️〰️🎤〰️〰️

</div>







<div className="controls">


<button className="speakBtn">

🎤 Speak

</button>


<button className="micBtn">

🎙 Mic

</button>



<button className="endBtn">

⛔ End Interview

</button>



</div>



</div>







<div className="bigChat">


<h2>
AI Conversation
</h2>


<ChatWindow/>


</div>



</div>





</div>

)

}