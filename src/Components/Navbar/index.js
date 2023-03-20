import React, { useState } from "react";
// import { useEffect } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import "./style.css";

const Navbarmenu = () => {
    const auth = useAuth()

    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);

    const toggleClass = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
    };

    let boxClass = ["main-menu menu-right menuq1"];
    if (isMenu) {
        boxClass.push("menuq2");
    } else {
        boxClass.push("");
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login")
    }
    const handleLogout = () => {
        auth.logout();
        navigate("/")
    }
    return (
        <div className="header">
            <div className="TitleName">
                <h1> Mohamad </h1>
            </div>
            <div>
                <div className="header_container">
                    <div className="header_menus">
                        <nav className="main-nav ">
                            {/* Responsive Menu Button */}
                            {isResponsiveclose === true ? (
                                <>
                                    <span
                                        className="menubar__button"
                                        style={{ display: "none" }}
                                        onClick={toggleClass}
                                    >
                                        <IoMdClose />
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span
                                        className="menubar__button"
                                        style={{ display: "none" }}
                                        onClick={toggleClass}
                                    >
                                        <IoIosMenu />
                                    </span>
                                </>
                            )}
                            <ul className={boxClass.join(" ")}>
                                <li className="menu-item">
                                    <a href="/#home"> Home</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#about">About</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#experience">Experience</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#project">Projects</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/#contact">Contact Me</a>
                                </li>
                                {auth.authorizationToken() ? <li className="menu-item" onClick={handleLogout}>
                                    logout
                                </li> :
                                    <li className="menu-item" onClick={handleClick}>
                                        <p className="login_curose">
                                            login

                                        </p>
                                    </li>
                                }

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbarmenu;