const Swal = require('sweetalert2');
exports.checkApiResponse = (res) => {
  if (res.data && !res.data.code) {
    return true
  }
  if (!res.data || res.data.code < 200 || res.data.code > 299) {
    console.log(res.data.code)
    switch (res.data.code) {
      case 502:

        Swal.fire({
          icon: 'error',
          title: 'Cannot raise because you are not login. Login now!!',
          showConfirmButton: true,
        })
        break;

      case 500:
        Swal.fire({
          icon: 'error',
          title: 'INTERNAL SERVER ERROR',
          text: res.data.message || 'An unexpected error occurred!!',
          showConfirmButton: true,
        })
        break;

      default:
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'An unexpected error occurred!!',
          showConfirmButton: true,
        })
        break;
    }
    return false
  }
  return true
}