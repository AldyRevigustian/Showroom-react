import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { API_URL_PROFILE, API_URL_SR } from '../../utils/constant';
import { Link, useParams } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { ArrowBack, 
    // People, 
    Visibility, } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive'


function ProfileStream() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

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
        <>
        {isDesktopOrLaptop && 
            <div style={{userSelect:'none', display:'flex', justifyContent:'center', alignItems:'center',backgroundColor:'#393E46', height:'100%'}}>
                <Link style={{ fontSize:12,display: "inline", backgroundColor: '#FFCA2C', padding: '5px 10px 4px 10px', borderRadius: 5, color: 'white', textDecoration: 'none' , fontWeight:'bold'}} to={`/`}><ArrowBack style={{fontSize:14, marginBottom:2, }}/> Back</Link> 
                {/* <Button variant="danger"  style={{margin:'0 0 0 10px',  padding: '5px 10px 4px 10px', fontSize:12, }}>Showroom</Button> */}
                <a rel="noreferrer" href={`${API_URL_SR + names.room_url_key}`} target="_blank" style={{color:'white',margin:'0 20px 0 20px', fontWeight:'bold', fontSize:'18px', textDecoration:'none'}}>{names.room_url_key}</a>
                <Badge bg="success" style={{display:'inline', padding: '5px 10px 4px 10px'}} ><Visibility style={{fontSize:14,marginBottom:2}} /> {names.view_num}</Badge> 
            </div>
        }

        {isTabletOrMobile && 
            <div style={{userSelect:'none', display:'flex', justifyContent:'center', alignItems:'center',backgroundColor:'#393E46', height:'50px'}}>
                <Link style={{ fontSize:12,display: "inline", backgroundColor: '#FFCA2C', padding: '5px 10px 4px 10px', borderRadius: 5, color: 'white', textDecoration: 'none' , fontWeight:'bold'}} to={`/`}><ArrowBack style={{fontSize:14, marginBottom:2, }}/> Back</Link> 
                {/* <Button variant="danger"  style={{margin:'0 0 0 10px',  padding: '5px 10px 4px 10px', fontSize:12, }}>Showroom</Button> */}
                <a rel="noreferrer" href={`${API_URL_SR + names.room_url_key}`} target="_blank" style={{color:'white',margin:'0 20px 0 20px', fontWeight:'bold', fontSize:'18px', textDecoration:'none'}}>{names.room_url_key}</a>
                <Badge bg="success" style={{display:'inline', padding: '5px 10px 4px 10px'}} ><Visibility style={{fontSize:14,marginBottom:2}} /> {names.view_num}</Badge> 
            </div>
        }
        </>
    )
}

export default ProfileStream
