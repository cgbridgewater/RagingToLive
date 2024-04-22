import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios';
import BadLink from "./BadLink";
import StockBee from "../assets/stock_bee.png"
import Spinner from "../components/Spinner";
import Button from "../components/Button";

function Profile(props) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [showSpinner, setShowSpinner] = useState(true); // State for showing spinner
    const [ userToken ] = useState("");
    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ roll, setRoll ] = useState("");
    const [ addressLine1, setAddressLine1 ] = useState("");
    const [ addressLine2, setAddressLine2 ] = useState("");
    const [ spotify, setSpotify ] = useState("");
    const [ instagram, setInstagram ] = useState("");
    const [ facebook, setFacebook ] = useState("");
    const [ linkedin, setLinkedin ] = useState("");
    const [ github, setGithub ] = useState("");

    const SortRoll = () => {
        if( roll == "Alumni" ) {
            return <img className="BeeIcon AlumniBee" src={ StockBee } alt="Alumni" />;
        } else if ( roll == "Student" ){
            return <img className="BeeIcon StudentBee" src={ StockBee } alt="Student" />;
        } else if ( roll == "Staff" ){
            return <img className="BeeIcon StaffBee" src={ StockBee } alt="Staff" />;
        } else 
            return <img className="BeeIcon" src={ StockBee } alt="Guest" />;
    };

    useEffect(() => {
        // scroll to top
        window.scrollTo(0,0)
        // Get User Data
        const fetchData = () => {
        axios.get("http://localhost:8000/api/user/profile", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${userToken}`,  // Include the User Token
            },
        })
            .then((res) => {
            setUserName(res.data.userName);
            setEmail(res.data.email);
            setRoll(res.data.roll);
            setAddressLine1(res.data.addressLine1);
            setAddressLine2(res.data.addressLine2);
            setSpotify(res.data.spotify);
            setInstagram(res.data.instagram);
            setFacebook(res.data.facebook);
            setLinkedin(res.data.linkedin);
            setGithub(res.data.github);
            setTimeout(() => {
                setShowSpinner(false); // Turn off the spinner after 2 seconds
                setIsLoading(false); // Switch Ternary If Load is successful
            }, 1500);
            })
            .catch((err) => {
                props.setAuthorized("Please log in to access profile pages!");
            navigate("/login")
            });
        }
        fetchData(); // Call the fetchData function
        return () => {
            clearTimeout(fetchData); // Reset the fetchData timer
        };
    }, [userToken]);

    return (
        <div>
            {/* SPINNER TERNARY */}
            {showSpinner ? (
                <Spinner />
            ) : 
            // IS LOADING TERNARY
            (isLoading ? (
                <BadLink /> // Show 404 if page fails to load
            ) :
                // ON SUCCESSFUL LOAD // MAIN CONTAINER //
                <div className="MainContainer">
                    {/* PROFILE TITLE AND LOGO */}
                    <div className="ProfileFlex">
                        <h1 className='ProfileHeader'><span className="Gold" style={{textTransform: 'capitalize'}}>{ userName }'s</span><br /> Profile Page</h1>
                        { SortRoll() }
                    </div>
                    {/* PROFILE CONTAINER */}
                    <div className="ProfileContainer">
                        {/* LOCATION INFO SECTION */}
                        <div className="ProfileLocation">
                            {/* LOCATION TITLE AND UPDATE BUTTON */}
                            <div className="ProfileFlex2">
                                <h3 className="LocationTitle">Pin Location:</h3>
                                <Button to="/profile/updateaddress" text="Update Location" />
                            </div>
                            {/* ADDRESS DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fas fa-map-marked-alt fa-sm"></i>&nbsp; Address:</h4> 
                            <h4 className="ProfileText">{addressLine1}</h4>
                            <h4 className="ProfileText">{addressLine2}</h4>
                        </div>
                        <hr className="SeperationLineFull" />
                        {/* SOCIALS INFO SECTION */}
                        <div className="ProfileSocials">
                            {/* SOCIAL TITLE AND UPDATE BUTTON */}
                            <div className="ProfileFlex2">
                                <h3 className="SocialsTitle"> Social Media:</h3>
                                <Button to="/profile/updatesocials" text="Update Socials" />
                            </div>
                            {/* EMAIL DISPALY */}
                            <h4 className="ProfileTitle">< i className="fas fa-envelope fa-sm"></i>&nbsp; Email:</h4>
                            <h4 className="ProfileText">{email} </h4>
                            {/* THICK LINE */}
                            <hr className="SeperationLine" />
                            {/* ROLL DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fas fa-user-friends fa-sm"></i>&nbsp; TechByte Roll:</h4>
                            { !roll ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{roll}</h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* ROLL DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-github fa-sm"></i>&nbsp; GitHub:</h4>
                            { !github ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{github}</h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* ROLL DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-linkedin fa-sm"></i>&nbsp; LinkedIn:</h4>
                            { !linkedin ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{linkedin}</h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* INSTAGRAM DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-instagram-square fa-sm"></i>&nbsp; Instagram:</h4>
                            { !instagram ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{instagram}</h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* FACEBOOK DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-facebook-square fa-sm"></i>&nbsp; Facebook:</h4>
                            { !facebook ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{facebook}</h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* SPOTIFY DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-spotify fa-sm"></i>&nbsp; Spotify:</h4>
                            { !spotify ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{spotify}</h4>
                            }
                        </div>
                        {/* END SOCIALS INFO SECTION */}
                    </div>
                        {/* LINKS */}
                        <div className="ProfileLinks">
                            <Link className="ProfileToMap"  to="/">View Map</Link>
                            <Link className='Logout' to="/profile/logout">Logout</Link>
                            <Link className='ProfileDelete' to="/profile/delete">Delete Profile</Link>
                        </div>
                        {/* END LINKS */}
                </div>
                // END PROFILE CONTAINER //
            )}
            {/* END IS LOADING TERNARY */}
        </div>
        // END SPINNER TERNARY
    )
}

export default Profile