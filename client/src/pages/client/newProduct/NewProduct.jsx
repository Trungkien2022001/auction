/* eslint-disable no-mixed-operators */
import './NewProduct.scss'
import { useRef, useState } from 'react'
import { Header } from '../../../components/header/Header'
import axios from 'axios'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { get, post } from '../../../utils/customRequest'
import { newAuctionValidate } from '../../../utils/validateFormInput'
import Swal from 'sweetalert2'
import moment from 'moment'


export const NewProduct = ({ socket }) => {

    const currentUser = useSelector((state) => state.user);
    const inputRef = useRef()

    const [productCategory, setProductCategory] = useState([])
    const [auctionTime, setAuctionTime] = useState([])
    const [imageList, setImageList] = useState([])
    const [product, setProduct] = useState({
        name: '',
        branch: '',
        status: '',
        title: '',
        description: '',
        key_word: '',
        category_id: 1,
        start_price: 5000,
    })
    const [auction, setAuction] = useState({
        start_time: null,
        auction_time: 13,
        is_returned: 0,
        is_finished_soon: 0

    })
    useEffect(() => {
        async function getData() {
            const result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-helper`, currentUser)
            if (result.status === 200) {
                setAuctionTime(result.data.auction_time)
                setProductCategory(result.data.product_category)
            }
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async () => {
        let validate = newAuctionValidate({ ...product, ...auction })
        if (validate.err) {
            Swal.fire(
                'Có lỗi khi tạo buổi đấu giá mới?',
                validate.message,
                'error'
            )
            return
        }

        let result = await post(`${process.env.REACT_APP_API_ENDPOINT}/new-auction`, {
            auction,
            product: { ...product, images: imageList }
        }, currentUser)
        if (result.data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Tạo phiên đấu giá mới thành công',
                showConfirmButton: true,
                timer: 10000
            }).then(() => {
                window.location.href = './';
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Đã xảy ra lỗi',
                text: result.data.message,
                showConfirmButton: true,
            })
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

    const handleAddImage = async () => {
        const files = inputRef.current.files
        try {
            await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    const resizedFile = await resizeImage(file, 800, 600);
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

    const handleRemoveImage = (item) => {
        setImageList(imageList.filter(i => i !== item))
    }
    return (
        <div>
            <Header socket={socket} />
            <div className="new-container">
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
                            onChange={e => setProduct({ ...product, name: e.target.value })}
                        />
                    </div>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="standard-basic"
                            label="Thương hiệu"
                            variant="outlined"
                            placeholder='Không bắt buộc'
                            onChange={e => setProduct({ ...product, branch: e.target.value })}
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
                            helperText="VD: Còn mới 90%, đã hỏng..."
                            onChange={e => setProduct({ ...product, status: e.target.value })}
                        />
                    </div>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="outlined-select-currency"
                            select
                            label="Danh mục sản phẩm"
                            value={product.category_id}
                            onChange={e => setProduct({ ...product, category_id: e.target.value })}
                        >
                            {
                                productCategory && productCategory.length && productCategory.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                )) || <></>

                            }
                        </TextField>
                    </div>
                </div>

                <div className='new-product-part'>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="standard-basic"
                            label="Giá khởi điểm"
                            variant="outlined"
                            type='number'
                            value={product.start_price}
                            helperText='Nhỏ nhất 5000đ'
                            onChange={e => setProduct({ ...product, start_price: e.target.value })}
                        />
                    </div>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="standard-basic"
                            label="Keyword"
                            variant="outlined"
                            placeholder=''
                            helperText='Các keyword giúp người dùng dễ tìm kiếm'
                            onChange={e => setProduct({ ...product, key_word: e.target.value })}
                        />
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
                            onChange={e => setAuction({ ...auction, start_time: moment(e.target.value).format('YYYY-MM-DD HH:mm:ss') })}

                        />
                    </div>
                    <div className='new-product-item'>
                        <TextField
                            className='text-input text-input-90'
                            id="outlined-select-currency"
                            select
                            label="Thời gian phiên đấu giá"
                            value={auction.auction_time}
                            onChange={e => setAuction({ ...auction, auction_time: e.target.value })}
                        // onKeyDown={onEnterWork}
                        >
                            {
                                auctionTime && auctionTime.length && auctionTime.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                                )) || <></>

                            }
                        </TextField>
                    </div>
                </div>

                <div className='new-product-part' style={{ height: '110px' }}>
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
                            onChange={e => setProduct({ ...product, title: e.target.value })}
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
                            onChange={e => setProduct({ ...product, description: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <FormControlLabel
                        control={<Switch defaultChecked={false} />}
                        label="Hoàn trả"
                        onChange={e => setAuction({ ...auction, is_returned: e.target.checked ? 1 : 0 })}
                    />
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
                    <Button onClick={() => handleSubmit()} variant="contained">Submit</Button>
                </div>
            </div>
        </div>
    )
}
