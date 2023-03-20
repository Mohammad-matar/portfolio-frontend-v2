import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import "./style.css";

export default function LatestWork({ isDashboard = false }) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getall();
    }, []);

    const getall = () => {
        axios
            .get("https://matar-portfolio.onrender.com/projects")
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/project/${id}`);
    };
    return (
        <div className="latestwork_container" id="project">
            <div className="common_title">Latest Work</div>

            <div className="Project_description">
                {isLoading ? (
                    <Loading />
                ) : (
                    data.map((data) => {
                        return (
                            <div className="project_cards">
                                <div className="project_image_container">
                                    <img src={data.image} alt="projectimg" />
                                    <div className="overlay_product">
                                        <div className="view_more_project_button">
                                            <button
                                                onClick={() =>
                                                    handleClick(data._id)
                                                }
                                            >
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p className="project_title_name">
                                    {data.title}
                                </p>
                                <p> {data.service_id.title}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
