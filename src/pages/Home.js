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
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        const getNames = () => {
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
        getNames();

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            console.log(foundUser);
        }
        console.log(rooms);
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
            }
        } catch (err) {
            setButtonLoading(false);
            setError("Incorrect username or password");
        }
    };

    return (
        <div>
            <nav
                className="navbar navbar-dark navbar-expand-sm fixed-top"
                style={{ backgroundColor: "#21252B" }}
            >
                <div className="container">
                    <a href="/" className="navbar-brand">
                        <h2 className="mb-2">Sorum Mint</h2>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navbarCollapse" className="collapse navbar-collapse">
                        <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
                            <li className="nav-item">
                                <a href="" className="nav-link active">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-link">
                                    Blog
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-link">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-link">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item">
                                <button
                                    href=""
                                    className="btn btn-secondary ms-5"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    type="button"
                                >
                                    Login
                                </button>
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
                                        <span className="badge bg-danger">Live</span>
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
                                    <label className="form-label">
                                        Account Id
                                    </label>
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
                                    <label className="form-label">
                                        Password
                                    </label>
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
