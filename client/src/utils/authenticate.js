exports.authenticate = (user, Swal)=>{
    if(!user || !user.id || !user.email){
        Swal.fire({
            icon: 'error',
            title: 'Cannot raise because you are not login. Login now!!',
            showConfirmButton: true,
          }).then(()=>{
            window.location.href = '/login'
          })
    }
}