import { Box, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from "../../auth";
import { AiFillDelete, AiFillPlusCircle, AiOutlineEdit } from 'react-icons/ai'
import placeholder from '../../images/placeholder.webp'
import Swal from 'sweetalert2'


import "./style.css"
import Loading from '../Loading';

export default function Services({ isDashboard = false }) {
    const auth = useAuth()

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getall();
    }, []);

    const [formData, setFormData] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)


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

    const getall = () => {
        axios
            .get("https://matar-portfolio.onrender.com/services")
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    /////////////////
    const handleFileSelect = async (e) => {
        const fileData = new FormData();
        fileData.append("file", e.target.files[0]);

        // let form
        await axios
            .post("https://matar-portfolio.onrender.com/upload", fileData)
            .then((res) => {
                setFormData({ ...formData, icon: res.data.image })
            })
            .catch((err) => console.log(err));

    };

    const handleEdit = async () => {
        let error = null;

        let body = formData;

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
                        .put(`https://matar-portfolio.onrender.com/services/${formData._id}`, body, {
                            headers: {
                                Authorization: auth.authorizationToken(),
                            },
                        })
                        .then((res) => {
                            getall();
                            handleClose();
                        })
                        .catch((err) => {
                            alert("Editing Failed");
                            console.log(err)
                        });
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
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })

        }
    };
    const handleAdd = async () => {
        let error = null;

        let body = formData;
        if (!body.icon) {
            error = "Icon is required";
        }
        if (!body.title) {
            error = "Title is required";
        }
        if (!body.description) {
            error = "Description is required";
        }
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
                        .post(`https://matar-portfolio.onrender.com/services`, body, {
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
                            alert("Adding Failed");
                        });
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })

        }
    }
    //delete
    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'sweetalert_button_delete',
                cancelButton: 'sweetalert_button_cancel'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://matar-portfolio.onrender.com/services/${id}`)
                    .then((res) => {
                        console.log(res)
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getall();
                    })
                    .catch((err) => {
                        console.log("AAAA", err)
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })


    }
    return (
        <div className='services_container'>

            <div className='common_title'>
                Services
            </div>
            <div className='services_types'>
                {isLoading ? <Loading /> : data.map((service) => {
                    return (
                        <div className='Design'>
                            <div className='design_service_image'>
                                <img src={service.icon} alt="design" />
                            </div>
                            <p className='title_design'>{service.title}</p>
                            <p className='text_design' >{service.description}</p>
                            <div className='services__button'>
                                {isDashboard && <button className='serice_modal_edit' onClick={() => {
                                    setIsEdit(true)
                                    setFormData(service)
                                    getall()
                                    handleOpen()
                                }}>
                                    <AiOutlineEdit /></button>}
                                {isDashboard && <button className='serice_modal_delete' onClick={() => {
                                    handleDelete(service._id);
                                    getall();
                                }}>
                                    <AiFillDelete /></button>}
                            </div>

                        </div>

                    )
                })}
                <div className='services'>
                    {isDashboard && <button className='serice_modal_add' onClick={() => {
                        //add
                        setIsEdit(false)
                        setFormData({ title: "", description: "", icon: "" })
                        handleOpen()
                    }}>
                        <AiFillPlusCircle /></button>}
                </div>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {/* ternary operator */}
                        {isEdit ? "Edit Service" : "Add Service"}
                    </Typography>
                    <div className='modal_container'>
                        <div className='modal_categories'>
                            <img src={formData.icon || placeholder} alt={"Service"} />
                            {/* upload image */}
                            <input
                                type="file"
                                id="image"
                                hidden
                                onChange={handleFileSelect}
                            />
                            <label for="image">
                                Upload
                            </label>
                        </div>

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
                                    label="Title*"
                                    variant="standard"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    defaultValue={formData.title}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Description"
                                    variant="standard"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    defaultValue={formData.description}
                                />

                            </Box>
                        </div>
                    </div>
                    <div className='categories_modal_submit'>
                        <button
                            // onClick={handleEdit}
                            onClick={isEdit ? handleEdit : handleAdd}

                        >
                            Submit
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
