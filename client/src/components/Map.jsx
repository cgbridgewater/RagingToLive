import React, { useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import StockBee from "../assets/stock_bee.png"
import  RTL_Fire  from "../assets/RTL_Fire.png"

mapboxgl.accessToken = import.meta.env.VITE_MB_Mapbox_Token;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const flyToDuration = 2500;
    const [user, setUser] = useState([]);
    const [lng] = useState((Math.random() - 0.5) * 360);
    const [lat] = useState((Math.random() - 0.5) * 100);
    const [zoom] = useState(1);

    // CREATE INITIAL MAP AND SP MARKER
    useEffect(() => {
        // GET USERS TO CREATE PINS
        window.scrollTo(0, 0);
        axios.get("http://localhost:8000/api/allusers")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log("Something went wrong when gathering pins!");
            });
        // Create a new map
        if (map.current) return;
        map.current = new mapboxgl.Map({
            attributionControl: false,
            animation:true,
            essential:true,
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
            center: [lng, lat],
            zoom: zoom,
        });
        // Create Custom Footer In Map For Techbyte Link
        map.current.addControl(
            new mapboxgl.AttributionControl({
                customAttribution: '<a href="https://ragingtoride.oneclick.community" target="_blank">Raging To Ride</a>',
                compact: false,
            })
        );
        // Add Map Controls
        map.current.addControl(
            new mapboxgl.NavigationControl({
                showCompass: true, showZoom: true 
            })
        );
        // Create A Fly To Animation To TechByte Learning Home From A Randomized Start Point On Map Load And Open Pop Up
        map.current.on('load', () => {
            map.current.easeTo({
                center: [-122.90101, 43.46679], //Center For HQ
                zoom: 7.5,
                duration: flyToDuration,
                curve: 1.42,
                easing(t) {
                    return t;
                },
            });
            setTimeout(() => {
                HQMarker.click();
            }, flyToDuration+250);
            // atmosphere styling //
            map.current.setFog({
                color: 'rgb(133, 179, 229)', // Lower atmosphere
                'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
                'horizon-blend': 0.04, // Atmosphere thickness (default 0.2 at low zooms)
                'space-color': 'rgb(11, 11, 25)', // Background color
                'star-intensity': 0.7 // Background star brightness (default 0.35 at low zoooms )
            })
        });
        // HQ Pop Up HTML
        const HQMarkerInfo =
        `
        <div>
            <h1>Raging To Ride</h1>
            <h2>HQ</h2>
            <div>
            <img src="${ RTL_Fire }" alt="RTL Fire Icon" />
            </div>
            <div className="card_link">
                <p><i class="fas fa-laptop-house"></i>&nbsp;</p>
                <a href="#" target="_blank" rel="noopener noreferrer">RTR Homepage</a>
            </div>
            <div className="card_link">
                <p><i class="fab fa-instagram-square"></i>&nbsp;</p>
                <a href="#" target="_blank" rel="noopener noreferrer">RTR Instagram</a>
            </div>
            <div className="card_link">
                <p><i class="fab fa-facebook-square"></i>&nbsp;</p>
                <a href="#" target="_blank" rel="noopener noreferrer">RTR Facebook</a>
            </div>
            <div className="card_link">
                <p><i class="fab fa-youtube"></i>&nbsp;</p>
                <a href="#" target="_blank" rel="noopener noreferrer">RTR YouTube</a>
            </div>
            <div className="card_link">
                <p><i class="fab fa-twitter-square"></i>&nbsp;</p>
                <a href="#" target="_blank" rel="noopener noreferrer">RTR Twitter</a>
            </div>
        </div>
        `
        // CREATE SPHQ MARKER 
        const HQMarker = document.createElement('div');
        HQMarker.className = "Marker HQ";
        new mapboxgl.Marker(HQMarker)
            .setLngLat([-123.02101, 43.91679])
            .setPopup(new mapboxgl.Popup().setHTML(HQMarkerInfo))
            .addTo(map.current);
        }, []);

    // // CREATE USER MARKERS // //
    useEffect(() => {
        // Loop through users
        for (const oneUser of user) {
            // create user marker element
            const el = document.createElement('div');
            // select user marker icon based on roll
            if (oneUser.roll === 'Alumni') {
                el.className = 'Marker Alumni';
            } else if (oneUser.roll === 'Student') {
                el.className = 'Marker Student';
            } else if (oneUser.roll === 'Staff') {
                el.className = 'Marker Staff';
            } else if (oneUser.roll === '') {
                el.className = 'Marker';
            }
            // User Roll Icon Selector
            const userRoll = () => {
                let iconText;
                if (oneUser.roll === 'Alumni') {
                    iconText = 'Alumni';
                } else if (oneUser.roll === 'Student') {
                    iconText = 'Student';
                } else if (oneUser.roll === 'Staff') {
                    iconText = 'Staff';
                } else {
                    iconText = 'Guest';
                }
                return `<h2 id="${iconText}Text">${iconText}</h2>
                <div><img id="${iconText}Bee" src="${StockBee}" alt="${iconText} Icon" /></div>`;
            };

            // Display LinkedIn if provided
            const twitterInfo = () => {
                if (!oneUser.twitter) {
                    return "<div></div>";
                } else {
                    return `
                    <div>
                        <p><i class="fab fa-twitter"></i>&nbsp;</p>
                        <a href="https://www.twitter.com/${oneUser.twitter}" target="_blank" rel="noopener noreferrer">${oneUser.twitter}</a>
                    </div>`;
                }
            };

            // Display Facebook if provided
            const facebookInfo = () => {
                if (!oneUser.facebook) {
                    return "<div></div>";
                } else {
                    return `
                    <div>
                        <p><i class="fab fa-facebook-square"></i>&nbsp;</p>
                        <a href="https://www.facebook.com/${oneUser.facebook}" target="_blank" rel="noopener noreferrer">${oneUser.facebook}</a>
                    </div>`;
                }
            };

            // Display Instagram if provided
            const instagramInfo = () => {
                if (!oneUser.instagram) {
                    return "<div></div>";
                } else {
                    let instagramUsername = oneUser.instagram;
                    if (instagramUsername.startsWith('@')) {
                        instagramUsername = instagramUsername.substring(1);
                    }
                    return `
                    <div>
                        <p><i class="fab fa-instagram-square"></i>&nbsp;</p>
                        <a href="https://www.instagram.com/${instagramUsername}" target="_blank" rel="noopener noreferrer">${instagramUsername}</a>
                    </div>`;
                }
            };

            // Display Spotify if provided
            const spotifyInfo = () => {
                if (!oneUser.spotify) {
                    return "<div></div>";
                } else {
                    return `
                    <div>
                        <p><i class="fab fa-spotify"></i>&nbsp;</p>
                        <a href="http://open.spotify.com/user/${oneUser.spotify}" target="_blank" rel="noopener noreferrer">${oneUser.spotify}</a>
                    </div>`;
                }
            };

            // package up user marker popup info
            const userMarkerInfo = 
            `<div>
                <h1>${oneUser.userName}</h1>
                ${userRoll()}
                ${instagramInfo()}
                ${facebookInfo()}
                ${twitterInfo()}
                ${spotifyInfo()}
            </div>`;

            // Add packaged up user marker, popup and associated it to its location THEN add it to the map
            new mapboxgl.Marker(el)
                .setLngLat(oneUser.coordinates)
                .setPopup(new mapboxgl.Popup().setHTML(userMarkerInfo))
                .addTo(map.current);
        }
    }, [user]);

    return (
        <>
            <h3 className='SubTitle'>
                Click to see where members are!
            </h3>
            <div className="MapBox">
                <div id="map" ref={mapContainer} className="MapContainer" />
            </div>
            <h5 className='Signup'>
                Not on the map? Setup a profile <Link to={"/profile"} className='LoginLink'>HERE</Link>
            </h5>
        </>
    );
}

export default Map;