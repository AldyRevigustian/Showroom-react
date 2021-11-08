import React from "react";
import Room from "./components/Room";
import RoomOffline from "./components/RoomOffline";
import { memberId } from "./utils/constant";

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', backgroundColor:'#222831'}}>

      <div className="1" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop:30, marginBottom:30 }} >
        <h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color:'white' }}>Live</h3>
        <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft:20 }}>
          {memberId.map((member) => {
            return (
              <div>
                <Room profile_id={member} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="2" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }} >
        <h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color:'white' }}>Not Live</h3>
        <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', jjustifyContent: 'flex-start', marginLeft:20 }}>
          {memberId.map((member) => {
            return (
              <div>
                <RoomOffline profile_id={member} />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}


export default App
