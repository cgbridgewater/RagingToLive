import { Link } from "react-router-dom"
import Yikes from "../assets/yikes.jpg"

const BadLink = () => {

    return(
        <div className="YikesContainer">
            <img className='Yikes' src={Yikes} alt="404" />
            <Link className="YikesButton"  to="/">Get me outta here!!</Link>
        </div>
    )
}

export default BadLink