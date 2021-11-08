import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { API_URL_PROFILE } from '../utils/constant';
import { Link, useParams } from "react-router-dom";
import { Card, Badge } from 'react-bootstrap';
import { ArrowBackIos, Circle, People, Visibility} from '@mui/icons-material';

function RoomStream() {
    const [names, setNames] = useState("");
    let params = useParams();

    const getNames = () => {
        axios
            .get(API_URL_PROFILE + params.streamingId)
            .then((response) => {
                const names = response.data;
                setNames(names);
            })
            .catch((error) => {
                console.log(error);
            });   
    }

    useEffect(() => {
        getNames();
    });

    // console.log(names);

    return (
        <div style={{color:'black',}}>
            <span style={{margin:'8px 0 10px 20px', fontWeight:'bold', fontSize:'18px', color:'#222831'}}>{names.room_name}</span>
            {names.is_onlive === true ? (<Badge bg="danger" style={{display:'inline'}} ><Circle style={{fontSize:12,marginBottom:3}} /> Live</Badge>) : (<Badge bg="danger" style={{display:'inline'}} ><Circle style={{fontSize:12,marginBottom:3}} /> Not Live</Badge>)} 
            <Badge bg="success" style={{display:'inline', margin:'0 0 0 10px'}} ><Visibility style={{fontSize:12,marginBottom:3}} /> {names.view_num}</Badge> 
            <Badge bg="primary" style={{display:'inline', margin:'0 0 0 10px'}} ><People style={{fontSize:12,marginBottom:3}} /> {names.follower_num}</Badge> 
            <Link style={{ display: "inline", margin: "10px 0 0 20px", backgroundColor: '#0D6EFD', padding: '5px 10px 5px 10px', borderRadius: 5, color: 'white', textDecoration: 'none' }} to={`/`}><ArrowBackIos style={{fontSize:18, marginBottom:3, }}/>Go Back</Link> </div>
    )
}

export default RoomStream
