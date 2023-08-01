/* eslint-disable jsx-a11y/anchor-is-valid */
import "./footer.scss"

export const Footer = () => {
    return (
        <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#1c2331' }}>
            <div className="container p-4 pb-0">
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Trungkien Auction</h6>
                            <p style={{ textIndent: "20px" }}>
                                Chào mừng bạn đến với trang web đấu giá hàng đầu tại Việt Nam.
                                Khám phá những sản phẩm độc đáo và tham gia vào những cuộc đấu giá hấp dẫn, nơi bạn có cơ hội sở hữu những vật phẩm ưng ý với giá hấp dẫn nhất.
                                Đón chờ những trải nghiệm độc quyền và mở ra cánh cửa tới thế giới đấu giá tuyệt vời của chúng tôi!!
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Hỗ trợ khách hàng</h6>
                            <p><a className="text-white">Về chúng tôi</a></p>
                            <p><a className="text-white">Câu hỏi thường gặp</a></p>
                            <p><a className="text-white">Hướng dẫn sử dụng</a></p>
                            <p><a className="text-white">Điều khoản</a></p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Liên hệ</h6>
                            <p><i className="fas fa-home mr-3"></i> 136 Nguyễn An Ninh, Hoàng Mai, HN</p>
                            <p><i className="fas fa-envelope mr-3"></i> nguyenkien2022001@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +84 989983025</p>
                            <p><i className="fas fa-print mr-3"></i> +84 989983025</p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                            <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="https://www.facebook.com/kien.trung.2022001" role="button">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="https://www.facebook.com/kien.trung.2022001" role="button">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="https://www.facebook.com/kien.trung.2022001" role="button">
                                <i className="fab fa-google"></i>
                            </a>
                            <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="https://www.facebook.com/kien.trung.2022001" role="button">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="https://www.facebook.com/kien.trung.2022001" role="button">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} href="https://www.facebook.com/kien.trung.2022001" role="button">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copyright:
                <a className="text-white" href="https://www.facebook.com/kien.trung.2022001">Trungkien.Nguyen</a>
            </div>
        </footer>
    )
}

