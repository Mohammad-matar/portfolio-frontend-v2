import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import { useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import { useAuth } from "../../auth";
import placeholder from "../../images/placeholder.webp";
import Swal from "sweetalert2";
import "./style.css";
import Loading from "../Loading";
import ReactMarkdown from "react-markdown";

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

export default function Experience({ isDashboard = false }) {
    const auth = useAuth();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [allSkills, setAllSkills] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // setFormData(data)
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "1px solid #fff",
        boxShadow: 24,
        width: "70%",
        overflow: "auto",
        maxHeight: "100vh",
        p: 4,
    };

    useEffect(() => {
        getall();
        getAllSkills();
    }, []);

    const getall = async () => {
        await axios
            .get("https://matar-portfolio.onrender.com/experience")
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

    const handleOnChange = (e) => {
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
                setFormData({ ...formData, companyLogo: res.data.image });
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
                            `https://matar-portfolio.onrender.com/experience/${formData._id}`,
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

        if (!body.companyLogo) {
            error = "Image is required";
        }
        if (!body.title) {
            error = "Title is required";
        }
        if (!body.company) {
            error = "Company is required";
        }
        if (!body.location) {
            error = "Location is required";
        }
        if (!body.description) {
            error = "Description is required";
        }
        if (!body.startDate) {
            error = "Start Date is required";
        }
        if (!body.endDate) {
            error = "End Date is required";
        }
        if (!body.skill_id) {
            error = "Skill Select is required";
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
                            `https://matar-portfolio.onrender.com/experience`,
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
                    Swal.fire("Changes are not saved", "", "info");
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
                            `https://matar-portfolio.onrender.com/experience/${id}`
                        )
                        .then((res) => {
                            console.log(res);
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                            getall();
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
        <section id="experience" className="experience_section">
            <div className="experience_title">
                <h2>Experience</h2>
            </div>

            <div className="experience__container__dashboard">
                <div className="experience__Card">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        data.map((experience) => {
                            return (
                                <div className="experience_Cards">
                                    <img
                                        src={experience.companyLogo}
                                        alt="img"
                                        className="icon_experience_img"
                                    />
                                    <div className="experience_main_div">
                                        <div className="experience_demo">
                                            <div className="experience_title_date">
                                                <div className="demo_container">
                                                    <h3>{experience.title}</h3>
                                                    <p className="Location">
                                                        {experience.company} -{" "}
                                                        {experience.location}
                                                    </p>
                                                </div>
                                                <p className="demo_date">
                                                    {moment(
                                                        experience.startDate
                                                    ).format("MMM  YYYY")}{" "}
                                                    -{" "}
                                                    {moment(
                                                        experience.endDate
                                                    ).format("MMM YYYY")}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <ReactMarkdown>
                                                {experience.description}
                                            </ReactMarkdown>
                                        </div>
                                        {/* Experience */}
                                        <div className="demo_skills_section">
                                            <p>
                                                <span>
                                                    <b>Skills</b> :{" "}
                                                    {experience.skill_id
                                                        .map((skill) => {
                                                            return skill.title;
                                                        })
                                                        .join(", ")}{" "}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="experience__button">
                                            {isDashboard && (
                                                <button
                                                    className="experience_modal_edit"
                                                    onClick={() => {
                                                        setIsEdit(true);
                                                        setFormData({
                                                            ...experience,
                                                            startDate: moment(
                                                                experience.startDate
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            ),
                                                            endDate: moment(
                                                                experience.endDate
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            ),
                                                            skill_id:
                                                                experience.skill_id.map(
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
                                                    className="experience_modal_delete"
                                                    onClick={() => {
                                                        handleDelete(
                                                            experience._id
                                                        );
                                                        getall();
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div className="experience_modal_addbtn">
                        {isDashboard && (
                            <button
                                className="experience_add"
                                onClick={() => {
                                    setIsEdit(false);
                                    setFormData({
                                        companyLogo: "",
                                        title: "",
                                        company: "",
                                        location: "",
                                        description: "",
                                        startDate: "",
                                        endDate: "",
                                        skill_id: [],
                                    });
                                    handleOpen();
                                }}
                            >
                                <AiFillPlusCircle />
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
                                {isEdit ? "Edit Experience" : "Add Experience"}
                            </Typography>
                            <div className="modal_container">
                                <div className="modal_categories">
                                    <img
                                        src={
                                            formData.companyLogo || placeholder
                                        }
                                        alt={"Experience"}
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
                                            label="Title"
                                            variant="standard"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleOnChange}
                                            defaultValue={formData.title}
                                        />
                                        <TextField
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="startDate"
                                            onChange={handleOnChange}
                                            value={formData.startDate}
                                            defaultValue={formData.startDate}
                                            variant="standard"
                                        />
                                        <TextField
                                            id="date"
                                            label="End Date"
                                            type="date"
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="endDate"
                                            onChange={handleOnChange}
                                            value={formData.endDate}
                                            defaultValue={formData.endDate}
                                            variant="standard"
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Company"
                                            variant="standard"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleOnChange}
                                            defaultValue={formData.company}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Location"
                                            variant="standard"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleOnChange}
                                            defaultValue={formData.location}
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label="Description"
                                            variant="standard"
                                            name="description"
                                            multiline
                                            rows={4}
                                            value={formData.description}
                                            onChange={handleOnChange}
                                            defaultValue={formData.description}
                                        />
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel id="demo-multiple-name-label">
                                                Skill
                                            </InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                name="skill_id"
                                                multiple
                                                value={formData.skill_id}
                                                onChange={handleOnChange}
                                                input={
                                                    <OutlinedInput label="Skill" />
                                                }
                                                MenuProps={MenuProps}
                                                defaultValue={formData.skill_id}
                                            >
                                                {allSkills.map((skill) => (
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
                            </div>
                            <div className="categories_modal_submit">
                                <button
                                    onClick={isEdit ? handleEdit : handleAdd}
                                >
                                    Submit
                                </button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </section>
    );
}
