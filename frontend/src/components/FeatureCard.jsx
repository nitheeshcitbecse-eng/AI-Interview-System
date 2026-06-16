import { motion } from "framer-motion";


export default function FeatureCard({
  icon,
  title,
  description,
  onClick
}) {


return (

<motion.div

className="featureCard"

whileHover={{
scale:1.08,
rotateX:5,
rotateY:-5
}}

transition={{
duration:0.3
}}

onClick={onClick}

>


<div className="featureIcon">

{icon}

</div>


<h3>

{title}

</h3>


<p>

{description}

</p>


<div className="cardGlow"></div>


</motion.div>

);

}