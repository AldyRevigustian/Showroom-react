import React, { useState } from 'react'
import Gifts from './GiftLog'
import Ranks from './LiveRank'
import { Button } from "react-bootstrap";


function Kiri() {
    const [toggle, setToggle] = useState("rank");

    const setActiveGift = () => {
        setToggle("notrank");
    }
    const setActiveRank = () => {
        setToggle("rank");
    }

    return (
        <div className="kiri" style={{ display: 'flex', flexDirection: 'column', flex: "20%", backgroundColor: '#EEEEEE', height: '500px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-38px' }}>
                <Button onClick={setActiveRank} variant="warning" style={{ marginRight: 20, marginLeft: 45, color: toggle === "rank" ? 'white' : 'black', borderRadius: 0 }} >Ranks</Button>
                <Button onClick={setActiveGift} variant="danger" style={{ color: toggle === "notrank" ? 'white' : 'black', borderRadius: 0 }}>Gifts</Button>
            </div>
            {toggle === "rank" ? (<Ranks />) : (<Gifts />)}
        </div>
    )
}

export default Kiri
