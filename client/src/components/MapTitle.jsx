import { Link } from "react-router-dom";
function MapTitle() {

  return (
    <>
      <h1 className='Title'>Are you a <span>TechByte Learning</span> member?</h1>
        <h3 className='SubTitle'>Click to see where TechByte Learning's members are!</h3>
        <h5 className='Signup'>
          Not on the map? Setup or view profile <Link to={"/profile"} className='LoginLink'>HERE</Link>
        </h5>
    </>
  )
}

export default MapTitle