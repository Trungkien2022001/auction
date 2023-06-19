import React, { useEffect, useRef, useState } from 'react'
import './Chat.scss'
import { Avatar, Button, Divider, TextField } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { get } from '../../../utils/customRequest';
import { useSelector } from 'react-redux';
const moment = require('moment')

export const Chat = ({ socket }) => {
    const currentUser = useSelector(state => state.user)
    const messageRef = useRef(null)
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const [lstMsg, setLstMsg] = useState([])
    const [clientId, setClientId] = useState()

    async function getData() {
        if (clientId) {

            const result = await get(`${process.env.REACT_APP_API_ENDPOINT}/message?user_id=${clientId}`, currentUser)
            if (result.status === 200) {
                setData(result.data.body)
            }
        }
    }
    async function getAllLastMsg() {
        let result = await get(`${process.env.REACT_APP_API_ENDPOINT}/messages`, currentUser)
        if (result.status === 200) {
            setLstMsg(result.data.body)
        }
    }
    useEffect(() => {
        getAllLastMsg()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId])

    useEffect(() => {
        if (socket.current) {
            socket.current.on('updateUI', () => {
                // getData()
            })
            socket.current.on('receive-client-msg', params => {
                if (params.user_id === clientId) {
                    setData(prev => [...prev, { ...params, id: data[data.length-1].id+1,updated_at: moment(new Date()).format('DD/MM/YYYY HH:mm') }])
                    console.log(data)
                    // getData()
                }
                getAllLastMsg()
                // setData(prev => [...prev, {...params}])
            })
            socket.current.on('new-user-join-chat', async chatId => {
                await getAllLastMsg()
                socket.current.emit('admin-update-lst-user', { chat_id: chatId, admin_id: currentUser.id })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    const onEnter = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            handleSend()
        }
    }

    useEffect(() => {
        messageRef.current?.scrollIntoView()
    }, [data.length])

    async function handleRead(item) {
        const currentMsg = lstMsg.find(i => i.user1 === item.user1)
        setClientId(item.user1)
        if (socket.current && currentMsg && !currentMsg.is_read) {
            socket.current.emit('udpate-admin-read-msg', { user_id: item.user1, chat_id: item.id })
            getAllLastMsg()
        }
    }

    async function handleSend() {
        if (message !== "" && currentUser.id && currentUser.id !== 1) {
            let msg
            if (!data.length) {
                msg = {
                    is_admin: 1,
                    content: message,
                    user: "Admin",
                    user_id: 0,
                    isUpdatedLastMsg: true
                }
            } else {
                msg = {
                    is_admin: 1,
                    content: message,
                    user: "Admin",
                    user_id: clientId,
                    chat_id: data[0].chat_id
                }
            }
            socket.current.emit('admin-send-msg', msg)
            setData(prev =>
                [...prev, {
                    chat_id: data.length ? data[0].chat_id : 1,
                    user_id: clientId,
                    is_admin: 1,
                    content: message,
                    updated_at: moment(new Date()).format('DD/MM/YYYY HH:mm')
                }])
        }
        getAllLastMsg()
        setMessage("");
    };

    return (
        <div className='chat-container'>
            <div className="chat-sidebar">
                <TextField style={{ width: "100%" }} id="outlined-basic" label="Search Message" variant="outlined" />
                <div className="chat-sidebar-wrapper">
                    {
                        lstMsg.map((item, index) =>
                            <div key={index} onClick={() => handleRead(item)}>
                                <div className={item.is_read ? "chat-sidebar-item" : "chat-sidebar-item unread-message"}>
                                    <div className="item-avatar">
                                        <Avatar alt="Remy Sharp" src={item.user_avatar} />
                                    </div>
                                    <div className="item-username">
                                        <div><b>{item.username}</b></div>
                                        <div>{item.last_msg}</div>
                                    </div>
                                    <div className="item-action">
                                        <MoreHorizIcon />
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        )
                    }
                    {/* <hr style={{color: "rgb(129, 118, 118)", width: "2px"}}></hr> */}
                </div>
            </div>
            <div className="chat-wrapper">
                <div className="header">
                    <div className="item-avatar">
                        {data.length ? <Avatar alt="Remy Sharp" src={data[0].user_avatar} /> : <></>}
                    </div>
                    <div className="item-username">
                        <b>{data.length ?  data[0].username  : ''}</b>
                    </div>
                    <div className="item-action">
                        <MoreHorizIcon />
                    </div>
                </div>
                <Divider />
                <div className='main'>
                    <div className="main-wrapper">
                        {data.map((msg, index) =>
                            <div key={index}>
                                {msg.is_admin ?
                                    <div className="right item">
                                        <div className="content">
                                            {msg.content}
                                            <div className='time'>
                                                {msg.updated_at}
                                            </div>
                                        </div>
                                        <div className="avatar">
                                            <Avatar sx={{ width: 26, height: 26 }} alt="Remy Sharp" src="https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg" />
                                        </div>
                                    </div>
                                    :
                                    <div className="item left">
                                        <div className="avatar">
                                            <Avatar sx={{ width: 26, height: 26 }} alt="Remy Sharp" src={msg.user_avatar} />
                                        </div>
                                        <div className="content">
                                            {msg.content}
                                            <div className='time'>
                                                {msg.updated_at}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                        <div ref={messageRef} />
                    </div >
                </div>
                <div className='chat-input'>
                    <TextField style={{ width: "calc(100% - 100px)" }} value={message} onKeyDown={onEnter} onChange={e => setMessage(e.target.value)} id="outlined-basic" placeholder='Nhập tin nhắn...' variant="outlined" />
                    <Button style={{ width: "100px", height: "54px" }} onClick={handleSend} variant="contained">Send</Button>
                </div>
            </div>
        </div>
    )
}
