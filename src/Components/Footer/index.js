import React from "react";
import { FaLinkedin, FaAngleDoubleUp } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import "./style.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer__container">
            <div className="footer_section">
                <div className="footer_backToTop">
                    <a href="#home">
                        <FaAngleDoubleUp />
                    </a>
                    <span className="back_to_top">Back to top</span>
                </div>
                <ul className="footer_icons">
                    <li>
                        <a
                            href="https://www.facebook.com/mohammad.matar.984"
                            target={"blank"}
                        >
                            <ImFacebook />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/mohamad-matar/"
                            target={"blank"}
                        >
                            <FaLinkedin />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://instagram.com/moe.matar?igshid=YmMyMTA2M2Y="
                            target={"blank"}
                        >
                            <BsInstagram />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:moe.matar1998@gmail.com" target={"blank"}>
                            <AiOutlineMail />
                        </a>
                    </li>
                </ul>
                <p className="copyright">
                    @ {currentYear}Mohamad Matar All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
