import {useState} from "react";


export default function ResumeAnalyzer(){


const [report,setReport]=useState(true);



return(

<div className="resumePage">

<div className="resumeHero">


<h1>
🤖 AI Resume Analyzer
</h1>


<p>
Upload resume and get AI career evaluation
</p>


<input type="file"/>


<button>
Submit Resume
</button>


</div>



{report &&

<div className="resumeDashboard">


<div className="resumeCard">

<h2>ATS Score</h2>

<h1>92%</h1>

</div>



<div className="resumeCard">

<h2>Communication</h2>

<h1>88%</h1>

</div>




<div className="resumeCard">

<h2>Technical Skills</h2>

<h1>95%</h1>

</div>





<div className="resumeCard">

<h2>Soft Skills</h2>

<h1>86%</h1>

</div>





<div className="resumeLarge">


<h2>
📄 Resume Report
</h2>


<p>
✔ Strong programming skills detected
</p>


<p>
✔ Good project explanation
</p>


<p>
⚡ Improve achievements section
</p>


<p>
⚡ Add more measurable results
</p>


</div>





<div className="resumeLarge">


<h2>
🎯 Interview Preparation
</h2>


<p>
Expected interview topics generated
</p>


<p>
Role matching completed
</p>


<p>
Confidence improvement suggestions ready
</p>


</div>



</div>

}



</div>

)

}