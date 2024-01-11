/* eslint-disable react-hooks/exhaustive-deps */

import './Chart.scss'
import * as React from 'react';

import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { checkApiResponse } from '../../../utils/checkApiResponse';

export const Chart = ({ currentUser, socket }) => {
  const [auctionRaise, setAuctionRaise] = useState([])
  const [auction, setAuction] = useState([])
  const [user, setUser] = useState([])
  const [money, setMoney] = useState([])
  const [summary, setSummary] = useState({})
  const [requestCount, setRequestCount] = useState([])
  const [requestLimit, setRequestLimit] = useState(50)
  const [auctionRaiseType, setAuctionRaiseType] = useState('day')
  const [auctionType, setAuctionType] = useState('day')
  const [userType, setUserType] = useState('day')
  const [moneyType, setMoneyType] = useState('minute')
  const [check, setCheck] = useState(false)
  const [timeUpdate, setTimeUpdate] = useState(3600)
  async function getAuctionRaise() {
    let result = await get(`/dashboard-auction-raise?type=${auctionRaiseType}`, currentUser)
    if (checkApiResponse(result)) {
      setAuctionRaise(result.data.data)
    }
  }
  async function getSummary() {
    let result = await get(`/dashboard-summary`, currentUser)
    if (checkApiResponse(result)) {
      setSummary(result.data.data)
    }
  }
  async function getRequestCount() {
    let result = await get(`/dashboard-request-count?limit=${requestLimit}`, currentUser)
    if (checkApiResponse(result)) {
      setRequestCount(result.data.data)
      // setRequestCount(prev=>[...prev, ...result.data.data])
    }
  }
  async function getMoney() {
    let result = await get(`/dashboard-money?type=${moneyType}`, currentUser)
    if (checkApiResponse(result)) {
      setMoney(result.data.data)
    }
  }
  async function getUser() {
    let result = await get(`/dashboard-user?type=${userType}`, currentUser)
    if (checkApiResponse(result)) {
      setUser(result.data.data)
    }
  }
  async function getAuction() {
    let result = await get(`/dashboard-auction?type=${auctionType}`, currentUser)
    if (checkApiResponse(result)) {
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
        <b style={{ paddingLeft: "30px" }}>Refresh After:</b>{"        "}
        <Select
          variant="standard"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeUpdate}
          style={{ width: '120px', textAlign: "center" }}
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
        <ResponsiveContainer className="" height={400}>
          <LineChart
            height={400}
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
        <ResponsiveContainer className="" height={400}>
          <LineChart
            height={400}
            data={money}
            transform={'none'}
            margin={{ top: 5, right: 30, left: 75, bottom: 5 }}
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
        <ResponsiveContainer className="" height={400}>
          <LineChart
            height={400}
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
        <ResponsiveContainer className="" height={400}>
          <LineChart
            height={400}
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
        <ResponsiveContainer className="" height={400}>
          <LineChart
            height={400}
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
