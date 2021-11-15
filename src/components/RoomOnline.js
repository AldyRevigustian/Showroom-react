import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_PROFILE } from "../utils/constant";
import { Link } from "react-router-dom";
import './style.css';


export default function RoomOnline(props) {
    const [profiles, setProfiles] = useState('');
    const { profile_id } = props;
    const [loading, setLoading] = useState(false);


    const getRoom = async () => {
        try {
            await axios
                .get(API_URL_PROFILE + profile_id)
                .then((response) => {
                    const profiles = response.data;
                    setProfiles(profiles);
                });
                setLoading(true);
        }catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getRoom();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(()=> {
    //     setTimeout( async () => {
    //         getRoom();
    //     },100)
    // },[])

    // console.log(profiles);
    return (
        <div>
            {loading ? 
            (
                <div>
                {profiles.is_onlive ? (
                    <Card  className="animasi-card" style={{ width: "15rem", margin: 10 }}>
                        <Card.Img variant="top" src={profiles.image} />
                        <Card.Body>
                            <Card.Title style={{  fontSize: 13, marginBottom: 10, }}>{profiles.room_name} 
                            </Card.Title>
                                <Link
                                    style={{ display: "inline", backgroundColor: 'red', padding: 5, borderRadius: 5, color: 'white', textDecoration: 'none', fontSize:15 }}
                                    to={`/streaming/${profiles.room_id}`}>
                                Live </Link>
                            
                        </Card.Body>
                    </Card>
                ) : ""}
                </div>

            ) 
                : 
            (
                <div style={{marginRight:"-30px", marginTop:'30px', marginLeft:'10px'}}>
                    <Spinner animation="grow" variant="secondary"  />
                </div>
            )}
            
        </div>
    );

}





