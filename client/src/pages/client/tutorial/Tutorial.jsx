
import { Header } from "../../../components/header/Header";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import "./Tutorial.scss";

export const Tutorial = ({ socket }) => {

  return (
    <div>
      <Header socket={socket}></Header>
      <div className="tutorial" style={{ margin: "90px 60px" }}>
        <div className="item">
          <div className="header">
            Giới thiệu
          </div>
          <div className="content">
            Trong bối cảnh hiện nay, hầu như trên Việt Nam không có một sàn đấu giá trực tuyến nào cả. Khi đó cạnh tranh với các sàn khác sẽ nhỏ hơn.
          </div>
          <div className="content">
            Từ đó, TIKA được phát triển với mục đích là một sàn đấu giá trực tuyến. Tại đây người bán có thể đăng bán các sản phẩm của mình, và người đấu giá có thể đấu giá, theo dõi những sản phẩm của mình thích.
          </div>
          <div className="content">
            Trang web có đội ngũ admin riêng, chia theo nhiều role như admin-user, admin-chat-support, admin-auction, admin-system để hỗ trợ người mua cũng như người bán.
          </div>
        </div>
        <div className="item">
          <div className="header">
            Hướng dẫn sử dụng
          </div>
          <ul>
            <li className="content">
              Nếu bạn chưa có tài khoản thì bạn có thể đăng kí tài khoản mới <span><a href="/register">tại đây</a></span>
            </li>
            <li className="content">
              Nếu chưa đăng nhập thì bạn vẫn có thể vào homepage để xem danh sách các phiên đấu giá theo nhiều loại như sản phẩm nổi bật, mới nhất, siêu rẻ, cao cấp, sắp đấu giá, ... Bạn cũng có thể thấy các quảng cáo của các shop, hay banner theo campaign của web
              Bạn có thể tìm kiếm sản phẩm trên theo search hoặc tìm kiếm theo danh mục sản phẩm
              Bạn cũng có thể click vào một sản phẩm bất kì để xem thông tin chi tiết sản phẩm, lịch sử đấu giá hoặc thông tin cá nhân của nhà cái
            </li>
            <li className="content">
              <b> Khi đã đăng nhập rồi</b>
              <li>
                Tại homepage bạn có thể chat với đội ngũ admin để hỏi đáp, phàn nàn về dịch vụ, tố cáo spam, hoặc là xin xỏ để mở khóa tài khoản... Hoặc tạo thêm sản phẩm mới
              </li>
              <li>
                Bạn có thể vào trang cá nhân của mình để xem thông tin của mình, chính sửa thông tin, các thông số về mua bán sản phẩm, số dư tài khoản
              </li>
              <li>
                Tại trang cá nhân bạn có thể thấy danh sách sản phẩm mình đã đấu giá thành công hoặc danh sách sản phẩm mình đã bán. Tại đây bạn có thể xác nhận mua, bán sản phẩm
              </li>
              <li>
                Tại trang đấu giá sản phẩm, nếu tài khoản bạn đã được xác thực và không bị khóa. Và số dư tài khoản đủ thì bạn có thể đấu giá một sản phẩm
              </li>
              <li>
                Khi đã đấu giá một sản phẩm, bạn có thể nhận thông báo nổi trực tiếp về diễn biến của phiên đấu giá đó để có thể có chiến lược phù hợp cho mình
              </li>
            </li>
            <li className="content">
              <b> Khi bạn là admin, vào trang admin tại <a href="/management">đây</a></b>
              <li>
                Tại đây bạn có thể thấy các thông số về trang web như số lượt đấu giá, phiên đấu giá, tổng tiền, doanh thu
              </li>
              <li>
                Các biểu đồ về doanh thu theo thời gian, ngoài ra còn có biểu đồ về số lượng request vào server, về số lượng user, auction, raise, ...
              </li>
              <li>
                Khi bạn có role admin_user bạn có thể xem danh sách user, có thể block, unblock, hay xác thực cho một user
              </li>
              <li>
                Khi bạn có role admin_auction bạn có thể xem danh sách auction, có thể verify phiên đấu giá đó hoặc là cancel một phiên đấu giá
              </li>
              <li>
                Khi bạn có role_chat_support thì bạn có thể nhận và nhắn tin với user, giải đáp các vấn đề user thắc mắc
              </li>
              <li>
                Khi bạn có role là admin_full_flow thì bạn có thể chỉnh sửa config của system (logo, banner, thêm các component quảng cáo của user đề xuất), có thể xem system log, có thể theo dõi được các hoạt động của user. Từ đó có thể quyết định chiến lược quảng cáo.
              </li>
            </li>
          </ul>
        </div>
        <div className="item">
          <div className="header">
            Danh sách các page
          </div>
          <li className="content">
            <a href="/login">Đăng nhập</a>
          </li>
          <li className="content">
            <a href="/register">Đăng kí</a>
          </li>
          <li className="content">
            <a href="/homepage">Trang chủ</a>
          </li>
          <li className="content">
            <a href="/products">Danh sách đấu giá</a>
          </li>
          <li className="content">
            <a href="/auction/5011">Trang đấu giá </a>
          </li>
          <li className="content">
            <a href="/user/319">Trang cá nhân</a>
          </li>
          <li className="content">
            <a href="/new-auction">Tạo sản phẩm mới</a>
          </li>
          <li className="content">
            <a href="/management">Management</a>
          </li>
          <li className="content">
            <a href="/management/auction">Auction Management</a>
          </li>
          <li className="content">
            <a href="/management/user">User Management</a>
          </li>
          <li className="content">
            <a href="/management/chat">Chat Support</a>
          </li>
          <li className="content">
            <a href="/management/action-log">Action Logs</a>
          </li>
          <li className="content">
            <a href="/management/system-config">System Config</a>
          </li>
        </div>
        <div className="item">
          <div className="header">
            Phát triển sản phẩm
          </div>
          <div className="content">
            <a href="https://github.com/Trungkien2022001/auction"> Github</a>
          </div>
          <div className="content">
            <a href="https://www.figma.com/file/pJxRNe7BWlrAb47VcAvvVQ/Auction?type=design&node-id=3-2&mode=design&t=2AZ15t2L2OZo3W79-0"> Figma</a>
          </div>
        </div>
        <div className="item">
          <div className="header">
            Tính năng đã và đang phát triển
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Lazy Loading
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Search By Elasticsearch
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              CronJob Update User Info and Auction Info Every 1 and 5 minutes
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Phân trang sản phẩm (Giảm netword, tài nguyên server)
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Phân quyền trang Admin
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Search theo nhiều điều kiện (category, type, name, price, status)
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Theo dõi người dùng
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Nhận quảng cáo, thêm component quảng cáo vào web
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <DoneOutlineOutlinedIcon style={{ color: "green" }} />
            </div>
            <div className="content">
              Thông báo realtime khi phiên đấu giá có cập nhật mới, chat realtime
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Message queue update elasticsearch data
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Tích hợp VNPay
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Phân cấp user (verified user, trial user)
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Ăn % doanh thu theo từng loại sản phẩm (VD: Đồng hồ 10%, nhà đất 5%, đồ gia dụng: 20%, ...)
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Giới hạn số lượt đấu giá, đăng sản phẩm của user thông qua Rank user
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Thu phí với mỗi lượt đấu giá, đăng bán theo rank use
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Admin BLock, unlock, verified User
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Sửa lại giao diện, refactor code, update flow, ....
            </div>
          </div>
          <div className="wrap-content">
            <div className="icon">
              <CloseOutlinedIcon style={{ color: "red" }} />
            </div>
            <div className="content">
              Incomming....
            </div>
          </div>
        </div>
        <div className="item">
          <div className="header">
            Kiến trúc hệ thống
          </div>
          <div className="content" style={{ textAlign: "center", fontSize: "25px" }}>
            <b>Solution Architext</b>
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1702613741/upload/n98lv0zedoaojj3gwd24.png" alt="" />
          </div>
          <div className="content" style={{ textAlign: "center", fontSize: "25px" }}>
            <b>FLow</b>
          </div>
          <div className="content">
            <img src="https://res.cloudinary.com/trungkien2022001/image/upload/v1704612841/upload/eh3cxtexw1ebkyaewlcn.png" alt="" />
          </div>
          <div className="content" style={{ textAlign: "center", fontSize: "25px" }}>
            <b>Use Case</b>
          </div>
          <div className="content">
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699243459/upload/hqkpv4amxpaptlm50mwd.png" alt="" />
          </div>

        </div>
        <div className="item">
          <div className="header">
            Ảnh demo
          </div>
        </div>
      </div>
      <div className="demo-image">
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704612959/upload/bmuaizdkdvcfbgcwetf5.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704613079/upload/kgbb90qcakjkkxqt1yl3.png" alt="" />
        <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699241871/upload/zk5qbmarsqb3fex7vlyg.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704681280/upload/bqvygra5alzmfzkerzwp.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704681355/upload/orfugwrnswnprpaodqx2.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704681457/upload/jg7bnfejgz3by1ipiahd.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704681658/upload/nysh6pb6trtathxgvgo0.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704613278/upload/z7ccvp7yvqdqbkw5dg5r.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704613708/upload/adgejecxejfknjftt3u8.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704613886/upload/tthnzjw1k8joqyawgyr3.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704614047/upload/mc3m9k6t7xj1tpihglrl.png" alt="" />
        <img src="http://res.cloudinary.com/trungkien2022001/image/upload/v1704614156/upload/hxcgr0acvyv8paztybnw.png" alt="" />
      </div>
    </div>

  );
};

