import ReactHlsPlayer from "react-hls-player/dist";
import { API_URL_STREAM} from "../../utils/constant";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'


function Videos() {
    const [videos,setVideos] = useState('');
    let params = useParams();
    
    const getVideos = () => {
        axios
            .get(API_URL_STREAM + params.streamingId)
            .then((response) => {
                const videos = response.data;
                setVideos(videos);
            })
            .catch((error) => {
                console.log(error);
            });   
    }

    useEffect(() => {
        getVideos();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        // console.log(videos),
            <div className="video" style={{userSelect:'none',display:'flex', justifyContent:'center',alignContent:'center'}}>
                {videos.streaming_url_list &&
                    videos.streaming_url_list.map((video) => (
                        <>
                            <Video keys={video.id} video={video.url} />
                        </>
                    ))}
            </div>
    );
}

function Video(props) {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const { keys, video } = props;
    return (
        <div style={{backgroundColor:'#393E46',userSelect:'none'}}>
            {isDesktopOrLaptop && 
            <div>
                {keys === 2 ? (
                    <ReactHlsPlayer
                        src={video}
                        autoPlay={true}
                        controls={true}
                        width="766px"
                        height="auto"
                        muted={true}
                    />
                )
                    :
                    ""
                }
            </div>}

            {isTabletOrMobile && 
            <div style={{display:'flex', justifyContent:'center'}}>
                {keys === 2 ? (
                    <ReactHlsPlayer
                        src={video}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        height="auto"
                        muted={true}
                    />
                )
                    :
                    ""
                }
            </div>}
            
        </div>
    );
}

export default Videos