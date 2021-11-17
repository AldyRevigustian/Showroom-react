import React from "react";
import RoomOnline from "./components/RoomStream/RoomOnline";
import RoomOffline from "./components/RoomStream/RoomOffline";
import { memberId } from "./utils/constant";
import './style.css';

function App() {
  return (
    <div style={{ backgroundColor: '#222831', minHeight: '100vh', overflowX:'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
        <div className="1" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: 30, marginBottom: 30 }} >
          <h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Live</h3>
          <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 20 }}>
            {memberId.map((member) => {
              return (
                <div key={member}>
                  <RoomOnline  profile_id={member} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="2" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }} >
          <h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Not Live</h3>
          <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 20 }}>
            {memberId.map((member) => {
              return (
                <div key={member} >
                  <RoomOffline profile_id={member} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  )
}


export default App
