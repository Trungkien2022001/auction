const { default: Swal } = require("sweetalert2")

exports.authenticate = (user)=>{
    if(!user || !user.id || !user.email){
        Swal.fire({
            icon: 'error',
            title: 'Cannot raise because you are not login. Login now!!',
            showConfirmButton: true,
          }).then(()=>{
            window.location.href = '/login'
          })
          return true
    } else if(user.is_blocked.includes('_block')){
      Swal.fire({
        icon: 'error',
        title: 'Tài khoản của bạn bị khóa, bạn không thể thực hiện hành động này!',
        showConfirmButton: true,
      })
      return true
    }
    return false
}