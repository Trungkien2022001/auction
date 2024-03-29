import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import './Overview.scss'
import { get } from '../../../utils/customRequest'
import moment from 'moment'
import { checkApiResponse } from '../../../utils/checkApiResponse'
export const Overview = ({ currentUser, id }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    async function getData() {
      let result = await get(`/user/${id}`, currentUser)
      if (checkApiResponse(result)) {
        setData(result.data.data)
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
                <div className='overview-item__content'>{data.is_blocked ? 'Bị khóa' : 'Hoạt động'}</div>
              </div>
              <div className='overview-user-address overview-item'>
                <div className='overview-item__title'>Địa chỉ</div>
                <div className='overview-item__content'>{data.address}</div>
              </div>
            </div>
            : <></>
          }

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
          {JSON.stringify(data) !== '{}' ?
            <>
              <div className='overview-part'>
                <div className='overview-item'>
                  <div className='overview-item__title'>Số phiên</div>
                  <div className='overview-item__content'>{data.auction_history_count || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Số lần đấu giá</div>
                  <div className='overview-item__content'>{data.all_auction_history_count || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thắng cược</div>
                  <div className='overview-item__content'>{data.auction_won_count || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thành công</div>
                  <div className='overview-item__content'>{data.auction_success || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Đã bán</div>
                  <div className='overview-item__content'>{data.auction_sale_all_count || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thành công</div>
                  <div className='overview-item__content'>{data.sell_success_count || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Đã giao hàng</div>
                  <div className='overview-item__content'>{data.sell_success_count || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Thất bại</div>
                  <div className='overview-item__content'>{data.sell_failed_count_by_auctioneer || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Số dư</div>
                  <div className='overview-item__content'>{data.amount || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Lợi nhuận</div>
                  <div className='overview-item__content'>{data.spent || 0}</div>
                </div>
                <div className='overview-item'>
                  <div className='overview-item__title'>Đã chi</div>
                  <div className='overview-item__content'>{data.spent || 0}</div>
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
    </div>
  )
}

