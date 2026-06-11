import "../App.css";


export default function LiveAnalysis({report}){


return(

<div className="liveAnalysis">


<h1>
📊 Live Interview Analysis
</h1>


<div className="rankCircle">

{report?.overall || 0}

<span>
/100
</span>

</div>



<div className="analysisGrid">


<div className="analysisCard">

<h2>🎤 Communication</h2>

<h1>
{report?.communication || 0}%
</h1>

</div>



<div className="analysisCard">

<h2>💡 Technical</h2>

<h1>
{report?.technical || 0}%
</h1>

</div>




<div className="analysisCard">

<h2>🔥 Confidence</h2>

<h1>
{report?.confidence || 0}%
</h1>

</div>




<div className="analysisCard">

<h2>✨ Clarity</h2>

<h1>
{report?.clarity || 0}%
</h1>

</div>


</div>



<div className="feedbackBox">

<h2>
AI Feedback
</h2>


<p>
Your answers are analysed in real time.
Keep explaining with examples and projects.
</p>


</div>


</div>


)

}