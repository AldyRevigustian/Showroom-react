import React, { useEffect, useState } from "react";
import Gifts from "./GiftLog";
import Ranks from "./LiveRank";
import { Button } from "react-bootstrap";
import Comments from "./Comments";
import { useMediaQuery } from "react-responsive";
import { API_URL_PROFILE, SEND_COMMENT } from "../../utils/constant";
import axios from "axios";
import { useParams } from "react-router-dom";

function Kiri() {
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const [toggle, setToggle] = useState("comment");
    const [comment, setComment] = useState("");
    const [session, setSession] = useState("");
    const [names, setNames] = useState("");
    let params = useParams();


    const setActiveGift = () => {
        setToggle("gift");
    };
    const setActiveRank = () => {
        setToggle("rank");
    };
    const setActiveComment = () => {
        setToggle("comment");
    };

    useEffect(() => {
        const getNames =  () => {
            axios.get(API_URL_PROFILE + params.streamingId)
                .then((response) => {
                    const names = response.data;
                    setNames(names);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getNames();

        const userSession = localStorage.getItem("session");
        if (userSession) {
            const foundSession = JSON.parse(userSession);

            setSession(foundSession);
        }
    }, [])

    const sendComment = async (e) => {
        e.preventDefault();
        // setButtonLoading(true);
        try {
            const response = await axios.post(SEND_COMMENT, {
                live_id: names.live_id,
                room_url_key: names.room_url_key,
                comment: comment,
                csrf: session.csrf_token,
                cookies_id: session.cookie_login_id,
            });
            console.log(response.data);
        } catch (err) {
            // setButtonLoading(false);
            // setError("Incorrect username or password");
        }
    };


    return (
        <>
            {isDesktopOrLaptop && (
                <div
                    className="kiri"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: "20%",
                        backgroundColor: "#EEEEEE",
                        height: "500px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "-38px",
                            marginLeft: "10px",
                        }}
                    >
                        <Button
                            onClick={setActiveComment}
                            variant="success"
                            style={{
                                color: toggle === "comment" ? "white" : "#e3e3e3",
                                fontWeight: toggle === "comment" ? "bold" : "100",
                                borderRadius: "10px 10px 0 0",
                            }}
                        >
                            Comments
                        </Button>
                        <Button
                            onClick={setActiveRank}
                            variant="warning"
                            style={{
                                color: toggle === "rank" ? "white" : "#e3e3e3",
                                fontWeight: toggle === "rank" ? "bold" : "100",
                                borderRadius: "10px 10px 0 0",
                            }}
                        >
                            Ranks
                        </Button>
                        <Button
                            onClick={setActiveGift}
                            variant="danger"
                            style={{
                                color: toggle === "gift" ? "white" : "#e3e3e3",
                                fontWeight: toggle === "gift" ? "bold" : "100",
                                borderRadius: "10px 10px 0 0",
                            }}
                        >
                            Gifts
                        </Button>
                    </div>
                    {(() => {
                        switch (toggle) {
                            case "comment":
                                return <>
                                    <Comments />
                                    <form onSubmit={sendComment}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Comment"
                                            value={comment}
                                            onChange={(e) => setComment
                                                (e.target.value)}
                                        />
                                        <button type="submit" className="btn btn-secondary">Send Comment</button>
                                    </form >
                                </>;
                            case "rank":
                                return <Ranks />;
                            case "gift":
                                return <Gifts />;
                            default:
                                return <Comments />;
                        }
                    })()}
                </div>
            )}

            {isTabletOrMobile && (
                <div
                    className="kiri"
                    style={{
                        display: "flex",
                        maxHeight: "530px",
                        flexDirection: "column",
                        backgroundColor: "#EEEEEE",
                        marginTop: "30px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#222831",
                        }}
                    >
                        <Button
                            onClick={setActiveComment}
                            variant="success"
                            style={{
                                color: toggle === "comment" ? "white" : "#e3e3e3",
                                fontWeight: toggle === "comment" ? "bold" : "100",
                                borderRadius: "10px 10px 0 0",
                            }}
                        >
                            Comments
                        </Button>
                        <Button
                            onClick={setActiveRank}
                            variant="warning"
                            style={{
                                color: toggle === "rank" ? "white" : "#e3e3e3",
                                fontWeight: toggle === "rank" ? "bold" : "100",
                                borderRadius: "10px 10px 0 0",
                            }}
                        >
                            Ranks
                        </Button>
                        <Button
                            onClick={setActiveGift}
                            variant="danger"
                            style={{
                                color: toggle === "gift" ? "white" : "#e3e3e3",
                                fontWeight: toggle === "gift" ? "bold" : "100",
                                borderRadius: "10px 10px 0 0",
                            }}
                        >
                            Gifts
                        </Button>
                    </div>
                    {(() => {
                        switch (toggle) {
                            case "comment":
                                return <>
                                    <Comments />
                                    <form onSubmit={sendComment}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Comment"
                                            value={comment}
                                            onChange={(e) => setComment
                                                (e.target.value)}
                                        />
                                        <button type="submit">Send Comment</button>
                                    </form >
                                </>;
                            case "rank":
                                return <Ranks />;
                            case "gift":
                                return <Gifts />;
                            default:
                                return <Comments />;
                        }
                    })()}
                </div>
            )}
        </>
    );
}

export default Kiri;
