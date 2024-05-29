import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import './Overview.scss'
import axios from "axios";
import { get } from '../../../utils/customRequest'
import moment from 'moment'
import { checkApiResponse } from '../../../utils/checkApiResponse'
import Swal from 'sweetalert2'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import { authenticate } from '../../../utils/authenticate'
import config from '../../../config';
import { updateUserInfoValidate } from '../../../utils/validateFormInput';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../../redux/userSlice';
export const Overview = ({ currentUser, id }) => {

  const [data, setData] = useState({})
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [imageList, setImageList] = useState([])
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");


  const inputRef = useRef()
  const dispatch = useDispatch()

  const handleCloseAuctionDialog = () => {
    setOpenAuctionDialog(false);
  };

  const handleClickOpenAuctionDialog = () => {
    setOpenAuctionDialog(true);
  };

  const handleSubmitAuction = async () => {
    setOpenAuctionDialog(false)
    if (authenticate(currentUser)) {
      return
    }
    const newInfo = {
      email: currentUser.email
    }
    if(name !== data.name){
      newInfo.name = name
    }
    if(phone !== data.phone){
      newInfo.phone = phone
    }
    if(birthday !== data.birthday){
      newInfo.birthday = birthday
    }
    if(imageList[0]  !== data.avatar){
      newInfo.avatar = imageList[0]
    }
    if(address !== data.address){
      newInfo.address = address
    }
    if(password && rePassword){
      newInfo.password = password
      newInfo.rePassword = rePassword
    }
    const validate = updateUserInfoValidate(newInfo)
    if (validate.err) {
      Swal.fire(
        'Có lỗi khi đăng ký?',
        validate.message,
        'error'
      )
      return
    }
    delete newInfo.rePassword
    axios
      .put(`${config.apiHost}/user/${data.id}`, newInfo, {
        headers: {
          'ngrok-skip-browser-warning': 69420,
          'x-key': currentUser.email,
          'x-access-token': currentUser.token,
          'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
      })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Update Info Successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(res => {
            axios
              .post(`${config.apiHost}/login`, {
                email: data.email,
                password: password || '123456',
              })
              .then((resLogin) => {
                if (resLogin.data.success) {
                  dispatch(userSlice.actions.login(resLogin.data.data.user))
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: "Có lỗi xảy ra",
                    showConfirmButton: true,
                  })
                }
              });
        })
        } else {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            showConfirmButton: true,
          })
        }
      });
  };

  const handleAddImage = async () => {
    const files = inputRef.current.files
    try {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/trungkien2022001/image/upload",
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

  useEffect(() => {
    async function getData() {
      // let result = await get(`/user/${id}`, currentUser)
      let result = await get(`/me`, currentUser)
      if (checkApiResponse(result)) {
        const data = result.data.data
        setData(data)
        setName(data.name)
        setPhone(data.phone)
        setBirthday(data.birthday)
        setAddress(data.address)
        setImageList([data.avatar])
      }
    }
    getData()
  }, [currentUser, id])
  return (
    <div className='dashboard-container'>
      {/* <div className='overview-header'>Tổng quan</div> */}
      <div className='overview-container'>
        <div className='overview-user'>
          <div className='title-header'>
            <b></b>
            <h3>Thông tin cá nhân</h3>
            <b></b>
          </div>
          {JSON.stringify(data) !== '{}' ?
            <div className='overview-part'>
              <div className='overview-item'>
                <div className='overview-item__title'>Họ tên</div>
                <div className='overview-item__content'>{data.name}</div>
              </div>
              <div className='overview-item'>
                <div className='overview-item__title'>Ngày sinh</div>
                <div className='overview-item__content'>{moment(data.birthday).format('DD/MM/YYYY')}</div>
              </div>
              <div className='overview-item'>
                <div className='overview-item__title'>SĐT</div>
                <div className='overview-item__content'>{data.phone}</div>
              </div>
              <div className='overview-item'>
                <div className='overview-item__title'>Username</div>
                <div className='overview-item__content'>{data.username}</div>
              </div>
              <div className='overview-item'>
                <div className='overview-item__title'>Email</div>
                <div className='overview-item__content'>{data.email}</div>
              </div>
              <div className='overview-item'>
                <div className='overview-item__title'>Trạng thái</div>
                <div className='overview-item__content'>{data.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}</div>
              </div>
              <div className='overview-item'>
                <div className='overview-item__title'>Hoạt động</div>
                <div className='overview-item__content'>{!data.is_blocked ? 'Bị khóa' : 'Hoạt động'}</div>
              </div>
              <div className='overview-user-address overview-item'>
                <div className='overview-item__title'>Địa chỉ</div>
                <div className='overview-item__content'>{data.address}</div>
              </div>
            </div>
            : <></>
          }

          <div className='overview-btn'>
            <Button onClick={() => handleClickOpenAuctionDialog()} variant="contained">Chỉnh sửa thông tin</Button>
          </div>

        </div>
        <div className='overview-chart'>
          <div className='title-header'>
            <b></b>
            <h3>Thông tin giao dịch</h3>
            <b></b>
          </div>
          {JSON.stringify(data) !== '{}' ?
            <>
              <div className='overview-part'>
                <div className='overview-item'>
                  <div className='overview-item__title'>Số phiên</div>
                  <div className='overview-item__content'>{data.total_auction || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Số lần đấu giá</div>
                  <div className='overview-item__content'>{data.total_auction_raise || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thắng cược</div>
                  <div className='overview-item__content'>{data.total_win || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thành công</div>
                  <div className='overview-item__content'>{data.total_win_success || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Đã bán</div>
                  <div className='overview-item__content'>{data.total_sell || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thành công</div>
                  <div className='overview-item__content'>{data.total_sell_success || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Đã giao hàng</div>
                  <div className='overview-item__content'>{data.total_sell_success || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thất bại</div>
                  <div className='overview-item__content'>{data.total_sell_failed || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Số dư</div>
                  <div className='overview-item__content'>{data.amount || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Lợi nhuận</div>
                  <div className='overview-item__content'>{data.total_sell_amount || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Đã chi</div>
                  <div className='overview-item__content'>{data.total_buy_amount || 0}</div>
                </div>
              </div>
              {data.prestige === 2 ?
                <div className='overview-notif'>
                  <div className='overview-notif-content overview-notif-safe'>Tài khoản của bạn có độ uy tín cao. Cố gắng có những hành vi tích cực để có phần thưởng</div>
                </div>
                :
                <div className='overview-notif'>
                  <div className='overview-notif-content overview-notif-danger'>Tài khoản của bạn chưa có độ uy tín cao. Đừng có những hành vi gian lận nếu bạn k muốn tài khoản bị khóa vĩnh viễn</div>
                </div>
              }
            </>
            : <></>
          }
        </div>
      </div>
      <Dialog open={openAuctionDialog} onClose={handleCloseAuctionDialog}>
        <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chỉnh sửa thông tin cá nhân của bạn. Nhưng thông tin này là cơ sở để người mua có thể liên lạc và có thể thấy độ uy tín của bạn
          </DialogContentText>
          <div className="update-info-container" style={{ marginTop: "25px" }}>

            <div className="update-info">
              <div className="item">
                <TextField
                  className='text-input text-input-90'
                  id="standard-basic"
                  label="Họ và tên"
                  variant="outlined"
                  helperText=""
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="item">
                <TextField
                  className='text-input text-input-90'
                  id="standard-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div className="item">
                <TextField
                  className='text-input text-input-90'
                  id="standard-basic"
                  label="Mật khẩu"
                  variant="outlined"
                  helperText=""
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="item">
                <div className='register-product-item'>
                  <TextField
                    className='text-input text-input-90'
                    id="standard-basic"
                    label="Nhập lại mật khẩu"
                    variant="outlined"
                    onChange={e => setrePassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="item">
                <TextField
                  className='text-input text-input-40'
                  id="datetime-local"
                  label="Ngày sinh"
                  type="date"
                  value={birthday}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => setBirthday(e.target.value)}
                />
              </div>
              <div className="item">
                <TextField
                  className='text-input text-input-95'
                  id="standard-basic"
                  multiline
                  maxRows={3}
                  label="Địa chỉ"
                  variant="outlined"
                  placeholder='Địa chỉ hiện nay của bạn'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>

              <div className="register-product-image">
                <div className="register-product-image-header">
                  Thêm ảnh đại diện
                </div>
                <div className="register-product-image-review">
                  {imageList.length ?
                    <>

                      <div className="imageItem" >
                        <img src={imageList[0]} alt="" />
                        <div onClick={() => handleRemoveImage(imageList[0])} className="remove_small_image">
                          <ClearIcon />
                        </div>
                      </div>

                    </> :
                    <div className="addImage">
                      <AddAPhotoIcon />
                      <input
                        type="file"
                        id="file"
                        multiple
                        onChange={() => handleAddImage()}
                        ref={inputRef}
                      />
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAuctionDialog}>Hủy</Button>
          <Button onClick={handleSubmitAuction} >Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

