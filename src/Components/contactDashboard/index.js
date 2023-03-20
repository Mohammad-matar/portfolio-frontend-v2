import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'; import { ImFacebook } from 'react-icons/im'
import { AiFillInstagram, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
import { useState } from 'react';
import { useAuth } from '../../auth';
import "./style.css"
import { Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Loading from '../Loading/index'
import Swal from 'sweetalert2';

export default function ContactDashboard({ isDashboard = false }) {
    const auth = useAuth()

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ ...data })
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setFormData(data)
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "#fff",
        border: "1px solid #fff",
        boxShadow: 24,
        p: 4,
        width: "70%",
        overflow: "auto",
        maxHeight: "100vh",
    };
    useEffect(() => {
        getall();
    }, []);
    const getall = () => {
        axios
            .get("https://matar-portfolio.onrender.com/contact")
            .then((res) => {
                setData(res.data.data[0]);
                console.log(res.data.data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleEdit = async () => {
        let error = null;

        let body = formData;
        console.log(formData)

        if (error !== null) {
            alert(error);
        } else {

            await Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
                customClass: {
                    container: 'my_swal',
                    denyButton: 'sweetalert_button_delete',
                    confirmButton: 'sweetalert_button_confirm',
                    cancelButton: 'sweetalert_button_cancel',
                    addingSuccess: "sweetalert_button_success"
                },
                buttonsStyling: false
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios
                        .put(`https://matar-portfolio.onrender.com/contact/${data._id}`, body, {
                            headers: {
                                Authorization: auth.authorizationToken(),
                            },
                        })
                        .then((res) => {
                            Swal.fire({
                                title: 'Saved Successfully',
                                icon: "success",
                                confirmButtonText: 'Ok',
                                customClass: {
                                    container: 'my_swal',
                                    confirmButton: 'sweetalert_button_confirm',
                                },
                                buttonsStyling: false
                            })
                            getall();
                            handleClose();
                        })
                        .catch((err) => {
                            alert("Editing Failed");
                            console.log(err)
                        });
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })

        }
    };
    if (isLoading) {
        return <Loading />;
    } else
        return (
            <section id='contact' className='Contact_Section'>
                <div className='contact_dash_info'>
                    <h1>Contact Page</h1>
                    <div className='contact_dashboard_info'>
                        <div className='contactinfo_icon'>
                            <a href={data.facebook}> <ImFacebook /> </a>
                            <a href={data.linkedin}>
                                <AiFillLinkedin />
                            </a>
                            <a href={data.twitter}> <AiOutlineTwitter /> </a>
                            <a href={data.instagram}> <AiFillInstagram /> </a>
                        </div>

                        <div className='personal_contact'>
                            <p>My personal contact</p>
                            <p>  {data.phone_number}</p>
                        </div>

                        <div>
                            <p className="email_Contact" >
                                Say hello, on email
                            </p>
                            <p> {data.email}</p>
                        </div>
                        {isDashboard && <button className='PersonalInfo_modal_add' onClick={handleOpen}> Edit</button>}

                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Edit Skill
                            </Typography>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        "& > :not(style)": { m: 1, width: "100%" },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Phone Number"
                                        variant="standard"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        defaultValue={formData.phone_number}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        variant="standard"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        defaultValue={formData.email}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Linkedin"
                                        variant="standard"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        defaultValue={formData.linkedin}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Github"
                                        variant="standard"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        defaultValue={formData.github}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Instagram"
                                        variant="standard"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        defaultValue={formData.instagram}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Twiiter"
                                        variant="standard"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                        defaultValue={formData.twitter}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Facebook"
                                        variant="standard"
                                        name="facebook"
                                        value={formData.facebook}
                                        onChange={handleChange}
                                        defaultValue={formData.facebook}
                                    />
                                </Box>
                            </div>
                            <div className='categories_modal_submit'>
                                <button
                                    onClick={handleEdit}
                                >
                                    Submit
                                </button>
                            </div>
                        </Box>
                    </Modal>

                </div>
            </section>
        )

}
