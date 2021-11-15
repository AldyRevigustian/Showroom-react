import React, { useState, useEffect } from "react";
import Videos from "./Videos";
import Comments from "./Comments";
import ProfileStream from "./ProfileStream";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL_PROFILE, API_URL_SR } from "../utils/constant";
import { Link } from "react-router-dom";
import Ranks from "./LiveRank";
import Gifts from "./GiftLog";
import { Button, Spinner } from "react-bootstrap";
// import DeviceOrientation, { Orientation } from 'react-screen-orientation'


function Streaming() {
    const [profiles, setProfiles] = useState('');
    const [toggle, setToggle] = useState("rank");
    const [loading, setLoading] = useState(false);

    const setActiveGift = () => {
        setToggle("notrank");
    }
    const setActiveRank = () => {
        setToggle("rank");
    }

    let params = useParams();

    const getProfiles = async () => {
        await axios
            .get(API_URL_PROFILE + params.streamingId)
            .then((response) => {
                const profiles = response.data;
                setProfiles(profiles);
            })
        setLoading(true);
    }

    useEffect(() => {
        getProfiles();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    // console.log(profiles);
    return (
        // <DeviceOrientation lockOrientation={'landscape'}>
        //     <Orientation orientation='landscape' alwaysRender={false}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100vh', flex: 1, backgroundColor: '#222831', justifyContent: 'center',}}>
                {loading ? (<div style={{ backgroundColor: '#222831', display: 'flex' }}>
                    {profiles.is_onlive === true ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100vh', flex: 1, backgroundColor: '#222831', padding: 0 }}>
                            <div className="kiri" style={{ display: 'flex', flexDirection: 'column', flex: "20%", backgroundColor: '#EEEEEE', height: '500px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-38px' }}>
                                    <Button onClick={setActiveRank} variant="warning" style={{ marginRight: 20, marginLeft: 45, color: toggle === "rank" ? 'white' : 'black', borderRadius: 0 }} >Ranks</Button>
                                    <Button onClick={setActiveGift} variant="danger" style={{ color: toggle === "notrank" ? 'white' : 'black', borderRadius: 0 }}>Gifts</Button>
                                </div>
                                {toggle === "rank" ? (<Ranks />) : (<Gifts />)}
                            </div>
                            <div className="tengah" style={{ display: 'flex', flexDirection: 'column', flex: "60%", backgroundColor: '#EEEEEE', height: '500px' }}>
                                <Videos />
                                <ProfileStream />
                            </div>
                            <div className="kanan" style={{ display: 'flex', flexDirection: 'column', height: '500px', flex: "20%" }}>
                                <Comments />
                            </div>
                        </div>
                    )
                        :
                        (
                            <div style={{ userSelect: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flex: 1, flexDirection: 'column' }}>
                                <div>
                                    <h2 style={{ color: 'white' }}>The Streamer Is Offline / No Streamer With This ID</h2>
                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <Link style={{ display: "inline", fontWeight: 'bold', fontSize: '30px', backgroundColor: '#FF0000', padding: 10, borderRadius: 10, color: 'white', textDecoration: 'none' }}
                                        to={`/`}> Go Back</Link>
                                </div>
                                <a rel="noreferrer" href={API_URL_SR} target="_blank" style={{ color: 'white', fontSize: '18px', marginTop: 30 }}>SHOWROOM</a>
                            </div>
                        )
                    }

                </div>
                )

                    :

                    (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'block' }}>
                                <h3 style={{ color: 'white' }}>Loading</h3>
                            </div>
                            <div style={{ display: 'block', marginTop: 20 }}>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </div>
                    )}
            </div>
        //     </Orientation>

        //     <Orientation orientation='portrait'>
        //         <div>
        //             <p>Please rotate your device</p>
        //         </div>
        //     </Orientation>
        // </DeviceOrientation>
    );
}

export default Streaming