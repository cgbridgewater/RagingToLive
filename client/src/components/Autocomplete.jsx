const geoapifyKey = import.meta.env.VITE_MB_Geoapify_Key;
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

function Autocomplete  (props) {

    const { setAddressLine1,setAddressLine2,setCoordinates } = props

    function sendPlaceDetailsRequest(feature, geocoder) {
        // console.log("FEATURE: ",feature); // generates all the results
        setCoordinates(feature.geometry.coordinates) // sets results through props
        setAddressLine1(feature.properties.address_line1) // sets results through props
        setAddressLine2(feature.properties.address_line2) // sets results through props
        return geocoder.sendPlaceDetailsRequest(feature);
    }

    return (
        <div>
            <GeoapifyContext apiKey={geoapifyKey}>
                <GeoapifyGeocoderAutocomplete
                    placeholder='Enter An Address'
                    addDetails={true} // persists the data out
                    sendPlaceDetailsRequestFunc={sendPlaceDetailsRequest}
                />
            </GeoapifyContext>
        </div>
    )
}

export default Autocomplete