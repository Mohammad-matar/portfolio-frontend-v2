import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../auth";
import "./style.css";
import moment from "moment";
import placeholder from "../../images/placeholder.webp";
import { AiFillPlusCircle } from "react-icons/ai";
import Loading from "../Loading";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function LatestWork({ isDashboard = false }) {
    const auth = useAuth();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [skills, setAllSkills] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEdit, setIsEdit] = useState(false);

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
        maxHeight: "80vh",
        p: 4,
    };
    useEffect(() => {
        getall();
        getAllSkills();
        getAllServices();
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
    const getAllSkills = async () => {
        await axios
            .get("https://matar-portfolio.onrender.com/skills")
            .then((res) => {
                setAllSkills(res.data.data);
                // console.log(res.data.data)
                let skills = res.data.data.map((skill) => {
                    return skill._id;
                });
                console.log(skills);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const getAllServices = async () => {
        await axios
            .get("https://matar-portfolio.onrender.com/services")
            .then((res) => {
                setServices(res.data.data);
                let services = res.data.data.map((service) => {
                    return service._id;
                });
                console.log(services);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/project/${id}`);
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
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = async () => {
        // console.log(formData)
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
                            `https://matar-portfolio.onrender.com/projects/${formData._id}`,
                            body,
                            {
                                headers: {
                                    Authorization: auth.authorizationToken(),
                                },
                            }
                        )
                        .then((res) => {
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
                            getall();
                            handleClose();
                        })
                        .catch((err) => {
                            alert("Editing Failed");
                            console.log(err);
                        });
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    };

    const handleAdd = async () => {
        let error = null;

        let body = formData;

        if (!body.image) {
            error = "Image is required";
        }
        if (!body.title) {
            error = "Title is required";
        }
        if (!body.date) {
            error = "Date is required";
        }
        if (!body.demoURL) {
            error = "Demo URL is required";
        }
        if (!body.githubURL) {
            error = "Github URL is required";
        }
        if (!body.skill_id) {
            error = "Skill Select is required";
        }
        if (!body.service_id) {
            error = "Service type is required";
        }
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
                        .post(
                            `https://matar-portfolio.onrender.com/projects`,
                            body,
                            {
                                headers: {
                                    Authorization: auth.authorizationToken(),
                                },
                            }
                        )
                        .then((res) => {
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
                            getall();
                            handleClose();
                        })
                        .catch((err) => {
                            alert("Adding Failed");
                            console.log(err);
                        });
                } else if (result.isDenied) {
                    Swal.fire("Changes are not added", "", "info");
                }
            });
        }
    };

    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "sweetalert_button_delete",
                cancelButton: "sweetalert_button_cancel",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it",
                cancelButtonText: "No, cancel",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(
                            `https://matar-portfolio.onrender.com/projects/${id}`
                        )
                        .then((res) => {
                            getall();
                            console.log(res);
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    );
                }
            });
    };
    return (
        <div className="latestwork_container" id="project">
            <h1>Latest Work</h1>

            <div className="Project_description">
                {isLoading ? (
                    <Loading />
                ) : (
                    data.map((project) => {
                        return (
                            <div className="project_cards">
                                <div className="project_image_container">
                                    <img src={project.image} alt="projectimg" />
                                    <div className="overlay_product">
                                        <div className="view_more_project_button">
                                            <button
                                                onClick={() =>
                                                    handleClick(project._id)
                                                }
                                            >
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="project_title_name">
                                    {project.title}
                                </p>
                                <p> {project.service_id.title}</p>
                                <div className="experience__project__btn">
                                    {isDashboard && (
                                        <button
                                            className="experience_modal_edit"
                                            onClick={() => {
                                                setIsEdit(true);
                                                setFormData({
                                                    ...project,
                                                    date: moment(
                                                        project.date
                                                    ).format("YYYY-MM-DD"),
                                                    service_id:
                                                        project.service_id._id,
                                                    skill_id:
                                                        project.skill_id.map(
                                                            (skill) => {
                                                                return skill._id;
                                                            }
                                                        ),
                                                });
                                                handleOpen();
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {isDashboard && (
                                        <button
                                            className="skill_modal_delete"
                                            onClick={() => {
                                                handleDelete(project._id);
                                                getall();
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal_form"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                    >
                        {isEdit ? "Edit Project" : "Add Project"}
                    </Typography>
                    <div className="modal_container">
                        <div className="modal_categories">
                            <img
                                src={formData.image || placeholder}
                                alt={"Project"}
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

                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "100%" },
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                            noValidate
                            autoComplete="off"
                            className="project_form"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                variant="standard"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                defaultValue={formData.title}
                            />
                            <TextField
                                id="outlined-basic"
                                multiline
                                rows={4}
                                label="Description"
                                variant="standard"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                defaultValue={formData.description}
                            />
                            <TextField
                                id="date"
                                label=" Date"
                                type="date"
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="date"
                                onChange={handleChange}
                                value={formData.date}
                                defaultValue={formData.date}
                                variant="standard"
                            />
                            <TextField
                                id="outlined-basic"
                                label="Demo URL"
                                variant="standard"
                                name="demoURL"
                                value={formData.demoURL}
                                onChange={handleChange}
                                defaultValue={formData.demoURL}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Github URL"
                                variant="standard"
                                name="githubURL"
                                value={formData.githubURL}
                                onChange={handleChange}
                                defaultValue={formData.githubURL}
                            />

                            <FormControl
                                variant="standard"
                                sx={{ minWidth: "100%" }}
                            >
                                <InputLabel id="demo-simple-select-standard-label">
                                    Services
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={formData.service_id}
                                    onChange={handleChange}
                                    label="Service"
                                    name="service_id"
                                    defaultValue={formData.service_id}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {services.map((service) => (
                                        <MenuItem
                                            key={service._id}
                                            value={service._id}
                                        >
                                            {service.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="demo-multiple-name-label">
                                    Skill
                                </InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    name="skill_id"
                                    multiple
                                    value={formData.skill_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Skill" />}
                                    MenuProps={MenuProps}
                                    defaultValue={formData.skill_id}
                                >
                                    {skills.map((skill) => (
                                        <MenuItem
                                            key={skill._id}
                                            value={skill._id}
                                        >
                                            {skill.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="categories_modal_submit">
                        <button onClick={isEdit ? handleEdit : handleAdd}>
                            Submit
                        </button>
                    </div>
                </Box>
            </Modal>
            {isDashboard && (
                <button
                    className="experience_add"
                    onClick={() => {
                        setIsEdit(false);
                        setFormData({
                            image: "",
                            title: "",
                            date: "",
                            githubURL: "",
                            description: "",
                            demoURL: "",
                            service_id: "",
                            skill_id: [],
                        });
                        handleOpen();
                    }}
                >
                    <AiFillPlusCircle />
                </button>
            )}
        </div>
    );
}
