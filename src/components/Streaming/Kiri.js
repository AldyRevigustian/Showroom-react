import React, { useState } from 'react'
import Gifts from './GiftLog'
import Ranks from './LiveRank'
import { Button } from "react-bootstrap";
import Comments from './Comments';


function Kiri() {
    const [toggle, setToggle] = useState("comment");

    const setActiveGift = () => {
        setToggle("gift");
    }
    const setActiveRank = () => {
        setToggle("rank");
    }
    const setActiveComment = () => {
        setToggle("comment");
    }

    return (
        <div className="kiri" style={{ display: 'flex', flexDirection: 'column', flex: "20%", backgroundColor: '#EEEEEE', height: '500px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-38px', marginLeft:'10px' }}>
                <Button onClick={setActiveComment} variant="success" style={{ color: toggle === "comment" ? 'white' : '#e3e3e3',  fontWeight: toggle ==='comment' ? 'bold' : "100",borderRadius: "10px 10px 0 0" }}>Comments</Button>
                <Button onClick={setActiveRank} variant="warning" style={{ color: toggle === "rank" ? 'white' : '#e3e3e3',  fontWeight: toggle ==='rank' ? 'bold' : "100",borderRadius: "10px 10px 0 0" }} >Ranks</Button>
                <Button onClick={setActiveGift} variant="danger" style={{ color: toggle === "gift" ? 'white' : '#e3e3e3',  fontWeight: toggle ==='gift' ? 'bold' : "100",borderRadius: "10px 10px 0 0" }}>Gifts</Button>
            </div>
            {(() => {
                switch (toggle) {
                case "comment":  return (<Comments />);
                case "rank":   return (<Ranks />);
                case "gift": return (<Gifts />);
                default:      return (<Comments />);
            }
            })()}
        </div>
        
    )
}

export default Kiri
