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