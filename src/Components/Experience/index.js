import axios from "axios";
import moment from "moment/moment";
import { useEffect } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Loading from "../Loading";
import "./style.css";

export default function Experience() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getall();
    }, []);

    const getall = () => {
        axios
            .get("https://matar-portfolio.onrender.com/experience")
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <section id="experience" className="experience_section">
            <div className="common_title">Experience</div>
            <VerticalTimeline lineColor="Black">
                {isLoading ? (
                    <Loading />
                ) : (
                    data.map((data) => {
                        return (
                            <VerticalTimelineElement
                                className="vertical-timeline-element--Codi"
                                iconStyle={{
                                    background: "#E8E7E8",
                                    color: "#fff",
                                }}
                                icon={
                                    <img
                                        src={data.companyLogo}
                                        alt="img"
                                        className="icon_experience_img"
                                    />
                                }
                            >
                                <div className="demo">
                                    <div className="demo_container">
                                        <h3 className="vertical-timeline-element-title">
                                            {data.title}
                                        </h3>
                                        <p className="Location">
                                            {data.company} - {data.location}
                                        </p>
                                    </div>
                                    <p className="demo_date">
                                        {moment(data.startDate).format(
                                            "MMM  YYYY"
                                        )}{" "}
                                        -{" "}
                                        {moment(data.endDate).format(
                                            "MMM YYYY"
                                        )}
                                    </p>
                                </div>
                                <div className="ordered_list">
                                    <ReactMarkdown>
                                        {data.description}
                                    </ReactMarkdown>
                                </div>

                                {/* Skills */}
                                <div className="demo_skills_section">
                                    <p>
                                        <span>
                                            <b>Skills</b>:{" "}
                                            {data.skill_id
                                                .map((skill) => {
                                                    return skill.title;
                                                })
                                                .join(", ")}{" "}
                                        </span>
                                    </p>
                                </div>
                            </VerticalTimelineElement>
                        );
                    })
                )}
            </VerticalTimeline>
        </section>
    );
}
