import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL_GIFT } from "../../utils/constant";
import { Spinner } from "react-bootstrap";



function Gifts() {
    const [gifts, setGifts] = useState('');
    let params = useParams();

    const getGifts = () => {
        axios
            .get(API_URL_GIFT + params.streamingId)
            .then((response) => {
                const gifts = response.data;
                setGifts(gifts);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getGifts();
    },[]);

    // console.log(gifts.gift_log);
    return (
        <div style={{userSelect:'none', height:'500px', transform: "scaleX(-1)",overflowY:'scroll',width:300, display:'flex', flexDirection:'column', flex:1, backgroundColor:'#393E46'}}>
            {gifts.gift_log ? (
                <div>
                    {gifts.gift_log && gifts.gift_log.map((gift, index) => (
                        <div key={index}>
                            <div style={{transform: "scaleX(-1)"}}>
                                <div className="" style={{padding:'14px 0 10px 10px', display:'flex', flexDirection:'row'}}>
                                <img alt="" style={{width:'30px',height:'30px', margin:'5px 10px 0 0', display:'flex', flex:0.4}} src={gift.avatar_url} />
                                    <div style={{display:'flex', flexDirection:'column', flex:3}}>
                                            <span style={{color:'white', fontSize:13, margin:'0px 0 0px 0', fontWeight:'bold'}}>{gift.name}</span>
                                            <div><img alt="" style={{width:'10%', margin:'0 10px 0 0'}} src={gift.image} /><span style={{color:'white',fontSize:13, margin:'0px 0 0 0'}}>{gift.num} x</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            ) 
            
            : 
            
            (
                <div style={{display:'flex', justifyContent:'center',alignItems:'center', height: '500px'}}>
                    <Spinner animation="border" variant="secondary"  />
                </div>
            )
            }
        </div>
    );
}

export default Gifts