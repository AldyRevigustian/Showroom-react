import ReactHlsPlayer from "react-hls-player/dist";
import { API_URL_STREAM} from "../utils/constant";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


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
    }, []);

    return (
        // console.log(videos),
            <div className="video" style={{display:'flex', justifyContent:'center'}}>
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
    const { keys, video } = props;
    return (
        <div>
            {keys === 2 ? (
                <ReactHlsPlayer
                    src={video}
                    autoPlay={true}
                    controls={true}
                    width="auto"
                    height="460px"
                    muted={true}
                />
            )
                :
                ""
            }
        </div>
    );
}

export default Videos