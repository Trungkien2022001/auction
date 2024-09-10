import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './SystemConfig.scss'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { get, post } from '../../../utils/customRequest';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { checkApiResponse } from '../../../utils/checkApiResponse';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import moment from 'moment'
import Swal from 'sweetalert2';

export const SystemConfig = ({ socket }) => {
    const currentUser = useSelector(state => state.user)
    const [imageList, setImageList] = useState([])
    const [field, setField] = useState({})
    const [listVersion, setListVersion] = useState([])
    const inputRef = useRef()

    if (!currentUser.role.dashboard_config) {
        window.location.href = `/management/dashboard`
    }
    async function getData() {
        const result = await get(`/system/all`, currentUser)
        if (checkApiResponse(result)) {
            setListVersion(result.data.body)
            setField(result.data.body[0])
            setImageList(result.data.body[0].banner_image)
        }
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeVersion = (value) => {
        const selectedVersion = listVersion.find(i => i.system_version === value)
        setField(selectedVersion)
        setImageList(selectedVersion.banner_image)
    }

    const handleAddImage = async () => {
        const files = inputRef.current.files
        try {
            await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    const resizedFile = await resizeImage(file, 1500, 250);
                    data.append("file", resizedFile);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/nguyenkien2022001/image/upload",
                        data
                    );
                    const { url } = uploadRes.data;
                    setImageList(prev => [...prev, url])
                })
            );
        } catch (err) {
        }
    }

    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve) => {
            const image = new Image();
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            image.onload = () => {
                let width = image.width;
                let height = image.height;

                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }

                    if (height > maxHeight) {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(image, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, { type: file.type }));
                }, file.type);
            };

            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        let version
        if (!listVersion.find(i=>i.system_version === field.system_version)) {
            version = field.system_version
        } else {
            const splitVersion = listVersion[0].system_version.split('.')
            version = `${splitVersion[0]}.${splitVersion[1]}.${parseInt(splitVersion[2]) + 1}`
        }
        const toInsert = {
            ...field,
            banner_image: imageList,
            system_version: version,
            created_at: moment().format(),
            created_by: `${currentUser.id}~~${currentUser.name}`
        }
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc chắn muốn cập nhật lên version ' + toInsert.system_version + '?',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const r = await post(`/system/update`, toInsert, currentUser)
                if (r.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cấp nhật version mới thành công',
                        showConfirmButton: true,
                        timer: 10000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đã xảy ra lỗi',
                        text: r.data.message,
                        showConfirmButton: true,
                    })
                }

            }
        });
    }


    const handleRemoveImage = (item) => {
        setImageList(imageList.filter(i => i !== item))
    }


    return (
        <div className='system-config-container'>
            <div className="wrapper">

                <div className="version system-config-item" style={{ width: "150px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Version</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Chủ đề"
                            onChange={(e) => handleChangeVersion(e.target.value)}
                        >
                            {listVersion.map((item, index) =>
                                <MenuItem key={index} value={item.system_version}>{item.system_version}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        App Name
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.app_name} onChange={e => setField({ ...field, app_name: e.target.value })} id="standard-basic" variant="standard" />
                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Version
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.system_version} onChange={e => setField({ ...field, system_version: e.target.value })} id="standard-basic" variant="standard" />
                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Created At
                    </div>
                    <div className="system-config-input">
                        <TextField disabled style={{ width: "500px" }} value={moment(field.created_at).format('DD/MM/YYYY HH:mm:ss')} id="standard-basic" variant="standard" />
                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Slogan
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.slogan} onChange={e => setField({ ...field, slogan: e.target.value })} id="standard-basic" variant="standard" />
                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Company Address
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.company_address} onChange={e => setField({ ...field, company_address: e.target.value })} id="standard-basic" variant="standard" />
                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Company Email
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.company_email} onChange={e => setField({ ...field, email: e.target.value })} id="standard-basic" variant="standard" />
                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Company Fax
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.company_fax} onChange={e => setField({ ...field, fax: e.target.value })} id="standard-basic" variant="standard" />

                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Company Phone
                    </div>
                    <div className="system-config-input">
                        <TextField style={{ width: "500px" }} value={field.company_phone} onChange={e => setField({ ...field, phone: e.target.value })} id="standard-basic" variant="standard" />

                    </div>
                </div>
                <div className="version system-config-item">
                    <div className="system-config-title">
                        Banner Image
                    </div>
                    <div className="system-config-input">
                        <div className="new-product-image">
                            <div className="new-product-image-review">
                                {imageList.length ?
                                    <>
                                        {
                                            imageList.map((item, index) => (
                                                <div className="imageItem" key={index}>
                                                    <img src={item} alt="" />
                                                    <div onClick={() => handleRemoveImage(item)} className="remove_small_image">
                                                        <ClearIcon />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </> : <></>}
                                <div className="addImage">
                                    <AddAPhotoIcon />
                                    <input
                                        type="file"
                                        id="file"
                                        multiple
                                        onChange={() => handleAddImage()}
                                        ref={inputRef}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="version system-config-item">
                    <Button variant="contained" onClick={() => handleSubmit()}>update version</Button>
                </div>
            </div>
        </div>
    )
}
