import './NewProduct.scss'
import { useRef, useState } from 'react'
import { Header } from '../../../components/header/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, FormControlLabel, InputAdornment, MenuItem, Select, Switch, TextField } from '@mui/material'

export const NewProduct = () => {
    const inputRef = useRef()
    const [imageList, setImageList] = useState([])
    const [type, setType] = useState(1)
    const [name, setName] = useState(1)
    const [branch, setBranch] = useState(1)
    const [status, setStatus] = useState(1)
    const [startTime, setStartTime] = useState(1)
    const [totalTime, setTotalTime] = useState(1)
    const [detail, setDetail] = useState(1)
    const [description, setDescription] = useState(1)
    const [isReturn, setisReturn] = useState(1)

    const handleSubmit = async () => {

    }

    const handleAddImage = async () => {
        const files = inputRef.current.files
        try {
            await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
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

    const handleRemoveImage = (item) => {
        setImageList(imageList.filter(i => i !== item))
    }




    return (
        <div>
            <Header />
            <div className="new-container">
                <div className="new-container-back">
                    <Link to={'../'} style={{ color: "black" }}>Quay lại trang chủ</Link>
                </div>
                <div className="new-container-header">
                    Thêm một phiên đấu giá mới
                </div>
                <div className='new-product-part'>
                    <div className='new-product-item'>
                        <TextField 
                            className='text-input text-input-90' 
                            id="standard-basic" 
                            label="Tên sản phẩm" 
                            variant="outlined" 
                            helperText="Vui lòng nhập tên sản phẩm"
                        />
                    </div>
                    <div className='new-product-item'>
                        <TextField 
                            className='text-input text-input-90' 
                            id="standard-basic" 
                            label="Thương hiệu" 
                            variant="outlined"
                            placeholder='Không bắt buộc'
                        />
                    </div>
                </div>
                <div className='new-product-part'>
                    <div className='new-product-item'>
                        <TextField  
                            className='text-input text-input-90' 
                            id="standard-basic" 
                            label="Tình trạng sản phẩm" 
                            variant="outlined" 
                        />
                    </div>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="outlined-select-currency"
                            select
                            label="Danh mục sản phẩm"
                            value={type}
                            onChange={e => setType(e.target.value)}
                        // onKeyDown={onEnterWork}
                        >
                            <MenuItem key={1} value={1}>Noun</MenuItem>
                            <MenuItem key={2} value={2}>Verb</MenuItem>
                            <MenuItem key={3} value={3}>Adjective</MenuItem>
                            <MenuItem key={4} value={4}>Pronoun</MenuItem>
                            <MenuItem key={5} value={5}>Adverb</MenuItem>
                            <MenuItem key={6} value={6}>Determine</MenuItem>
                            <MenuItem key={7} value={7}>Proposition</MenuItem>
                            <MenuItem key={8} value={8}>Conjunction</MenuItem>
                            <MenuItem key={9} value={9}>Interjection</MenuItem>
                            <MenuItem key={10} value={10}>Phrasal Verb</MenuItem>
                        </TextField>
                    </div>
                </div>

                <div className='new-product-part'>
                    <div className='new-product-item'>
                    <TextField
                             className='text-input text-input-90'
                            id="datetime-local"
                            label="Thời gian bắt đầu"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />                    
                    </div>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="outlined-select-currency"
                            select
                            label="Thời gian phiên đấu giá"
                            value={type}
                            onChange={e => setType(e.target.value)}
                        // onKeyDown={onEnterWork}
                        >
                            <MenuItem key={1} value={1}>Noun</MenuItem>
                            <MenuItem key={2} value={2}>Verb</MenuItem>
                            <MenuItem key={3} value={3}>Adjective</MenuItem>
                            <MenuItem key={4} value={4}>Pronoun</MenuItem>
                            <MenuItem key={5} value={5}>Adverb</MenuItem>
                            <MenuItem key={6} value={6}>Determine</MenuItem>
                            <MenuItem key={7} value={7}>Proposition</MenuItem>
                            <MenuItem key={8} value={8}>Conjunction</MenuItem>
                            <MenuItem key={9} value={9}>Interjection</MenuItem>
                            <MenuItem key={10} value={10}>Phrasal Verb</MenuItem>
                        </TextField>
                    </div>
                </div>
                
                <div className='new-product-part' style={{height: '110px'}}>
                    <div className='new-product-item'>
                    <TextField
                            className='text-input text-input-95'
                            id="standard-basic"
                            multiline
                            maxRows={2}
                            label="Mô tả"
                            variant="outlined"
                            placeholder='Mô tả ngắn gọn về sản phẩm'
                            helperText='Mô tả một cách ngắn gọn về sản phẩm để có cái nhìn tổng quan về sản phẩm'
                        />
                    </div>
                </div>
                
                <div className='new-product-part'>
                    <div className='new-product-item'>
                    <TextField
                            className='text-input text-input-95'
                            id="standard-basic"
                            multiline
                            maxRows={3}
                            label="Mô tả chi tiết"
                            variant="outlined"
                            placeholder='Mô tả chi tiết về sản phẩm'
                        />
                    </div>
                </div>

                <div>
                    <FormControlLabel control={<Switch defaultChecked />} label="Hoàn trả" />
                </div>
                <div className="new-product-image">
                    <div className="new-product-image-header">
                        Thêm ảnh về sản phẩm
                    </div>
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

                <div className="submit">
                    <Button variant="contained">Submit</Button>
                </div>
            </div>
        </div>
    )
}
