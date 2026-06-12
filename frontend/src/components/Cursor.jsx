import {useEffect,useState} from "react";


export default function Cursor(){


const [mouse,setMouse]=useState({
x:0,
y:0
});


useEffect(()=>{


const move=(e)=>{

setMouse({
x:e.clientX,
y:e.clientY
})

}


window.addEventListener(
"mousemove",
move
);


return()=>window.removeEventListener(
"mousemove",
move
)


},[]);



return(

<>


<div
className="bigCursor"
style={{
left:mouse.x,
top:mouse.y
}}
/>



</>

)

}