/* eslint-disable react-hooks/exhaustive-deps */

import './Chart.scss'
import * as React from 'react';

import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const api_endpoint = process.env.REACT_APP_API_ENDPOINT

export const Chart = ({ currentUser, socket }) => {
  const [auctionRaise, setAuctionRaise] = useState([])
  const [auction, setAuction] = useState([])
  const [user, setUser] = useState(JSON.parse(`[{"created_at":"18-11","count":144},{"created_at":"19-11","count":2},{"created_at":"27-11","count":3},{"created_at":"28-11","count":2},{"created_at":"30-11","count":1},{"created_at":"10-12","count":1},{"created_at":"11-12","count":2},{"created_at":"14-12","count":1},{"created_at":"15-12","count":1},{"created_at":"16-12","count":1},{"created_at":"19-12","count":1},{"created_at":"24-05","count":1}]`))
  const [money, setMoney] = useState(JSON.parse(`[{"created_at":"14-02 09:46","money":121040018,"revenue":12288551},{"created_at":"16-02 10:04","money":72000,"revenue":5623},{"created_at":"19-02 09:01","money":1100000,"revenue":526040},{"created_at":"23-02 21:41","money":36000000,"revenue":7267303},{"created_at":"23-02 23:22","money":22000000,"revenue":7637160},{"created_at":"23-02 23:25","money":80000000,"revenue":20579206},{"created_at":"23-02 23:28","money":100000000,"revenue":46551339},{"created_at":"23-02 23:31","money":7000,"revenue":1951},{"created_at":"23-02 23:33","money":5000000,"revenue":772906},{"created_at":"23-02 23:34","money":50000000,"revenue":1241871},{"created_at":"23-02 23:35","money":500078,"revenue":8615},{"created_at":"23-02 23:36","money":50007767,"revenue":10395682},{"created_at":"23-02 23:51","money":8000,"revenue":3894},{"created_at":"24-02 08:33","money":600000,"revenue":206955},{"created_at":"24-03 08:39","money":123456,"revenue":5248},{"created_at":"14-04 17:13","money":5000,"revenue":952},{"created_at":"22-05 23:34","money":5005,"revenue":572},{"created_at":"08-06 20:30","money":52000000,"revenue":13046515},{"created_at":"08-06 20:31","money":61000,"revenue":21195},{"created_at":"08-06 20:32","money":6001,"revenue":245},{"created_at":"08-06 20:33","money":5000,"revenue":817}]`))
  const [summary, setSummary] = useState(JSON.parse(`{"user":160,"auction":43,"auction_raise":337,"money":518540325,"revenue":2987313,"chat":4}`))
  const [requestCount, setRequestCount] = useState(JSON.parse(`[{"count":1,"created_at":"21:33:12"},{"count":14,"created_at":"21:33:11"},{"count":1,"created_at":"21:33:09"},{"count":2,"created_at":"21:33:08"},{"count":1,"created_at":"21:32:14"},{"count":2,"created_at":"21:32:13"},{"count":2,"created_at":"21:32:12"},{"count":2,"created_at":"21:32:10"},{"count":1,"created_at":"21:32:09"},{"count":1,"created_at":"21:32:08"},{"count":1,"created_at":"21:32:07"},{"count":1,"created_at":"21:32:06"},{"count":1,"created_at":"21:32:05"},{"count":1,"created_at":"21:32:04"},{"count":14,"created_at":"21:32:03"},{"count":1,"created_at":"21:32:02"},{"count":13,"created_at":"21:32:01"},{"count":3,"created_at":"21:15:16"},{"count":2,"created_at":"21:15:13"},{"count":3,"created_at":"21:15:08"},{"count":1,"created_at":"21:14:49"},{"count":2,"created_at":"21:14:48"},{"count":2,"created_at":"21:14:45"},{"count":2,"created_at":"21:14:44"},{"count":3,"created_at":"21:14:37"},{"count":2,"created_at":"21:14:06"},{"count":2,"created_at":"21:13:59"},{"count":1,"created_at":"21:13:40"},{"count":2,"created_at":"21:13:39"},{"count":3,"created_at":"21:12:53"},{"count":1,"created_at":"21:12:36"},{"count":1,"created_at":"21:12:35"},{"count":1,"created_at":"21:12:32"},{"count":2,"created_at":"21:12:30"},{"count":1,"created_at":"21:11:53"},{"count":1,"created_at":"21:11:52"},{"count":1,"created_at":"21:11:44"},{"count":1,"created_at":"21:11:16"},{"count":1,"created_at":"21:11:08"},{"count":1,"created_at":"21:11:07"},{"count":1,"created_at":"21:10:50"},{"count":1,"created_at":"21:10:44"},{"count":1,"created_at":"21:10:38"},{"count":1,"created_at":"21:10:37"},{"count":1,"created_at":"21:10:34"},{"count":1,"created_at":"21:10:13"},{"count":1,"created_at":"21:10:08"},{"count":1,"created_at":"21:10:07"},{"count":1,"created_at":"21:09:56"},{"count":1,"created_at":"21:09:54"}]`))
  const [requestLimit, setRequestLimit] = useState(50)
  const [auctionRaiseType, setAuctionRaiseType] = useState('day')
  const [auctionType, setAuctionType] = useState('day')
  const [userType, setUserType] = useState('day')
  const [moneyType, setMoneyType] = useState('minute')
  const [check, setCheck] = useState(false)
  const [timeUpdate, setTimeUpdate] = useState(3600)
  async function getAuctionRaise() {
    let result = await get(`${api_endpoint}/dashboard-auction-raise?type=${auctionRaiseType}`, currentUser)
    if (result.status === 200) {
      setAuctionRaise(result.data.data)
    }
  }
  async function getSummary() {
    let result = await get(`${api_endpoint}/dashboard-summary`, currentUser)
    if (result.status === 200) {
      setSummary(result.data.data)
    }
  }
  async function getRequestCount() {
    let result = await get(`${api_endpoint}/dashboard-request-count?limit=${requestLimit}`, currentUser)
    if (result.status === 200) {
      setRequestCount(result.data.data)
      // setRequestCount(prev=>[...prev, ...result.data.data])
    }
  }
  async function getMoney() {
    let result = await get(`${api_endpoint}/dashboard-money?type=${moneyType}`, currentUser)
    if (result.status === 200) {
      setMoney(result.data.data)
    }
  }
  async function getUser() {
    let result = await get(`${api_endpoint}/dashboard-user?type=${userType}`, currentUser)
    if (result.status === 200) {
      setUser(result.data.data)
    }
  }
  async function getAuction() {
    let result = await get(`${api_endpoint}/dashboard-auction?type=${auctionType}`, currentUser)
    if (result.status === 200) {
      setAuction(result.data.data)
    }
  }
  function getAll() {
    getAuctionRaise()
    getAuction()
    getUser()
    getMoney()
    getSummary()
  }
  useEffect(() => {
    getAll()
  }, [check])
  useEffect(() => {
    const interval = setInterval(() => {
      getRequestCount()
    }, 1 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [requestLimit])
  useEffect(() => {
    setCheck(Math.random())
    const interval = setInterval(() => {
      setCheck(Math.random());
    }, timeUpdate * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeUpdate])

  useEffect(() => {
    getAuctionRaise()
  }, [auctionRaiseType])
  useEffect(() => {
    getMoney()
  }, [moneyType])

  useEffect(() => {
    getAuction()
  }, [auctionType])

  useEffect(() => {
    getUser()
  }, [userType])

  useEffect(() => {
    if (socket.current) {
      socket.current.on('server-send-request-count', (data) => {
        // getAll()
      })
    }
  }, [socket.current])

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const CustomizedAxisTick = ({ x, y, payload }) => {
    const formattedNumber = numberWithCommas(payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-15)">
          {formattedNumber}
        </text>
      </g>
    );
  };

  return (
    <div className='chart'>
      <div className="summary">
        <div className="box" style={{ color: "#FF0060" }}>
          <div className="item">
            <div className="header">User</div>
            <div className="content">{summary.user || 0}</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#0079FF" }}>
          <div className="item">
            <div className="header">Auction</div>
            <div className="content">{summary.auction || 0}</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#0079FF" }}>
          <div className="item">
            <div className="header">Raise</div>
            <div className="content">{summary.auction_raise || 0}</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#00DFA2" }}>
          <div className="item">
            <div className="header">Money</div>
            <div className="content">{(summary.money || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#590696" }}>
          <div className="item">
            <div className="header">Revenue</div>
            <div className="content">{(summary.revenue || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#FF0075" }}>
          <div className="item">
            <div className="header">Chat</div>
            <div className="content">{summary.chat || 0}</div>
            <div className="more">+5%</div>
          </div>
        </div>
      </div>
      <div className="filter">
              <b style={{paddingLeft:"30px"}}>Refresh After:</b>{"        "} 
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeUpdate}
                style={{ width: '120px', textAlign: "center"}}
                onChange={(e) => setTimeUpdate(e.target.value)}
              >
                <MenuItem value={1}>Realtime</MenuItem>
                <MenuItem value={3}>3 Giây</MenuItem>
                <MenuItem value={5}>5 Giây</MenuItem>
                <MenuItem value={10}>10 Giây</MenuItem>
                <MenuItem value={30}>30 Giây</MenuItem>
                <MenuItem value={3600}>None</MenuItem>
              </Select>
            </div>
      <div className="chart-item">
        <div className="header">
          <div className="content">Số lượng request</div>
            <div className="filter">
              <InputLabel id="select-label">Số request</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={requestLimit}
                style={{ width: '120px' }}
                onChange={(e) => setRequestLimit(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={500}>500</MenuItem>
              </Select>
            </div>
        </div>
        <ResponsiveContainer className="" height={500}>
          <LineChart
            height={500}
            data={requestCount}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis dataKey="created_at" tick={CustomizedAxisTick} />
            <YAxis tickFormatter={numberWithCommas} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={numberWithCommas} />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-item">
        <div className="header">
          <div className="content">Doanh thu</div>
            <div className="filter">
              <InputLabel id="select-label">Lọc theo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={moneyType}
                style={{ width: '120px' }}
                onChange={(e) => setMoneyType(e.target.value)}
              >
                <MenuItem value={'minute'}>Phút</MenuItem>
                <MenuItem value={'hour'}>Giờ</MenuItem>
                <MenuItem value={'day'}>Ngày</MenuItem>
                <MenuItem value={'month'}>Tháng</MenuItem>
              </Select>
            </div>
        </div>
        <ResponsiveContainer className="" height={500}>
          <LineChart
            height={500}
            data={money}
            transform={'none'}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis dataKey="created_at" tick={CustomizedAxisTick} />
            <YAxis tickFormatter={numberWithCommas} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={numberWithCommas} />
            <Legend />
            <Line type="monotone" dataKey="money" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-item">
        <div className="header">
          <div className="content">Người dùng</div>
          <div className="filter">
            <InputLabel id="select-label">Lọc theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={type}
              defaultValue={'day'}
              style={{ width: '120px' }}
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value={'minute'}>Phút</MenuItem>
              <MenuItem value={'hour'}>Giờ</MenuItem>
              <MenuItem value={'day'}>Ngày</MenuItem>
              <MenuItem value={'month'}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="" height={500}>
          <LineChart
            height={500}
            data={user}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="created_at" />
            <YAxis label={{ value: 'Doanh thu', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-item">
        <div className="header">
          <div className="content">Lượt đấu giá</div>
          <div className="filter">
            <InputLabel id="select-label">Lọc theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={type}
              defaultValue={'day'}
              style={{ width: '120px' }}
              onChange={(e) => setAuctionRaiseType(e.target.value)}
            >
              <MenuItem value={'minute'}>Phút</MenuItem>
              <MenuItem value={'hour'}>Giờ</MenuItem>
              <MenuItem value={'day'}>Ngày</MenuItem>
              <MenuItem value={'month'}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="" height={500}>
          <LineChart
            height={500}
            data={auctionRaise}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="created_at" />
            <YAxis label={{ value: 'Doanh thu', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-item">
        <div className="header">
          <div className="content">Phiên đấu giá</div>
          <div className="filter">
            <InputLabel id="select-label">Lọc theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={auctionType}
              style={{ width: '120px' }}
              onChange={(e) => setAuctionType(e.target.value)}
            >
              <MenuItem value={'minute'}>Phút</MenuItem>
              <MenuItem value={'hour'}>Giờ</MenuItem>
              <MenuItem value={'day'}>Ngày</MenuItem>
              <MenuItem value={'month'}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="" height={500}>
          <LineChart
            height={500}
            data={auction}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="created_at" />
            <YAxis label={{ value: 'Doanh thu', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
