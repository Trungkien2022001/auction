/* eslint-disable react-hooks/exhaustive-deps */

import './Chart.scss'
import * as React from 'react';

import { visuallyHidden } from '@mui/utils';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import { AUCTION_STATUS } from '../../../utils/constants';
import { filterTable } from '../../../utils/filterTable';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const api_endpoint = process.env.REACT_APP_API_ENDPOINT

export const Chart = ({ currentUser, socket }) => {
  const [auctionRaise, setAuctionRaise] = useState([])
  const [auctionRaiseType, setAuctionRaiseType] = useState('day')
  const [auction, setAuction] = useState([])
  const [auctionType, setAuctionType] = useState('day')
  const [user, setUser] = useState([])
  const [userType, setUserType] = useState('day')
  const [money, setMoney] = useState([])
  const [summary, setSummary] = useState({})
  const [moneyType, setMoneyType] = useState('day')
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
    const interval = setInterval(() => {
      getAll();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [])

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
      socket.current.on('updateDashboard', () => {
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
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
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