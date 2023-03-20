import { AiOutlineArrowLeft, AiOutlineLink } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { BsCalendar, BsTag } from "react-icons/bs";
import { Carousel } from "react-carousel-minimal";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./style.css";
import Loading from "../Loading";
import moment from "moment";
import ReactMarkdown from "react-markdown";

export default function ProjectsMenu() {
    let { id } = useParams();
    const [project, setProject] = useState();
    const [dataImage, setDataImage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/#project");
    };
    useEffect(() => {
        getById();
    }, [id]);

    const getById = () => {
        axios
            .get(`https://matar-portfolio.onrender.com/projects/${id}`)
            .then((res) => {
                setProject(res.data.response);
                setDataImage([
                    ...dataImage,
                    { image: res.data.response.image },
                ]);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <div className="Single_Project_container">
                <p
                    // onClick={() => navigate(-1)}
                    onClick={handleNavigate}
                    className="back_btn"
                >
                    {" "}
                    <AiOutlineArrowLeft />{" "}
                </p>

                <h1>Projects</h1>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="project_list">
                        <div className="project_slider">
                            <Carousel
                                data={dataImage}
                                time={2000}
                                width="850px"
                                height="500px"
                                radius="10px"
                                captionPosition="bottom"
                                automatic={true}
                                dots={true}
                                pauseIconColor="white"
                                pauseIconSize="40px"
                                slideBackgroundColor="#e7e7e7"
                                slideImageFit="cover"
                                thumbnails={true}
                                thumbnailWidth="100px"
                                style={{
                                    textAlign: "center",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                }}
                            />
                        </div>

                        <div className="single_project_discription">
                            <p className=" project_calandar">
                                <BsCalendar />{" "}
                                {moment(project.date).format("MMMM YYYY")}
                            </p>

                            <div className="project__title">
                                <h1>{project.title}</h1>
                                <p className="project_languages">
                                    <BsTag />{" "}
                                    {project.skill_id.map((skill) => {
                                        return <span>{skill.title}</span>;
                                    })
                                        .reduce((prev, curr) => [prev, ', ', curr])}

                                </p>
                            </div>

                            <p className="project__Description">
                                <ReactMarkdown>
                                    {project.description}
                                </ReactMarkdown>
                            </p>
                            <div className="project__icons">
                                {project.demoURL && (
                                    <a href={project.demoURL} target={"blank"}>
                                        <AiOutlineLink className="AiOutlineLink_icon" />
                                    </a>
                                )}

                                {project.githubURL && (
                                    <a
                                        href={project.githubURL}
                                        target={"blank"}
                                    >
                                        <FaGithub className="AiOutlineLink_icon" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
