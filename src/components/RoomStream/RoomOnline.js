import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_PROFILE } from "../../utils/constant";
import { Link } from "react-router-dom";
import './style.css';
import { useMediaQuery } from 'react-responsive'



export default function RoomOnline(props) {
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

    // console.log(profiles);
    return (
        <div>
            {isDesktopOrLaptop &&
                <div>
                    {loading ?
                        (
                            <div>
                                {profiles.is_onlive ? (
                                    <Card className="animasi-card" style={{ width: "14rem", margin: 10 }}>
                                        <Card.Img variant="top" src={profiles.image} />
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: 13, marginBottom: 10, }}>{profiles.room_url_key}
                                            </Card.Title>
                                            <Link
                                                style={{ display: "inline", backgroundColor: 'red', padding: 5, borderRadius: 5, color: 'white', textDecoration: 'none', fontSize: 15 }}
                                                to={`/streaming/${profiles.room_id}`}>
                                                Live </Link>

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
                        )}
                </div>
            }

            {isTabletOrMobile &&
                <div>
                    {loading ?
                        (
                            <div>
                                {profiles.is_onlive ? (
                                    <Card className="animasi-card" style={{ width: "12rem", margin: 10 }}>
                                        <Card.Img variant="top" src={profiles.image} />
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: 13, marginBottom: 10, }}>{profiles.room_url_key}
                                            </Card.Title>
                                            <Link
                                                style={{ display: "inline", backgroundColor: 'red', padding: 5, borderRadius: 5, color: 'white', textDecoration: 'none', fontSize: 15 }}
                                                to={`/streaming/${profiles.room_id}`}>
                                                Live </Link>

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
                        )}
                </div>
            }
        </div>
    );

}





