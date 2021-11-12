import React, { useState, useEffect } from "react";
import Videos from "./Videos";
import Comments from "./Comments";
import PropertyStream from "./PropertyStream";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL_PROFILE } from "../utils/constant";
import { Link } from "react-router-dom";
import Ranks from "./LiveRank";


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
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    // console.log(profiles);
    return (
        <div style={{ backgroundColor: '#222831', display:'flex'}}>
            {profiles.is_onlive === true ? (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100vh', flex: 1, backgroundColor: '#222831', padding: 0 }}>
                    <div className="kiri" style={{ display: 'flex', flexDirection: 'column', flex: "20%", backgroundColor: '#EEEEEE', height: '500px' }}>
                        <Ranks />
                    </div>
                    <div className="kiri" style={{ display: 'flex', flexDirection: 'column', flex: "60%", backgroundColor: '#EEEEEE', height: '500px' }}>
                        <Videos />
                        <PropertyStream />
                    </div>
                    <div className="kanan" style={{ display: 'flex', flexDirection: 'column', height: '500px',flex: "20%" }}>
                        <Comments />
                    </div>
                </div>
            )
                :
                (
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', flex:1, flexDirection:'column'}}>
                    <div>
                        <h2 style={{color:'white'}}>The Streamer Is Offline / No Streamer With This ID</h2>
                    </div>
                    <div style={{marginTop:30}}>
                        <Link style={{ display: "inline", fontWeight:'bold',fontSize:'30px',backgroundColor: '#FF0000', padding: 10, borderRadius: 10, color: 'white', textDecoration: 'none' }}
                        to={`/`}> Go Back</Link>
                    </div>
                </div>
                )
            }

        </div>
    );
}

export default Streaming