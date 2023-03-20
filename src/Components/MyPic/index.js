import React from "react";
import "./style.css";

export default function MyPic({ data }) {
    return <img src={data.image} alt="mypic" className="mypic_src" />;
}
