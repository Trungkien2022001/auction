import React from 'react'
import './Chat.scss'
import { Avatar, Button, Divider, MenuItem, Select, TextField } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const Chat = () => {
    return (
        <div className='chat-container'>
            <div className="chat-sidebar">
                <TextField style={{ width: "100%" }} id="outlined-basic" label="Search Message" variant="outlined" />
                <div className="chat-sidebar-wrapper">
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item unread-message">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon style={{ marginTop: "13px" }} />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item unread-message">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    <div className="chat-sidebar-item">
                        <div className="item-avatar">
                            <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                        </div>
                        <div className="item-username">
                            <div><b>Nhung</b></div>
                            <div>Đang làm gì đó</div>
                        </div>
                        <div className="item-action">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <Divider />
                    {/* <hr style={{color: "rgb(129, 118, 118)", width: "2px"}}></hr> */}
                </div>
            </div>
            <div className="chat-wrapper">
                <div className="header">
                    <div className="item-avatar">
                        <Avatar alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                    </div>
                    <div className="item-username">
                        <b>Nhung</b>
                    </div>
                    <div className="item-action">
                        <MoreHorizIcon />
                    </div>
                </div>
                <Divider />
                <div className='main'>
                    <div className="main-wrapper">

                        <div className="left item">
                            <div className="avatar">
                                <Avatar sx={{ width: 26, height: 26 }} alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                            </div>
                            <div className="content">
                                Hi chào cậu
                            </div>
                        </div>
                        <div className="right item">
                            <div className="content">
                                Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu
                                Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu
                                Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu
                            </div>
                            <div className="avatar">
                                <Avatar sx={{ width: 26, height: 26 }} alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                            </div>
                        </div>
                        <div className="item left">
                            <div className="avatar">
                                <Avatar sx={{ width: 26, height: 26 }} alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                            </div>
                            <div className="content">
                                Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu
                                Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu
                                Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu Hi chào cậu
                            </div>
                        </div>
                    </div>
                </div>
                <div className='chat-input'>
                    <TextField style={{ width: "calc(100% - 100px)" }} id="outlined-basic" placeholder='Nhập tin nhắn...' variant="outlined" />
                    <Button style={{ width: "100px", height: "54px" }} variant="contained">Send</Button>
                </div>
            </div>
        </div>
    )
}
