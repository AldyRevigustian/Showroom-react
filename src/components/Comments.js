import { API_URL_COMMENT} from "../utils/constant";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


function Comments (props) {
    const [comments,setComments] = useState('');
    let params = useParams();
    
    const getComment = () => {
        axios
        .get(API_URL_COMMENT + params.streamingId)
        .then((response) => {
            const comments = response.data;
            setComments(comments);
        })
        .catch((error) => {
            console.log(error);
        });  
    }

    useEffect(() => {
        getComment();
    });

    return (
        // console.log(videos.streaming_url_list),
        <div className="comment" style={{height:'500px', overflowY:'scroll',width:300, display:'flex', flexDirection:'column', flex:1, backgroundColor:'#393E46'}}>
            {comments.comment_log &&
                comments.comment_log.map((comment) => (
                    <>
                        <div className="comments" style={{padding:'14px 0 0 10px'}}>
                            <img style={{width:'10%', margin:'0 10px 0 10px'}} src={comment.avatar_url} /><span style={{color:'white', fontSize:13, margin:'10px 0 10px 0', fontWeight:'bold'}}>{comment.name}</span>
                            <p  style={{color:'white',fontSize:13, margin:'10px 0 0px 10px'}}>{comment.comment}</p>
                        </div>
                    </>
                ))}
        </div>
    );
}

export default Comments