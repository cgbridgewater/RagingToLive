import { Link } from "react-router-dom";
function MapTitle() {

  return (
    <>
        <h3 className='SubTitle'>Click to see where members are!</h3>
        <h5 className='Signup'>
          Not on the map? Setup or view profile <Link to={"/profile"} className='LoginLink'>HERE</Link>
        </h5>
    </>
  )
}

export default MapTitle