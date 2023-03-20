import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./style.css";

export default function About() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getall();
    }, []);

    const getall = () => {
        axios
            .get("https://matar-portfolio.onrender.com/personalInfo")
            .then((res) => {
                setData(res.data.data[0]);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    if (isLoading) {
        return;
    } else {
        return (
            <section id="about" className="secionts">
                <div className="about_container">
                    <div className="about_description">
                        <h1>About Me</h1>
                        <p className="about_text">
                            <ReactMarkdown>{data.aboutMe}</ReactMarkdown>
                        </p>
                        <a href="#skills">
                            <button className="about_btn">My Skills</button>
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}
