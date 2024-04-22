import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import StockBee from "../assets/stock_bee.png"
import  BeeLogo  from "../assets/queen_bee.png"

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
                customAttribution: '<a href="https://techbyte-learning.com/" target="_blank">TechByte Learning</a>',
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
                center: [-76.335820, 40.605510], //Center For Popup to TechByte Address
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
            <h1>TechByte Learning</h1>
            <h2>Queen Bee</h2>
            <div>
                <img src="${ BeeLogo }" alt="Team Icon" />
            </div>
            <div>
                <p><i class="fab fa-linkedin"></i>&nbsp;</p>
                <a href="https://www.linkedin.com/company/techbyte-learning/" target="_blank" rel="noopener noreferrer">TechByte's LinkedIn'</a>
            </div>
            <div>
                <p><i class="fab fa-facebook-square"></i>&nbsp;</p>
                <a href="https://www.facebook.com/techbytelearning" target="_blank" rel="noopener noreferrer">TechByte's Facebook</a>
            </div>
            <div>
                <p><i class="fab fa-youtube"></i>&nbsp;</p>
                <a href="https://www.youtube.com/@BeeDev_TechByte" target="_blank" rel="noopener noreferrer">TechByte's YouTube</a>
            </div>
            <div>
                <p><i class="fab fa-twitter-square"></i>&nbsp;</p>
                <a href="https://www.twitter.com/techByteHive" target="_blank" rel="noopener noreferrer">TechByte's Twitter</a>
            </div>
            <div>
                <p><i class="fab fa-discord"></i>&nbsp;</p>
                <a href="https://discord.com/channels/1203563873769365584/1205562887427588116" target="_blank" rel="noopener noreferrer">TechByte's Discord</a>
            </div>
            <div>
                <svg width="30" height="30" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.58 13.38a.66.66 0 0 0-.28-.14c-.6.61-1.35 1.25-2 1.68-.31.2-.7.3-.95.3-.59 0-.84-.55-.91-1.44a54.8 54.8 0 0 1-.17-4.83c0-2.26-.52-3.8-1.88-3.92l-.18-.01c-.83 0-1.24.43-1.77 1.52-.46.94-1.17 2.3-2.48 4.9a34.72 34.72 0 0 1-3.5 5.58c-.31.38-.55.64-.78.8a.8.8 0 0 1-.44.14c-.43 0-.75-.36-.85-1.21a5.46 5.46 0 0 1-.04-.69c0-1.75.66-4.6 1.8-8.78.83-3.05.48-5.13-1.34-5.13h-.03c-.41 0-.75.16-1.08.42-.33.25-.65.81-.96 1.56-.34.84-2.42 5.03-5.74 7.2-.04.81.42 1.63 1.37 1.73.85.08 1.46-.28 2.24-.81l-.16.73a31.56 31.56 0 0 0-.5 2.6c-.46 4.2 1.47 6.27 3.74 6.27.38 0 .76-.05 1.13-.15 2.5-.63 4.9-3.51 7.75-10.13a18.8 18.8 0 0 0-.01 2.02c.19 3.8 1.68 4.93 3.8 4.93 1.6 0 3.09-.83 3.85-1.87a3.7 3.7 0 0 0 .79-2.19c-.02-.49-.17-.88-.42-1.08z"></path>
                </svg>
                <a href="https://www.udemy.com/user/techbyte-learning/" target="_blank" rel="noopener noreferrer">TechByte's Udemy</a>
            </div>
        </div>
        `
        // CREATE SPHQ MARKER 
        const HQMarker = document.createElement('div');
        HQMarker.className = "Marker HQ";
        new mapboxgl.Marker(HQMarker)
            .setLngLat([-76.435820, 41.005510])
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

            // Display Github if provided
            const githubInfo = () => {
                if (!oneUser.github) {
                    return "<div></div>";
                } else {
                    return `
                    <div>
                        <p><i class="fab fa-github"></i>&nbsp;</p>
                        <a href="https://github.com/${oneUser.github}" target="_blank" rel="noopener noreferrer">${oneUser.github}</a>
                    </div>`;
                }
            };

            // Display LinkedIn if provided
            const linkedinInfo = () => {
                if (!oneUser.linkedin) {
                    return "<div></div>";
                } else {
                    return `
                    <div>
                        <p><i class="fab fa-linkedin"></i>&nbsp;</p>
                        <a href="https://www.linkedin.com/in/${oneUser.linkedin}" target="_blank" rel="noopener noreferrer">${oneUser.linkedin}</a>
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
                ${githubInfo()}
                ${linkedinInfo()}
                ${instagramInfo()}
                ${facebookInfo()}
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
        <div className="MapBox">
            <div id="map" ref={mapContainer} className="MapContainer" />
        </div>
    );
}

export default Map;