import { useEffect } from "react"
import Map from '../components/Map.jsx'
import MapTitle from '../components/MapTitle.jsx'
import '../App.css'

function MapPage() {

  useEffect(() => {
    window.scrollTo(0,0) // scroll to top
  },[])

  return (
    <div className='MainContainer'>
      <Map />
    </div>
  )
}

export default MapPage