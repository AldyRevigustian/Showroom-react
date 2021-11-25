import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_PROFILE } from "../../utils/constant";
import loadings from '../../img/loading.png'
import { useMediaQuery } from 'react-responsive'

export default function RoomOffline(props) {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

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
        } catch (e) {
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
            {/* DEKSTOP */}
            {isDesktopOrLaptop &&
                <div>
                    {loading ?
                        (
                            <div>
                                {profiles.is_onlive === false ? (
                                    <Card style={{ width: "15rem", margin: 10 }}>
                                        <Card.Img variant="top" src={profiles.image} />
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: 13, marginBottom: 0 }}>{profiles.room_url_key}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                ) : ""}
                            </div>

                        )

                        :
                        (
                            <div style={{ marginRight: "-45px", marginTop: '30px', marginLeft: '10px' }}>
                                <Spinner animation="border" variant="secondary" />
                            </div>
                            // <Card style={{ width: "15rem", margin: 10 }}>
                            //             <Card.Img variant="top" src={loadings} />
                            //             <Card.Body>
                            //                 <Card.Title style={{ fontSize: 13, marginBottom: 0, color:'white'}}>.</Card.Title>
                            //             </Card.Body>
                            // </Card>
                        )}
                </div>}
                {/* Dekstop */}

                {/* Mobile */}
                {isTabletOrMobile && 
                <div style={{display:'flex', justifyContent:'center'}}>
                    {loading ?
                        (
                            <div>
                                {profiles.is_onlive === false ? (
                                    <Card style={{ width: "12rem", margin: 10 }}>
                                        <Card.Img variant="top" src={profiles.image} />
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: 13, marginBottom: 0 }}>{profiles.room_url_key}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                ) : ""}
                            </div>

                        )

                        :
                        (
                            <div style={{ marginRight: "-20px", marginTop: '30px', marginLeft: '-15px' }}>
                                <Spinner animation="grow" variant="secondary" />
                            </div>
                            // <Card style={{ width: "12rem", margin: 10 }}>
                            //             <Card.Img variant="top" src={loadings} />
                            //             <Card.Body>
                            //                 <Card.Title style={{ fontSize: 13, marginBottom: 0, color:'white'}}>.</Card.Title>
                            //             </Card.Body>
                            // </Card>
                        )}
                </div>
                }
        </div>
    );

}





