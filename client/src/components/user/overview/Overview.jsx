import React from 'react'
import './Overview.scss'
export const Overview = () => {
  return (
    <div className='dashboard-container'>
      {/* <div className='overview-header'>Tổng quan</div> */}
      <div className='overview-container'>
        <div className='overview-user'>
          <div className='overview-header'>
            Thông tin cá nhân
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

        </div>
        <div className='overview-chart'>
g
        </div>
      </div>
    </div>
  )
}

