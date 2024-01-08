import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import './Adventisement.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Adventisement = ({ data, loading, showMore = true }) => {

    return (
        <div>
            <div className="product-component-container adventisement-container">
                {
                    loading ?
                        <></>
                        :
                        <div className="product-part-wrapper">
                            <div className="title-header">
                                <div className="title" style={{ color: "black" }}>
                                    {data.title}
                                </div>
                                {showMore ?
                                    <div className="title-btn" onClick={() => window.location.href = `${data.shop_link}`}>
                                        <div className="content">
                                            Chi tiết
                                        </div>
                                        <div className="icon">
                                            <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
                                        </div>
                                    </div>
                                    :
                                    <></>}
                            </div>
                            <div className="adventisement-wrapper">
                                <div className="adventisement-big-img">
                                    <img src={data.big_image_url} alt="" />
                                </div>
                                <div className="adventisement-small-img-wrapper">
                                    {data && data.small_image_urls && data.small_image_urls.map((url, index) => (
                                        <div className="adventisement-small-img" key={index}>
                                            <img src={url} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div >
    );
};