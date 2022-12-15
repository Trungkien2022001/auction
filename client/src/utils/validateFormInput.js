const moment = require('moment')
export const registerValidate = (data) => {
    if (data.name.length < 2 || data.name.length > 40) {
        return {
            err: true,
            message: 'Họ tên không được để trống, quá ngắn hoặc quá dài'
        }
    }

    if (data.username.length < 4 || data.username.length > 20) {
        return {
            err: true,
            message: 'username không được để trống, quá ngắn hoặc quá dài'
        }
    }

    if (!data.email.match(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        return {
            err: true,
            message: 'Email sai định dạng'
        }
    }

    if (isNaN(data.phone) || data.phone.length !== 10) {
        return {
            err: true,
            message: 'Số điện thoại không đúng'
        }
    }

    if (data.password !== data.rePassword) {
        return {
            err: true,
            message: 'Mật khấu không trùng khớp'
        }
    }
    if (data.password.length < 4) {
        return {
            err: true,
            message: 'Mật khẩu không được để trống hoặc quá ngắn'
        }
    }
    if (!data.birthday) {
        return {
            err: true,
            message: 'Vui lòng chọn ngày sinh'
        }
    }
    if (moment()
        .subtract(15, 'years')
        .format('YYYY-MM-DD') < data.birthday) {
        return {
            err: true,
            message: 'Tuổi của bạn phải lớn hơn 15 tuổi'
        }
    }
    if (data.address < 4) {
        return {
            err: true,
            message: 'Địa chỉ không được quá ngắn'
        }
    }

    return {
        err: false
    }
}

export const newAuctionValidate = (data) => {

    if(!data.name){
        return {
            err: true,
            message: 'Vui lòng nhập tên sản phẩm'
        }
    }

    if(!data.status){
        return {
            err: true,
            message: 'Vui lòng nhập tình trạng sản phẩm'
        }
    }

    if(data.start_price < 5000){
        return {
            err: true,
            message: 'Giá sản phẩm phải lớn hơn hoặc bằng 5000VND'
        }
    }

    if(!moment(data.start_time).isAfter(moment(new Date()).add('minute', 1))){
        return {
            err: true,
            message: 'Thời gian bắt đầu phải sau hiện tại ít nhất 1 phút'
        }
    }

    if(moment(data.start_time).isAfter(moment(new Date()).add('day', 7))){
        return {
            err: true,
            message: 'Thời gian bắt đầu không muộn quá hiện tại 7 ngày'
        }
    }

    if(!data.title){
        return {
            err: true,
            message: 'Vui lòng nhập mô tả ngắn gọn sản phẩm'
        }
    }

    if(!data.description){
        return {
            err: true,
            message: 'Vui lòng nhập mô tả chi tiết sản phẩm'
        }
    }

    return {
        err: false
    }
}
