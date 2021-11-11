import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_PROFILE } from "../utils/constant";



export default function RoomOffline(props) {
    const [profiles, setProfiles] = useState('');
    const { profile_id } = props;


    const getRoom = () => {
        axios
            .get(API_URL_PROFILE + profile_id)
            .then((response) => {
                const profiles = response.data;
                setProfiles(profiles);
            })
            .catch((error) => {
                console.log(error);
            });
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
            {profiles.is_onlive === false ? (
                <Card style={{ width: "15rem", margin: 10 }}>
                    <Card.Img variant="top" src={profiles.image} />
                    <Card.Body>
                        <Card.Title style={{ fontSize: 13, marginBottom: 0}}>{profiles.room_name}</Card.Title>
                    </Card.Body>
                </Card>
            ) : ""}
        </div>
    );

}





