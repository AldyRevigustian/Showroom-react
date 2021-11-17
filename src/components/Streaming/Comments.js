import { API_URL_COMMENT } from "../../utils/constant";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";


function Comments() {
    const [comments, setComments] = useState('');
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
        <div className="comment" style={{ userSelect: 'none', height: '500px', transform: "scaleX(-1)", overflowX: 'hidden', overflowY: 'scroll', width: 300, display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#393E46' }}>
            {comments.comment_log ? (
                <div>
                    {comments.comment_log && comments.comment_log.map((comment) => (
                        <>
                            <div className="comments" style={{ padding: '14px 0 0 10px', display: 'flex', flexDirection: 'row', transform: "scaleX(-1)" }}>
                                <img alt="" style={{ width: '30px', height: '30px', margin: '5px 10px 0 0px', display: 'flex', flex: 0.4 }} src={comment.avatar_url} />
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
                                    <span style={{ color: 'white', fontSize: 13, margin: '0px 0 0px 0', fontWeight: 'bold' }}>{comment.name}</span>
                                    <span style={{ color: 'white', fontSize: 13, margin: '0px 0 0 0' }}>{comment.comment}</span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            )
            :
            (
                <div style={{display:'flex', justifyContent:'center',alignItems:'center', height: '500px'}}>
                    <Spinner animation="border" variant="secondary"  />
                </div>
            )}
        </div>
    );
}

export default Comments