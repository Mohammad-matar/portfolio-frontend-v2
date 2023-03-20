/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Mypic from "../MyPic/index";
import CV from "../CV/index";
import { AiOutlineEdit } from "react-icons/ai";
import hashimage from "../../images/halfRectangle.png";
import { useAuth } from "../../auth";
import { Box, Modal, TextField, Typography } from "@mui/material";

import axios from "axios";
import "./style.css";
import Loading from "../Loading";
import Swal from "sweetalert2";

export default function Personal({ isDashboard = false }) {
    const auth = useAuth();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({ ...data });

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData(data);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "1px solid #fff",
        width: "70%",
        boxShadow: 24,
        overflow: "auto",
        maxHeight: "100vh",
        p: 4,
    };

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /////////////////
    const handleFileSelect = async (e) => {
        const fileData = new FormData();
        fileData.append("file", e.target.files[0]);

        // let form
        await axios
            .post("https://matar-portfolio.onrender.com/upload", fileData)
            .then((res) => {
                setFormData({ ...formData, image: res.data.image });
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = async () => {
        let error = null;

        let body = formData;

        if (error !== null) {
            alert(error);
        } else {
            await Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
                customClass: {
                    container: "my_swal",
                    denyButton: "sweetalert_button_delete",
                    confirmButton: "sweetalert_button_confirm",
                    cancelButton: "sweetalert_button_cancel",
                    addingSuccess: "sweetalert_button_success",
                },
                buttonsStyling: false,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios
                        .put(
                            `https://matar-portfolio.onrender.com/personalInfo/${data._id}`,
                            body,
                            {
                                headers: {
                                    Authorization: auth.authorizationToken(),
                                },
                            }
                        )
                        .then((res) => {
                            getall();
                            handleClose();
                        })
                        .catch((err) => {
                            alert("Editing Failed");
                        });
                    Swal.fire({
                        title: "Saved Successfully",
                        icon: "success",
                        confirmButtonText: "Ok",
                        customClass: {
                            container: "my_swal",
                            confirmButton: "sweetalert_button_confirm",
                        },
                        buttonsStyling: false,
                    });
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    };
    if (isLoading) {
        return (

            <div className="personal_info_loading">
                <Loading />
            </div>
        );
    } else {
        return (
            <>
                <div>
                    <div className="personal_container">
                        <div className="personal_information">
                            <div className="personal__info">
                                <p className="personal_hello">Hello</p>
                                <h1 className="personal_header_text">
                                    I’m <span>{data.name}</span>
                                </h1>
                                <p className="personal_description">
                                    {data.headline}
                                </p>
                            </div>
                            <div className="personal__cvbtn">
                                <a href={data.cv} target={"blank"}>
                                    <CV />
                                </a>
                                {isDashboard && (
                                    <button
                                        className="PersonalInfo_modal_add"
                                        onClick={handleOpen}
                                    >
                                        <AiOutlineEdit />
                                    </button>
                                )}
                            </div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h4"
                                        component="h2"
                                    >
                                        Edit Personal Info
                                    </Typography>
                                    <div className="modal_container">
                                        <div className="modal_categories">
                                            <img
                                                src={
                                                    formData.image ||
                                                    data.image ||
                                                    ""
                                                }
                                                alt={"Personalinfo"}
                                            />
                                            {/* upload image */}
                                            <input
                                                type="file"
                                                id="image"
                                                hidden
                                                onChange={handleFileSelect}
                                            />
                                            <label for="image">Upload</label>
                                        </div>

                                        <div>
                                            <Box
                                                component="form"
                                                sx={{
                                                    "& > :not(style)": {
                                                        m: 1,
                                                        width: "100%",
                                                    },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Name"
                                                    variant="standard"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    defaultValue={data.name}
                                                />
                                                <TextField
                                                    id="outlined-basic"
                                                    label="CV URL"
                                                    variant="standard"
                                                    name="cv"
                                                    value={formData.cv}
                                                    onChange={handleChange}
                                                    defaultValue={data.cv}
                                                />
                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="Headline"
                                                    name="headline"
                                                    multiline
                                                    value={formData.headline}
                                                    rows={4}
                                                    defaultValue={data.headline}
                                                    onChange={handleChange}
                                                    variant="standard"
                                                />
                                                <TextField
                                                    id="standard-multiline-static"
                                                    label="About"
                                                    name="aboutMe"
                                                    multiline
                                                    value={formData.aboutMe}
                                                    rows={3}
                                                    defaultValue={data.aboutMe}
                                                    onChange={handleChange}
                                                    variant="standard"
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="categories_modal_submit">
                                        <button onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>

                        <div className="personal_image">
                            <Mypic data={data} />
                        </div>
                        <img
                            src={hashimage}
                            alt="halfpic"
                            className="hashimage"
                        />
                    </div>
                </div>
            </>
        );
    }
}
