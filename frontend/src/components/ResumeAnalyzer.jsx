import {useState} from "react";


export default function ResumeAnalyzer(){


const[file,setFile]=useState(null);



return(

<div className="resumePage">


<h1>
🤖 Resume Intelligence AI
</h1>


<div className="resumeUpload">


<input

type="file"

onChange={(e)=>setFile(e.target.files[0])}

/>


<button>
Analyze Resume
</button>



</div>




<div className="resumeCards">


<div>
<h1>92%</h1>
ATS Score
</div>



<div>
<h1>88%</h1>
Skills Match
</div>



<div>
<h1>90%</h1>
Experience
</div>



<div>
<h1>85%</h1>
Projects
</div>



</div>





<div className="analysisPanel">


<h2>
AI Resume Report
</h2>



<p>
✅ Programming skills detected
</p>


<p>
✅ Projects evaluated
</p>


<p>
✅ Education checked
</p>


<p>
✅ Keywords matched
</p>


<p>
✅ Job roles suggested
</p>




<h2>
Improvement Suggestions
</h2>


<ul>

<li>Add measurable project results</li>

<li>Improve professional summary</li>

<li>Add more technical keywords</li>

</ul>


</div>





{

file &&

<h3>
Uploaded: {file.name}
</h3>

}


</div>

)

}