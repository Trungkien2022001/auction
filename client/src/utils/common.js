const { default: Swal } = require("sweetalert2")

exports.tryParseJson = (str) => {
  let obj
  try {
    obj = JSON.parse(str)
  } catch (error) {

  }
  return obj
}
exports.checkIsBlockedUser = (status) => {
  switch (status) {
    case 'normal_block':
      Swal.fire({
        icon: 'warning',
        title: 'Bạn bị chặn một tuần, bạn không thể tạo hay đấu giá. Vui lòng có hành vi chuẩn mực!!',
        showConfirmButton: true,
      })
      break;

    case 'permanent_block':
      Swal.fire({
        icon: 'warning',
        title: 'Bị chặn vĩnh viễn vì những hành vi không chuẩn mực của mình. Bạn sẽ không thể đấu giá hay tạo mới nữa!!',
        showConfirmButton: true,
      })
      break;

    default:
      break;
  }
}
exports.popupError = err => {
  Swal.fire({
    icon: 'error',
    title: err.message || "Unexpected Error Occurred",
    text: "It seems our server is having problems, we will fix it quickly. Sorry for this inconvenience",
    showCancelButton: true,
    confirmButtonText: 'About Us',
    cancelButtonText: 'Ok'
  }).then(result=> {
    if (result.isConfirmed) {
      window.location.href = '/tutorial'
    }
  })
  // throw new Error(err.message)
}