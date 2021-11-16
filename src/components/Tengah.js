import React from 'react'
import ProfileStream from './ProfileStream'
import Videos from './Videos'

function Tengah() {
    return (
        <div className="tengah" style={{ display: 'flex', flexDirection: 'column', flex: "60%", backgroundColor: '#EEEEEE', height: '500px' }}>
            <Videos />
            <ProfileStream />
        </div>
    )
}

export default Tengah
