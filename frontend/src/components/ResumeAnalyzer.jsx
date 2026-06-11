import {useState} from "react";
import "../App.css";


export default function ResumeAnalyzer(){


const [result,setResult]=useState(null);



function analyze(e){


let file=e.target.files[0];


if(!file) return;



let name=file.name.toLowerCase();


let score=50;


let skills=[];



if(
name.includes("java") ||
name.includes("react") ||
name.includes("python")
){

score+=20;

skills.push("Technical Skills");

}


if(
name.includes("resume") ||
name.includes("cv")
){

score+=15;

}



if(score>80){

setResult({

level:"Strong Resume 🔥",

score,

message:
"Resume is well prepared for interviews"

});

}

else if(score>60){


setResult({

level:"Good Resume 👍",

score,

message:
"Add more projects and achievements"

});


}

else{


setResult({

level:"Needs Improvement ⚠️",

score,

message:
"Improve skills, projects and experience section"

});


}



}



return(


<div className="resumePage">


<h1>
📄 AI Resume Analyzer
</h1>



<div className="uploadBox">


<input

type="file"

onChange={analyze}

/>


<p>
Upload your resume

</p>


</div>




{

result &&


<div className="resumeResult">


<h1>
{result.score}/100
</h1>


<h2>
{result.level}
</h2>


<p>
{result.message}
</p>



<div className="resumeBar">

<div
style={{
width:`${result.score}%`
}}
>

</div>

</div>


</div>


}



</div>


)

}