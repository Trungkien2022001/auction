import "./footer.scss"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <div className="footer padding__main container">
            <div className="wrapper">
                <div className="col">
                    <Link style={{textDecoration: 'none', color: "black"}} to={"/"}>
                        <h1 className="logo">TIKA AUCTION</h1>
                    </Link>
                    <p>Kênh bán đấu giá hàng đầu Việt Nam</p>
                    <p>Địa chỉ: Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội.</p>
                    <b>Hotline: 0989983025</b>
                    <b>CSKH: 0989983025</b>
                    <p>Copyright © 2022 by trungkien</p>
                </div>
                <div className="col">
                    <div>
                        <PhoneIcon fontSize="large"></PhoneIcon>
                        <p>0989983025</p>
                    </div>
                    <h2>HỖ TRỢ KHÁCH HÀNG</h2>
                    <h3>Câu hỏi thường gặp (FAQ)</h3>
                    <h3>Hướng dẫn mua hàng</h3>
                    <h3>Chính sách giao hàng</h3>
                    <h3>Chính sách đổi trả</h3>
                    <h3>Chính sách bảo hành</h3>
                    <h3>Điều khoản bảo mật</h3>
                </div>
                <div className="col">
                    <div>
                        <EmailIcon fontSize="large"></EmailIcon>
                        <p>nguyenkien2022001@gmail.com</p>
                    </div>
                    <p>(Phản hồi trong thời gian sớm nhất)</p>
                    <h2>VỀ TIKA AUCTION</h2>
                    <h3>Câu hỏi thường gặp (FAQ)</h3>
                    <h3>Quy trình tư vấn</h3>
                    <h3>Sản phẩm ở TIKA AUCTION</h3>
                    <h3>Vì sao chọn TIKA AUCTION?</h3>
                    <h3>Tuyển dụng</h3>
                </div>
                <div className="col" >
                    <div>
                        <FacebookIcon fontSize="large" color="blue"></FacebookIcon>
                        <YouTubeIcon fontSize="large"></YouTubeIcon>
                        <LinkedInIcon fontSize="large"></LinkedInIcon>
                    </div>
                    <p>Được chứng nhận</p>
                    <img src="https://blog.webico.vn/wp-content/uploads/2019/12/GoDaddy-new-Logo.png" alt="" />
                    <p>Cách thức thanh toán</p>
                    <div className="imgs">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

