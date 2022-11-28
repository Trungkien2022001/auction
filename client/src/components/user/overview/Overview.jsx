import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import './Overview.scss'
import { get } from '../../../utils/customRequest'
const api_endpoint = process.env.REACT_APP_API_ENDPOINT
export const Overview = ({currentUser}) => {
  useEffect(()=>{
    async function getData(){
      const result =await get(`${api_endpoint}/user/${currentUser.id}`, currentUser)
      console.log(result)
    }
    getData()
  }, [currentUser])
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
          <div className='overview-part'>
            <div className='overview-item'>
              <div className='overview-item__title'>Họ tên</div>
              <div className='overview-item__content'>Nguyễn Trung Kiên</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Ngày sinh</div>
              <div className='overview-item__content'>20-2-2001</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>SĐT</div>
              <div className='overview-item__content'>0989983025</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Username</div>
              <div className='overview-item__content'>trungkien2022001</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Email</div>
              <div className='overview-item__content'>Trungkien07yd@gmail.com</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Trạng thái</div>
              <div className='overview-item__content'>Đã xác thực</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Hoạt động</div>
              <div className='overview-item__content'>Bị khóa</div>
            </div>
            <div className='overview-user-address overview-item'>
                <div className='overview-item__title'>Địa chỉ</div>
                <div className='overview-item__content'>Số nhà 10q30b Ngõ 136 Nguyễn An Ninh, Hoàng Mai, Hà Nội</div>
            </div>
          </div>
          <div className='overview-btn'>
              <Button variant="contained">Chỉnh sửa thông tin</Button>
          </div>

        </div>
        <div className='overview-chart'>
          <div className='title-header'>
            <b></b>
            <h3>Thông tin giao dịch</h3>
            <b></b>
          </div>
          <div className='overview-part'>
            <div className='overview-item'>
              <div className='overview-item__title'>Số phiên</div>
              <div className='overview-item__content'>3</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Số lần đấu giá</div>
              <div className='overview-item__content'>15</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Thắng cược</div>
              <div className='overview-item__content'>3</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Thành công</div>
              <div className='overview-item__content'>3</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Đã bán</div>
              <div className='overview-item__content'>15</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Thành công</div>
              <div className='overview-item__content'>1</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Đã giao hàng</div>
              <div className='overview-item__content'>3</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Thất bại</div>
              <div className='overview-item__content'>0</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Số dư</div>
              <div className='overview-item__content'>15</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Lợi nhuận</div>
              <div className='overview-item__content'>1</div>
            </div>
            <div className='overview-item'>
              <div className='overview-item__title'>Đã chi</div>
              <div className='overview-item__content'>0</div>
            </div>
          </div>
          <div className='overview-notif'>
            <div className='overview-notif-content overview-notif-safe'>Tài khoản của bạn chưa có độ uy tín cao. Đừng có những hành vi gian lận nếu bạn k muốn tài khoản bị khóa vĩnh viễn</div>
          </div>
        </div>
      </div>
    </div>
  )
}

