import "./ProductComponent.scss";
import { Link } from "react-router-dom";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SellIcon from '@mui/icons-material/Sell';
import Countdown, { zeroPad } from 'react-countdown'
import moment from "moment";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const renderer = ({ days, hours, minutes, seconds }) => (
    <span>
        {days}d {zeroPad(hours)}h:{zeroPad(minutes)}':{zeroPad(seconds)}s
    </span>
);;

export const ProductComponent = ({ data, title, loading, keyword }) => {

    return (
        <div>
            <div className="product-component-container">
                {
                    loading ?
                        <div className="product-part-wrapper">
                            <div className="title-header">
                                <div className="title">
                                <Skeleton width={225} height={30} />
                                </div>

                                <div className="title-btn">
                                    <Skeleton width={100} height={20} />
                                </div>
                            </div>
                            <div className="product-wrapper">
                                {Array(6).fill(1).map((item, index) =>
                                    <div key={index} className="loading" style={{ margin: '20px' }}>
                                        <Skeleton width={170} height={200} />
                                        <Skeleton width={170} height={45} count={2} style={{ marginTop: "10px" }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <div className="product-part-wrapper">
                            <div className="title-header">
                                <div className="title">
                                    {title}
                                </div>
                                <Link to={`/products?type=${keyword}`} style={{ color: '#d0011b', textDecoration: 'none' }}>
                                    <div className="title-btn">
                                        <div className="content">
                                            Xem tất cả
                                        </div>
                                        <div className="icon">
                                            <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="product-wrapper">
                                {
                                    data && data.length && data.map(item => (
                                        <Link key={item.id} to={`/auction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <div className="product">
                                                <div className="productImg">
                                                    <img src={item.image} alt="Product_Image" />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                                                    <div className="product-time product-item">
                                                        <div className="product-icon">
                                                            <AccessTimeIcon />
                                                        </div>
                                                        <div className="product-content" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                                                            <Countdown
                                                                // onComplete={() => handleStop()}
                                                                // onStop={()=>handleStop()}
                                                                date={moment(item.start_time).add(item.time, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss')}
                                                                renderer={renderer}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="product-vote product-item">
                                                        <div className="product-icon">
                                                            <EmojiPeopleIcon />
                                                        </div>
                                                        <div className="product-content" style={{ fontSize: "1.2rem" }}>
                                                            {item.auction_count}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-name">{item.name}</div>
                                                {/* <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                                                    <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.start_price)}
                                                </div> */}
                                                <div className="product-price" style={{ marginTop: "5px", height: "12px" }}>
                                                    <AttachMoneyIcon style={{ marginBottom: '-5px', fontSize: "20px" }} />{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(item.sell_price)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            {/* <hr /> */}
                        </div>
                }
            </div>
        </div >
    );
};
