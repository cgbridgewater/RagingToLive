import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <div className="Navbar">
            <Link to="/"><img src="https://s3.us-west-2.amazonaws.com/oneclick.media/0fd2cbe9-3435-4acb-93a6-22fda58e1c00/ca54a85a-fa7c-40e5-ac4f-e51c1fe35e4f.png" alt="Raging To Ride" /></Link>
            <Link to="/login" ><button>Login</button></Link>
        </div>
    );
};

export default Navbar