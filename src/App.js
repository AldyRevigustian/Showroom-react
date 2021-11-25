import React from "react";
import RoomOnline from "./components/RoomStream/RoomOnline";
import RoomOffline from "./components/RoomStream/RoomOffline";
import { memberId } from "./utils/constant";
import './style.css';
import { useMediaQuery } from 'react-responsive'


function App() {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (

    <div style={{ minHeight: '100vh', backgroundColor: '#222831', overflowX: 'hidden'}}>
      {isDesktopOrLaptop &&
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
          <div className="1" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: 30, marginBottom: 30 }} >
            <h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Is Live</h3>
            <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 20 }}>
              {memberId.map((member) => {
                return (
                  <div key={member}>
                    <RoomOnline profile_id={member} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="2" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }} >
            <h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>List Member</h3>
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

      }

      {isTabletOrMobile &&
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
          <div className="1" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: 30, marginBottom: 30 }} >
            <h3 style={{ display: 'flex', justifyContent: 'center', fontSize: 20, fontWeight: 'bold', color: 'white', margin: '15px 0 10px 0', }}>Is Live</h3>
            <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',  }}>
              {memberId.map((member) => {
                return (
                  <div key={member}>
                    <RoomOnline profile_id={member} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="2" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }} >
            <h3 style={{display: 'flex',flexWrap: 'wrap', justifyContent: 'center',  margin: '15px 0 10px 0', fontSize: 20, fontWeight: 'bold', color: 'white' }}>List Member</h3>
            <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',  }}>
              {memberId.map((member) => {
                return (
                  <div key={member} >
                    <RoomOffline profile_id={member} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>}


    </div>
  )
}


export default App
