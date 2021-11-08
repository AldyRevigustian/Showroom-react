import React, { useState, useEffect } from "react";
import Videos from "./Videos";
import Comments from "./Comments";
import RoomStream from "./RoomStream";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL_PROFILE } from "../utils/constant";
import { Link } from "react-router-dom";


function Streaming() {
    const [profiles, setProfiles] = useState('');
    let params = useParams();

    const getProfiles = () => {
        axios
            .get(API_URL_PROFILE + params.streamingId)
            .then((response) => {
                const profiles = response.data;
                setProfiles(profiles);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getProfiles();
    }, []);

    console.log(profiles);
    return (
        <>
            {profiles.is_onlive === true ? (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100vh', flex: 1, backgroundColor: '#222831', padding: 100 }}>
                    <div className="kiri" style={{ display: 'flex', flexDirection: 'column', flex: "80%", backgroundColor: '#EEEEEE', height: '500px' }}>
                        <Videos />
                        <RoomStream />
                    </div>
                    <div className="kanan" style={{ display: 'flex', flexDirection: 'column', height: '500px', width: 300, flex: "20%" }}>
                        <Comments />
                    </div>
                </div>
            )
                :
                (
                    <Link style={{ display: "inline", margin: "10px 0 0 10px", backgroundColor: '#0D6EFD', padding: 5, borderRadius: 5, color: 'white', textDecoration: 'none' }}
                        to={`/`}> Go Back</Link>
                )
            }

        </>
    );
}

export default Streaming