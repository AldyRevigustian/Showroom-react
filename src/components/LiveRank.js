import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL_RANK } from "../utils/constant";


function Ranks() {
    const [ranks, setRanks] = useState('');
    let params = useParams();

    const getRanks = () => {
        axios
            .get(API_URL_RANK + params.streamingId)
            .then((response) => {
                const ranks = response.data;
                setRanks(ranks);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getRanks();
    });

    // console.log(ranks.stage_user_list);
    return (
        <div className="ranks" style={{userSelect:'none',height:'500px', transform: "scaleX(-1)",overflowY:'scroll',width:300, display:'flex', flexDirection:'column', flex:1, backgroundColor:'#393E46'}}>
        {ranks.stage_user_list &&
            ranks.stage_user_list.map((rank) => (
                <div style={{transform: "scaleX(-1)"}}>
                    <div className="" style={{padding:'14px 0 0 10px'}}>
                        <span style={{color:'white', fontSize:13}}>{rank.rank}</span><img alt="" style={{width:'10%', margin:'0 10px 0 10px'}} src={rank.user.avatar_url} /><span style={{color:'white', fontSize:12, margin:'10px 0 10px 0', fontWeight:'bold'}}>{rank.user.name}</span>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Ranks