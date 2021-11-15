import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card , Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_PROFILE } from "../utils/constant";
import loadings from '../img/loading.png'



export default function RoomOffline(props) {
    const [profiles, setProfiles] = useState('');
    const { profile_id } = props;
    const [loading, setLoading] = useState(false);

    const getRoom = async() => {
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

    console.log(profiles);
    return (
        <div>
            {loading ? 
            (
                <div>
                    {profiles.is_onlive === false ? (
                        <Card  style={{ width: "245px", margin: 10 }}>
                            <Card.Img variant="top" src={profiles.image} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 13, marginBottom: 0}}>{profiles.room_name}</Card.Title>
                            </Card.Body>
                        </Card>
                    ) : ""}
                </div>

            ) 
            
                : 
            (
                // <div style={{margin:10}}>
                //     <Spinner animation="grow" variant="secondary"  />
                // </div>
                <Card style={{ width: "245px", margin: 10 }}>
                            <Card.Img variant="top" src={loadings} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 13, marginBottom: 0}}></Card.Title>
                            </Card.Body>
                </Card>
            )}
            
        </div>
    );

}





