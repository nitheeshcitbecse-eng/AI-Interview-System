export default function LiveAnalysis({report}){


return(

<div className="bigAnalysis">


<h1>
📊 AI Performance Report
</h1>


<div className="bigScore">

{report.overall || 0}

</div>


<div className="cards">


<div>
<h2>🎤 Communication</h2>
<h1>{report.communication || 0}%</h1>
</div>


<div>
<h2>💻 Technical</h2>
<h1>{report.technical || 0}%</h1>
</div>


<div>
<h2>🔥 Confidence</h2>
<h1>{report.confidence || 0}%</h1>
</div>


</div>



<div className="emptyFill">


<img src="/src/assets/hero.png"/>

<h2>
AI is analyzing your interview in real time
</h2>


</div>



</div>

)

}