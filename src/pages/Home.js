import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style.css";
import "../styles/home.css";

import { LOGIN, ROOM } from "../utils/constant";

function Home() {
    const [rooms, setRooms] = useState("");
    const [loading, setLoading] = useState(false);

    const [accountId, setAccountId] = useState("");
    const [password, setPassword] = useState("");
    const [captchaWord, setCaptchaWord] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const [profile, setProfile] = useState("");
    const [session, setSession] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        const getRooms = () => {
            axios
                .get(ROOM)
                .then((response) => {
                    const roomd = response.data;
                    setRooms(roomd);
                    setLoading(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getRooms();

        const loggedInUser = localStorage.getItem("user");
        const userSession = localStorage.getItem("session");
        const userProfile = localStorage.getItem("profile");

        if (loggedInUser && userSession) {
            const foundUser = JSON.parse(loggedInUser);
            const foundSession = JSON.parse(userSession);
            const foundProfile = JSON.parse(userProfile);
            setUser(foundUser);
            setSession(foundSession);
            setProfile(foundProfile);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        try {
            const response = await axios.post(LOGIN, {
                account_id: accountId,
                password: password,
                captcha_word: captchaWord,
            });

            console.log(response.data);

            if (response.data.user.captcha_url) {
                setButtonLoading(false);
                document.getElementById("captcha").style.display = "block";
                setCaptcha(response.data.user.captcha_url);
            }

            if (response.data.user.ok) {
                setButtonLoading(false);
                console.log("berhasil");

                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("session", JSON.stringify(response.data.session));
                localStorage.setItem("profile", JSON.stringify(response.data.profile));

                window.location.reload(false);
            }
        } catch (err) {
            setButtonLoading(false);
            setError("Incorrect username or password");
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container">
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    Left
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="//codeply.com">
                                    Codeply
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-auto order-0">
                        <a className="navbar-brand mx-auto fw-bold" href="#">
                            Sorum Mint
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target=".dual-collapse2"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item d-flex justify-content-end">
                                {session ? (
                                    <div className="row justify-content-end align-items-center">
                                        <div className="row col-10" style={{ textAlign: "end" }}>
                                            <span
                                                className="me-0 pe-0 fw-bold"
                                                style={{ fontSize: "1rem", display: "inline" }}
                                            >
                                                {profile.name}
                                            </span>
                                            <span
                                                className="me-0 pe-0"
                                                style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}
                                            >
                                                {user.user_id}
                                            </span>
                                        </div>
                                        <img
                                            src={profile.image}
                                            alt=""
                                            style={{ width: "13%" }}
                                            className="rounded-circle col-2"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        href=""
                                        className="btn btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        type="button"
                                    >
                                        Login
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 pt-5">
                <div className="row">
                    <h3 className="mt-5 mb-3">Room List</h3>
                    {loading
                        ? rooms.map((room, index) => (
                            <div
                                className="col-6 col-md-4 col-sm-6 col-lg-4 py-3 pe-4"
                                key={index}
                            >
                                <div className="card containers">
                                    {room.is_live ? (
                                        <span
                                            className="badge bg-danger"
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                fontSize: "15px",
                                                borderRadius: "0px 15px 0px 15px",
                                            }}
                                        >
                                            Live
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    <div className="pickgradient">
                                        <img
                                            className="card-img-top"
                                            src={room.image_url}
                                            alt="Card image cap"
                                        />
                                    </div>
                                    <h5 className="card-title bottom-left">{room.name}</h5>
                                </div>
                            </div>
                        ))
                        : ""}
                </div>
            </div>

            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" style={{ marginTop: "15%" }}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="btn-close ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                style={{ display: "block", color: "black" }}
                            ></button>
                            <h2 className="text-center">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 mt-5">
                                    <label className="form-label">Account Id</label>
                                    <input
                                        type="number"
                                        required
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Showroom Account Id"
                                        value={accountId}
                                        onChange={(e) => setAccountId(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Showroom Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <p style={{ color: "red" }}>{error ? error : ""}</p>

                                <div className="mb-3" id="captcha" style={{ display: "none" }}>
                                    <label className="form-label">
                                        Please complete the captcha below
                                    </label>
                                    <img
                                        src={captcha}
                                        alt=""
                                        style={{ zIndex: 10, minWidth: "100%", border: 0 }}
                                    />

                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Capctha"
                                        value={captchaWord}
                                        onChange={(e) => setCaptchaWord(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary col-12 mt-3 mb-2"
                                    disabled={buttonLoading ? true : false}
                                >
                                    {buttonLoading ? "..." : "Login"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
