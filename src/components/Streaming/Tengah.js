import React from 'react'
import ProfileStream from './ProfileStream'
import Videos from './Videos'
import { useMediaQuery } from 'react-responsive'

function Tengah() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })


    return (
        <div>
            {isDesktopOrLaptop && 
            <div className="tengah" style={{ display: 'flex', flexDirection: 'column', flex: "70%", backgroundColor: '#EEEEEE', height: '500px' }}>
                <Videos />
                <ProfileStream />
            </div> }

            {isTabletOrMobile &&
            <div className="tengah" style={{ display: 'flex', flexDirection: 'column', flex: "70%",}}>
                <Videos />
                <ProfileStream />
            </div> }
        </div>
    )
}

export default Tengah
