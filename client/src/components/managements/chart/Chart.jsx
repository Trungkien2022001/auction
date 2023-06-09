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
  async function getData() {
    let result = await get(`${api_endpoint}/dashboard-auction-raise`, currentUser)
    if (result.status === 200) {
      setAuctionRaise(result.data.data.map(i => {
        return { ...i, created_at: moment(i.created_at).format('DD-MM-YY HH:mm') }
      }))
    }
  }
  useEffect(() => {

    getData()
  }, [])
  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        getData()
      })
    }
  }, [socket.current])
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ]
  return (
    <div className='chart'>
      <div className="summary">
        <div className="box" style={{ color: "#FF0060" }}>
          <div className="item">
            <div className="header">User</div>
            <div className="content">12452</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#0079FF" }}>
          <div className="item">
            <div className="header">Auction</div>
            <div className="content">12452</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#00DFA2" }}>
          <div className="item">
            <div className="header">Money</div>
            <div className="content">12452</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#590696" }}>
          <div className="item">
            <div className="header">Revenue</div>
            <div className="content">12452</div>
            <div className="more">+5%</div>
          </div>
        </div>
        <div className="box" style={{ color: "#FF0075" }}>
          <div className="item">
            <div className="header">Chat</div>
            <div className="content">12452</div>
            <div className="more">+5%</div>
          </div>
        </div>
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
              defaultValue={2}
              style={{ width: '120px' }}
            // onChange={(e) => handleSearch(e.target.value, 'type')}
            >
              <MenuItem value={1}>Giờ</MenuItem>
              <MenuItem value={2}>Ngày</MenuItem>
              <MenuItem value={3}>Tháng</MenuItem>
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
          <div className="content">Doanh thu</div>
          <div className="filter">
            <InputLabel id="select-label">Lọc theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={type}
              defaultValue={2}
              style={{ width: '120px' }}
            // onChange={(e) => handleSearch(e.target.value, 'type')}
            >
              <MenuItem value={1}>Giờ</MenuItem>
              <MenuItem value={2}>Ngày</MenuItem>
              <MenuItem value={3}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="" height={500}>
          <LineChart
            height={500}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
              // value={type}
              defaultValue={2}
              style={{ width: '120px' }}
            // onChange={(e) => handleSearch(e.target.value, 'type')}
            >
              <MenuItem value={1}>Giờ</MenuItem>
              <MenuItem value={2}>Ngày</MenuItem>
              <MenuItem value={3}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="chart" height={300}>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
              defaultValue={2}
              style={{ width: '120px' }}
            // onChange={(e) => handleSearch(e.target.value, 'type')}
            >
              <MenuItem value={1}>Giờ</MenuItem>
              <MenuItem value={2}>Ngày</MenuItem>
              <MenuItem value={3}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="chart" height={300}>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
              // value={type}
              defaultValue={2}
              style={{ width: '120px' }}
            // onChange={(e) => handleSearch(e.target.value, 'type')}
            >
              <MenuItem value={1}>Giờ</MenuItem>
              <MenuItem value={2}>Ngày</MenuItem>
              <MenuItem value={3}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <ResponsiveContainer className="chart" height={300}>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
