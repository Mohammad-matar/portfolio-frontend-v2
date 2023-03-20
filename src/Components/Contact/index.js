import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ImFacebook } from "react-icons/im";
import {
    AiFillInstagram,
    AiFillLinkedin,
    AiOutlineTwitter,
} from "react-icons/ai";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dots2 from "../../images/Dots2.png";
import emailjs from "@emailjs/browser";
import "./style.css";

export default function Contact() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getall();
    }, []);

    const getall = () => {
        axios
            .get("https://matar-portfolio.onrender.com/contact")
            .then((res) => {
                setData(res.data.data[0]);
                // console.log(res.data.data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const form = useRef();

    function sendEmail(e) {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_xze2u9a",
                "template_se8t00r",
                form.current,
                "user_mt5KiN05YOtBGhemev0Gj"
            )
            .then(
                (result) => {
                    alert("Message sent");
                    // console.log(result.text);
                },
                (error) => {
                    alert("Message Failed");
                    console.log(error.text);
                }
            );
        e.target.reset();
    }

    if (isLoading) {
        return;
    } else
        return (
            <section id="contact" className="Contact_Section">
                <div className="Contact_Page">
                    <div className="contact_info">
                        <h1>Mohamad Matar</h1>
                        <div className="contactinfo_icon">
                            <a href={data.facebook}>
                                <ImFacebook />
                            </a>
                            <a href={data.linkedin}>
                                <AiFillLinkedin />
                            </a>
                            <a href={data.twitter}>
                                <AiOutlineTwitter />
                            </a>
                            <a href={data.instagram}>
                                <AiFillInstagram />
                            </a>
                        </div>

                        <div className="personal_contact">
                            <p>My personal contact</p>
                            <p>{data.phone_number}</p>
                        </div>

                        <div>
                            <p className="email_Contact">Say hello, on email</p>
                            <p>{data.email}</p>
                        </div>
                    </div>

                    <div className="contact_page_container">
                        <div className="contact_container">
                            <h1> Contact Me.</h1>
                            <form
                                className="contact_inputs"
                                ref={form}
                                onSubmit={sendEmail}
                            >
                                <Box
                                    sx={{
                                        "& > :not(style)": {
                                            m: 1,
                                            width: "25ch",
                                        },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    display="flex"
                                    flexDirection="column"
                                    gap="8px"
                                    paddingTop="45px"
                                >
                                    <TextField
                                        id="standard-password-input"
                                        label="What is your name ?"
                                        required
                                        type="text"
                                        variant="standard"
                                        style={{ width: 300 }}
                                        name="name"
                                    />
                                    <TextField
                                        id="standard-email-input"
                                        label="What is your email ?"
                                        required
                                        type="email"
                                        variant="standard"
                                        style={{ width: 300 }}
                                        name="email"
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        label="Write your message here"
                                        variant="standard"
                                        name="message"
                                        type="text"
                                        style={{ width: 300 }}
                                        multiline
                                        rows={4}
                                        required
                                    />
                                </Box>
                                <div className="contact_btn">
                                    <button type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <img src={dots2} alt="dots2" className="contact_dots2" />
            </section>
        );
}
