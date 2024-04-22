import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Autocomplete from "../components/Autocomplete"
import axios from 'axios';
import DisclaimerAddress from '../components/DisclaimerAddress';

function Register (props) {

    useEffect(() => {
        window.scrollTo(0,0) // scroll to top
    },[])

    const navigate = useNavigate()
    const [ addressLine1, setAddressLine1 ] = useState("");
    const [ addressLine2, setAddressLine2 ] = useState("");
    const [ coordinates, setCoordinates ] = useState([])
    const [ roll, setRoll ] = useState("");
    const [ errors, setErrors ] = useState("");
    const [ emailErrors, setEmailErrors ] = useState("");
    const [state, setState] = useState ({
        register: {
            userName:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    });

    const {register} = state;
    const handleRegInputs =(e) => {
        props.setAuthorized("");
        setState({...state, register: {...state.register,[ e.target.name]: e.target.value}})
    }

    const handleRegistration = (e) =>{
        e.preventDefault()
        const data ={
            ...register,
            coordinates,
            addressLine1,
            addressLine2,
            roll
        }
        axios.post("http://localhost:8000/api/register", data, {withCredentials: true})
            .then(res => {
                console.log("results", res.data.user._id)
                navigate(`/profile`);
            })
            .catch(err =>  {
                setErrors(err.response.data.error.errors);
                console.log("errors exist!");
                // console.log("errors exist!", err.response.data.error.errors);
            })
    }

    return (
        // main container
        <div className='MainContainer'>
            {/* Form Container */}
            <div className='FormWrapper'>
                {/* Form Title */}
                <h1 className='Title'>Register Account</h1>
                {/* Form Start */}
                <form className="RegForm" onSubmit={handleRegistration}>
                    {/* USER NAME */}
                    { errors.userName ? 
                        <div className='InputContainer'>
                            <label htmlFor="userName" style={{color:"red"}}>< i className="fas fa-user fa-sm" style={{color: "red"}}></i>&nbsp; Name:</label>
                            <input 
                                type="text" 
                                name="userName" 
                                id='userName' 
                                placeholder='Enter User Name' 
                                onChange={handleRegInputs}
                                />
                        </div>
                    :
                        <div className='InputContainer'>
                            <label htmlFor="userName">< i className="fas fa-user fa-sm"></i>&nbsp; Name:</label>
                            <input 
                                type="text" 
                                name="userName" 
                                id='userName' 
                                placeholder='Enter User Name' 
                                onChange={handleRegInputs}
                                />
                        </div>
                    }
                    {/* EMAIL */}
                    { errors.email ? 
                        <div className='InputContainer'>
                            <label htmlFor="email" style={{color:"red"}}>< i className="fas fa-envelope fa-sm" style={{color: "red"}}></i>&nbsp; Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                id='email' 
                                placeholder='Enter An Email' 
                                onChange={handleRegInputs}
                            />
                        </div>
                    :
                        <div className='InputContainer'>
                            <label htmlFor="email">< i className="fas fa-envelope fa-sm"></i>&nbsp; Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                id='email' 
                                placeholder='Enter An Email' 
                                onChange={handleRegInputs}
                            />
                        </div>
                    }
                    {/* ADDRESS Line 1 */}
                    { errors.addressLine1 ? 
                        <div className='InputContainer'>
                            <label htmlFor="myAutocomplete" style={{color:"red"}}>< i className="fas fa-map-marked-alt fa-sm" style={{color: "red"}}></i>&nbsp;  Address:</label>
                            <Autocomplete
                                setAddressLine1={setAddressLine1} 
                                setAddressLine2={setAddressLine2} 
                                setCoordinates={setCoordinates}
                                />
                        </div>
                    :
                    <div className='InputContainer'>
                            <label htmlFor="myAutocomplete">< i className="fas fa-map-marked-alt fa-sm"></i>&nbsp;  Address:</label>
                            <Autocomplete 
                                id="myAutocomplete"
                                setAddressLine1={setAddressLine1} 
                                setAddressLine2={setAddressLine2} 
                                setCoordinates={setCoordinates} 
                            />
                        </div>
                    }
                    {/* ROLL SELECT */}
                    <div className='InputContainer'>
                        <label htmlFor="roll">< i className="fas fa-user-plus fa-sm"></i>&nbsp; Roll:</label>
                        <select 
                            type="text" 
                            name="roll" 
                            id='roll' 
                            placeholder='Select Roll' 
                            onChange={(e) => setRoll(e.target.value)}
                            value= {roll}
                            >
                                <option value="">Guest</option>
                                <option value="Staff">Staff</option>
                                <option value="Student">Student</option>
                                <option value="Alumni">Alumni</option>
                            </select>
                    </div>
                    {/* PASSWORD */}
                    { errors.password ? 
                        <div className='InputContainer'>
                            <label htmlFor="password" style={{color:"red"}}>< i className="fas fa-key fa-sm" style={{color: "red"}}></i>&nbsp;  Password:</label>
                            <input 
                                type="password" 
                                name='password' 
                                id='password'  
                                placeholder='Enter A Password' 
                                onChange={handleRegInputs}
                            />
                        </div>
                    :
                        <div className='InputContainer'>
                            <label htmlFor="password">< i className="fas fa-key fa-sm"></i>&nbsp;  Password:</label>
                            <input 
                                type="password" 
                                name='password' 
                                id='password'  
                                placeholder='Enter A Password' 
                                onChange={handleRegInputs}
                            />
                        </div>
                    }
                    {/* CONFIRM PASSWORD */}
                    { errors.confirmPassword?
                        <div className='InputContainer'>
                            <label htmlFor="confirmPassword" style={{color:"red"}}>< i className="fas fa-key fa-sm" style={{color: "red"}}></i>&nbsp; Confirm <br /> &nbsp;&nbsp;&nbsp;&nbsp;Password:</label>
                            <input 
                                type="password" 
                                name='confirmPassword' 
                                id='confirmPassword'  
                                placeholder='Passwords Must Match!'
                                onChange={handleRegInputs}
                            />
                        </div>
                    :
                        <div className='InputContainer'>
                            <label htmlFor="confirmPassword">< i className="fas fa-key fa-sm"></i>&nbsp; Confirm <br /> &nbsp;&nbsp;&nbsp;&nbsp;Password:</label>
                            <input 
                                type="password" 
                                name='confirmPassword' 
                                id='confirmPassword'  
                                placeholder='Confirm Password' 
                                onChange={handleRegInputs}
                            />
                        </div>
                    }
                    {/* SUBMIT BUTTON */}
                    <button type="submit" className='FormButton' >SUBMIT</button>
                    {/* <!-- SIGN IN LINK --> */}
                    <div className='FormFlex'>
                        <p className='SignIn'>Already a member?</p>
                        <Link to="/login" className='FormGold'>Login Here!</Link>
                    </div>
                </form>
                {/* END FORM */}
                {/* DISCLAIMER INSERT*/}
                <DisclaimerAddress />
                {/* Return To Map */}
                <Link className="MapLink" to="/">Back To The Map</Link>
            </div>
            {/* END Form Container */}
        </div>
        // End Main Container
    )
}

export default Register