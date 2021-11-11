import React, { useEffect, useState } from "react";
import RoomOnline from "./components/RoomOnline";
import RoomOffline from "./components/RoomOffline";
import { memberId, API_URL_USER } from "./utils/constant";
import './style.css';
import axios from "axios";

function App() {
  const [users, setUsers] = useState('');

  const getUsers = () => {
    axios
      .get(API_URL_USER)
      .then((response) => {
        const users = response.data;
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUsers();

  }, [])

  console.log(users);
  return (
    <div style={{ backgroundColor: '#222831', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
        <div className="1" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', marginTop: 30, marginBottom: 30 }} >
          {users.is_login === false ? (<h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Live</h3>) : ""}
          <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginLeft: 20 }}>
            {memberId.map((member) => {
              return (
                <div>
                  <RoomOnline profile_id={member} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="2" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }} >
          {users.is_login === false ? (<h3 style={{ margin: '15px 0 0 30px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Not Live</h3>) : ""}
          <div className="rows" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', jjustifyContent: 'flex-start', marginLeft: 20 }}>
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
    </div>
  )
}


export default App
