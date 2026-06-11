export default function ReportCard({report}){


return(

<div className="report">


<h2>🏆 Interview Report</h2>


<div className="circle">

{report.overall || "--"}

</div>



<h3>

{
report.overall>80
?"Excellent Performance ⭐"
:
report.overall>60
?"Good Performance 👍"
:
"Needs Improvement ⚠️"

}

</h3>



<h4>
Technical: {report.technical}%
</h4>


<h4>
Communication: {report.communication}%
</h4>


<h4>
Confidence: {report.confidence}%
</h4>


<h4>
Clarity: {report.clarity}%
</h4>



<hr/>


<h3>
Strengths
</h3>


{
report.strengths.map((s,i)=>
<p key={i}>✔ {s}</p>
)
}



<h3>
Areas To Improve
</h3>


{
report.improve.map((s,i)=>
<p key={i}>⚠ {s}</p>
)
}



</div>

)

}