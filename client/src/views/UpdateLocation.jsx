import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Autocomplete from "../components/Autocomplete"
import axios from 'axios';
import DisclaimerAddress from '../components/DisclaimerAddress';
import FormSubmit from '../components/FormSubmitButton';

function UpdateLocation (props) {

    const navigate = useNavigate()
    const [ addressLine1, setAddressLine1 ] = useState("");
    const [ addressLine2, setAddressLine2 ] = useState("");
    const [ coordinates, setCoordinates ] = useState([])
    const [ errors, setErrors ] = useState("");

    useEffect(() => {
        window.scrollTo(0,0) // scroll to top
        // check for cookies
        axios.get("http://localhost:8000/api/cookietest"  ,{withCredentials: true})
        .then((res) => {
            console.log("Update Page Loaded.");
        })
        .catch((err) => {
            props.setAuthorized("Please log in to access profile pages!");
            console.log("NO REP!");
            navigate("/login")
        })
    },[])

    const handleUpdate = (e) => {
        e.preventDefault()
        const data ={
            coordinates,
            addressLine1,
            addressLine2,
        }
        axios.put("http://localhost:8000/api/user/update", data, {withCredentials: true})
            .then(res => { 
                console.log("Profile Updated!")
                navigate(`/profile`);
            })
            .catch(err =>  {
                setErrors(err.response.data.errors); //Set Errors
                console.log("errors exist!", errors);
            })
    }

    return (
        // MAIN CONTAINER
        <div className="MainContainer">
            {/* LOGIN CONTAINER */}
            <div className="LoginContainer">
                {/* <!-- FORM WRAPPER --> */}
                <div className="FormWrapper">
                    {/* FORM TITLE */}
                    <h1 className="Title">Update Address:</h1>
                    {/* <!-- FORM SECTION  --> */}
                    <form className="RegForm"  onSubmit={handleUpdate}>
                        {/* ADDRESS Line 1 */}
                        { errors.addressLine1 ? 
                            <div className='InputContainer'>
                                <label htmlFor="Autocomplete" style={{color:"red"}}>< i className="fas fa-map-marked-alt fa-sm" style={{color: "red"}}></i>&nbsp;  Address:</label>
                                <Autocomplete
                                    setAddressLine1={setAddressLine1} 
                                    setAddressLine2={setAddressLine2} 
                                    setCoordinates={setCoordinates}
                                    />
                            </div>
                        :
                        <div className='InputContainer'>
                                <label htmlFor="Autocomplete">< i className="fas fa-map-marked-alt fa-sm" style={{color: "#C89211"}}></i>&nbsp;  Address:</label>
                                <Autocomplete 
                                    setAddressLine1={setAddressLine1} 
                                    setAddressLine2={setAddressLine2} 
                                    setCoordinates={setCoordinates} 
                                />
                            </div>
                        }
                        {/* END ADDRESS Line 1 */}
                        {/* SUBMIT BUTTON */}
                        <FormSubmit type="submit" text="SUBMIT" />
                    </form>
                    {/* <!-- END FORM SECTION --> */}
                    {/* LINK BACK TO PROFILE */}
                    <Link className="MapLink" to="/profile">Back To Profile</Link>
                </div>
                {/* END FORM CONTAINER */}
            </div>
            {/* Disclaimer Insert */}
            <DisclaimerAddress />
        </div>
        // END MAIN CONTAINER //
    )
}

export default UpdateLocation