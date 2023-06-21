/* eslint-disable react-hooks/exhaustive-deps */

import './Auction.scss'
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { visuallyHidden } from '@mui/utils';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AUCTION_STATUS, AUCTION_TIMES } from '../../../utils/constants';
import { filterTable } from '../../../utils/filterTable';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'product_name',
    numeric: true,
    disablePadding: false,
    label: 'Tên sản phẩm',
  },
  {
    id: 'product_init_price',
    numeric: true,
    disablePadding: false,
    label: 'Giá ban đầu',
  },
  {
    id: 'product_sell_price',
    numeric: true,
    disablePadding: false,
    label: 'Giá mua',
  },
  {
    id: 'start_time',
    numeric: true,
    disablePadding: false,
    label: 'Ngày bắt đầu',
  },
  {
    id: 'auction_time',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian đấu',
  },
  {
    id: 'auction_count',
    numeric: true,
    disablePadding: false,
    label: 'Số lượt đấu',
  },
  {
    id: 'seller',
    numeric: true,
    disablePadding: false,
    label: 'Người bán',
  },
  {
    id: 'winner',
    numeric: true,
    disablePadding: false,
    label: 'Người thắng',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { fn, fn1 } = props;

  return (
    <Toolbar
      style={{ paddingTop: "20px" }}
      sx={{
        pl: { sm: 2 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Lịch sử giao dịch
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={-1}  
        label="Age"
        placeholder='Lọc theo trạng thái'
        style={{ width: "400px" }}
        onChange={fn1}
      >
        <MenuItem value={-1}>Tất cả</MenuItem>
        {AUCTION_STATUS.map((item, index)=>
         <MenuItem key={index} value={item.value}>{item.title}</MenuItem>
        )}
      </Select>
      <TextField style={{ width: "400px" }} id="outlined-basic" label="Tìm kiếm" variant="outlined" onChange={fn} />
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const api_endpoint = process.env.REACT_APP_API_ENDPOINT

export const Auction = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [data, setData] = useState(JSON.parse(`[{"id":44,"start_time":"2023-06-08T13:34:00.000Z","end_time":null,"start_price":5000,"sell_price":6001,"seller_id":319,"auction_count":2,"auctioneer_win":null,"status":"Đang đấu giá","product_name":"trgf","auction_time":"1 Tháng"},{"id":41,"start_time":"2023-05-22T16:39:00.000Z","end_time":null,"start_price":5002,"sell_price":5005,"seller_id":319,"auction_count":3,"auctioneer_win":null,"status":"Đang đấu giá","product_name":"ekrjgerjge","auction_time":"1 Tháng"},{"id":42,"start_time":"2023-06-08T13:32:00.000Z","end_time":null,"start_price":50000,"sell_price":52000000,"seller_id":319,"auction_count":3,"auctioneer_win":null,"status":"Đang đấu giá","product_name":"Test","auction_time":"1 Tháng"},{"id":43,"start_time":"2023-06-08T13:33:00.000Z","end_time":null,"start_price":50000,"sell_price":61000,"seller_id":319,"auction_count":11,"auctioneer_win":null,"status":"Đang đấu giá","product_name":"4rtgfh","auction_time":"1 Tháng"},{"id":45,"start_time":"2023-06-08T13:35:00.000Z","end_time":null,"start_price":5000,"sell_price":5000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"ẻ","auction_time":"1 Tháng"},{"id":26,"start_time":"2023-02-16T03:06:00.000Z","end_time":null,"start_price":50000,"sell_price":72000,"seller_id":319,"auction_count":22,"auctioneer_win":null,"status":"Thành công","product_name":"Tai nghe không biết thương hiệu gì","auction_time":"1 Tháng"},{"id":37,"start_time":"2023-02-23T16:53:00.000Z","end_time":null,"start_price":5000,"sell_price":8000,"seller_id":319,"auction_count":3,"auctioneer_win":327,"status":"Thành công","product_name":"test","auction_time":"1 Phút"},{"id":39,"start_time":"2023-03-24T01:41:00.000Z","end_time":null,"start_price":5000,"sell_price":123456,"seller_id":323,"auction_count":1,"auctioneer_win":319,"status":"Thành công","product_name":"p","auction_time":"1 Phút"},{"id":40,"start_time":"2023-04-14T10:15:00.000Z","end_time":null,"start_price":5000,"sell_price":5000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"rtt","auction_time":"3 Giờ"},{"id":36,"start_time":"2023-02-27T16:36:00.000Z","end_time":null,"start_price":50007767,"sell_price":50007767,"seller_id":327,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"rrthrthtrhrt","auction_time":"7 Ngày"},{"id":35,"start_time":"2023-02-27T16:35:00.000Z","end_time":null,"start_price":500078,"sell_price":500078,"seller_id":327,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Avatar bách khoa","auction_time":"15 Ngày"},{"id":31,"start_time":"2023-02-23T16:31:00.000Z","end_time":null,"start_price":50000,"sell_price":100000000,"seller_id":327,"auction_count":3,"auctioneer_win":null,"status":"Người bán hủy đơn hàng","product_name":"Hoa Hồng Gai","auction_time":"1 Tháng"},{"id":29,"start_time":"2023-02-23T16:24:00.000Z","end_time":null,"start_price":21000000,"sell_price":22000000,"seller_id":327,"auction_count":1,"auctioneer_win":null,"status":"Người bán hủy đơn hàng","product_name":"Laptop Dell Vostro","auction_time":"5 Ngày"},{"id":32,"start_time":"2023-02-23T16:33:00.000Z","end_time":null,"start_price":5000,"sell_price":7000,"seller_id":327,"auction_count":2,"auctioneer_win":null,"status":"Người bán hủy đơn hàng","product_name":"truyện deremon","auction_time":"7 Ngày"},{"id":33,"start_time":"2023-02-27T16:32:00.000Z","end_time":null,"start_price":5000000,"sell_price":5000000,"seller_id":327,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Mèo tam thể","auction_time":"15 Ngày"},{"id":28,"start_time":"2023-02-23T14:43:00.000Z","end_time":null,"start_price":36000000,"sell_price":36000000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Đồng hồ Thụy Sỹ","auction_time":"10 Ngày"},{"id":30,"start_time":"2023-02-23T16:27:00.000Z","end_time":null,"start_price":80000000,"sell_price":80000000,"seller_id":327,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Bát cổ","auction_time":"15 Ngày"},{"id":34,"start_time":"2023-02-26T16:34:00.000Z","end_time":null,"start_price":50000000,"sell_price":50000000,"seller_id":327,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Tiền số đẹp","auction_time":"15 Ngày"},{"id":38,"start_time":"2023-02-24T01:35:00.000Z","end_time":null,"start_price":500000,"sell_price":600000,"seller_id":327,"auction_count":1,"auctioneer_win":null,"status":"Người bán hủy đơn hàng","product_name":"test","auction_time":"1 Ngày"},{"id":27,"start_time":"2023-02-19T02:03:00.000Z","end_time":null,"start_price":1000000,"sell_price":1100000,"seller_id":319,"auction_count":1,"auctioneer_win":317,"status":"Người bán hủy đơn hàng","product_name":"Tiền số đẹp","auction_time":"1 Phút"},{"id":23,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":50000,"sell_price":50000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"testStarting Auction","auction_time":"5 Ngày"},{"id":6,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":20000,"seller_id":325,"auction_count":198,"auctioneer_win":null,"status":"Không ai mua","product_name":"Tai nghe không biết thương hiệu gì","auction_time":"1 Tháng"},{"id":25,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":50000,"sell_price":51000,"seller_id":319,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"gẻgre","auction_time":"1 Phút"},{"id":1,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":12000000,"sell_price":22000000,"seller_id":319,"auction_count":14,"auctioneer_win":1,"status":"Không ai mua","product_name":"Đồng hồ siêu đẹp","auction_time":"15 Ngày"},{"id":2,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":15000000,"sell_price":29500000,"seller_id":319,"auction_count":16,"auctioneer_win":null,"status":"Không ai mua","product_name":"Laptop Dell Vostro 3500","auction_time":"1 Tháng"},{"id":3,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":18000000,"sell_price":18500005,"seller_id":319,"auction_count":6,"auctioneer_win":null,"status":"Không ai mua","product_name":"Laptop Dell Inspiron 3501","auction_time":"15 Ngày"},{"id":24,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":499000,"sell_price":499001,"seller_id":319,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"Bàn phím cơ Gaming Leaven K550 Blue Switch TKL 87 phím , LED Rainbow ","auction_time":"7 Ngày"},{"id":4,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":18000000,"sell_price":18000000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Xe máy wave","auction_time":"10 Ngày"},{"id":5,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":18000000,"sell_price":22000000,"seller_id":319,"auction_count":4,"auctioneer_win":null,"status":"Không ai mua","product_name":"Tạ 8kg","auction_time":"15 Ngày"},{"id":7,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000000,"sell_price":5000000,"seller_id":325,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Redmi Note 7","auction_time":"10 Ngày"},{"id":10,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":50000,"sell_price":76000,"seller_id":317,"auction_count":26,"auctioneer_win":null,"status":"Không ai mua","product_name":"Chuột không dây logitech","auction_time":"1 Tháng"},{"id":11,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":6000,"seller_id":319,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"Hoa đẹp","auction_time":"1 Phút"},{"id":12,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":5000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Bàn phím cơ k68","auction_time":"1 Phút"},{"id":13,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":5011,"seller_id":319,"auction_count":11,"auctioneer_win":null,"status":"Không ai mua","product_name":"Test","auction_time":"1 Ngày"},{"id":14,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":50000,"sell_price":50000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Combo 10 khoai tây chiên","auction_time":"1 Ngày"},{"id":15,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":6000,"seller_id":319,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"Ốp điện thoại","auction_time":"1 Phút"},{"id":16,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000000,"sell_price":5000000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"tủ lạnh","auction_time":"12 Giờ"},{"id":19,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":5000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"test","auction_time":"1 Phút"},{"id":17,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":5001,"seller_id":319,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"Mũ bảo hiểm","auction_time":"1 Ngày"},{"id":18,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":50000,"sell_price":50000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Lót chuột","auction_time":"3 Giờ"},{"id":20,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":200000,"sell_price":200000,"seller_id":319,"auction_count":0,"auctioneer_win":null,"status":"Không ai mua","product_name":"Áo phao","auction_time":"7 Ngày"},{"id":21,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":6000,"seller_id":319,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"Chăn bông","auction_time":"1 Ngày"},{"id":22,"start_time":"2023-01-05T17:00:00.000Z","end_time":null,"start_price":5000,"sell_price":6000,"seller_id":324,"auction_count":1,"auctioneer_win":null,"status":"Không ai mua","product_name":"fwefwe","auction_time":"1 Phút"}]`))
  const [initialData, setInitialData] = useState([])
  const [currentAuctionId, setCurrentAuctionId] = useState()
  const [currentAuction, setCurrentAuction] = useState({})
  const [openAuctionHistoryDialog, setOpenAuctionHistoryDialog] = useState(false);
  const [auctionHistoryData, setAuctionHistoryData] = useState([]);

  async function getData() {
    let result = await get(`${api_endpoint}/auctions?type=dashboard`, currentUser)
    if (result.status === 200) {
      setData(result.data.data)
      setInitialData(result.data.data)
    }
  }
  const handleSearch = (event) => {
    const dataList = filterTable(event.target.value, initialData, headCells)
    setData(dataList)
  }
  const handleFilterByStatus = (event) => {
    const option = event.target.value
    if(option === -1){
      setData(initialData)
    } else {
      setData(initialData.filter(i=>i.status === AUCTION_STATUS.find(s=>s.value === option).title))
    }
    // const dataList = filterTable(event.target.value, initialData, headCells)
    // setData(dataList)
  }
  async function getAuctionDetail() {
    let result = await get(`${api_endpoint}/auction?id=${currentAuctionId}`, currentUser)
    if (result.status === 200) {
      setCurrentAuction(result.data.data.product)
    }
    result = await get(`${process.env.REACT_APP_API_ENDPOINT}/auction-history?auction_id=${currentAuctionId}`, currentUser)
    if (result.status === 200) {
      setAuctionHistoryData(result.data.data)
    }

  }

  useEffect(() => {
    getAuctionDetail()
  }, [currentAuctionId])
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

  const handleClickOpenAuctionDialog = (id) => {
    setCurrentAuctionId(id)
    setOpenAuctionDialog(true);
  }
  const handleClickOpenAuctionHistoryDialog = () => {
    setOpenAuctionHistoryDialog(true);
  };

  const handleCloseAuctionHistoryDialog = () => {
    setOpenAuctionHistoryDialog(false);
  };

  const handleCloseAuctionDialog = (option) => {
    setOpenAuctionDialog(false);
    if (option) {
      socket.current.emit('auctioneer_confirm', {
        userId: currentUser.id,
        auctionId: currentAuctionId,
        status: option === 'cancel' ? 0 : 1
      })
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <div style={{ margin: '15px 0 0 10px' }}>
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar  fn={handleSearch} fn1={handleFilterByStatus} />
            <TableContainer>
              <Table
                stickyHeader
                sx={{ minWidth: 750, maxHeight: 1000 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data ? data.length : 0}
                />
                <TableBody>
                  {data && data.length && stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow className='sell-table-row'
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            align='center'
                            scope="row"
                            padding="none"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="center" className='product-history-name'>{row.product_name}</TableCell>
                          <TableCell align="center">{row.start_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                          })}</TableCell>
                          <TableCell align="center">{row.sell_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                          })}</TableCell>
                          <TableCell align="center">{moment(row.start_time).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                          <TableCell align="center">{row.auction_time}</TableCell>
                          <TableCell align="center">{row.auction_count}</TableCell>
                          <TableCell align="center">{row.seller_id}</TableCell>
                          <TableCell align="center">{row.auctioneer_win}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell align="center">
                            <InfoIcon style={{ color: "blue", fontSize: "35px" }} onClick={() => handleClickOpenAuctionDialog(row.id)}></InfoIcon>
                            <ChangeCircleIcon style={{ color: "red", fontSize: "35px" }} onClick={() => handleClickOpenAuctionDialog(row.id)}></ChangeCircleIcon>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 15, 25, 500]}
              component="div"
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
        <Dialog open={openAuctionDialog} onClose={handleCloseAuctionDialog} fullWidth={true}
          maxWidth={'lg'}>
          <DialogTitle> Thông tin chi tiết của buổi đấu giá</DialogTitle>
          <DialogContent>
            <div className='auction-popup'>
              {currentAuction.id ?
                <>
                  <div className="auction-view">
                    <div className="img-view">
                      {currentAuction.images.map((image, index) =>
                        <div className="img-item" key={index}>
                          <img
                            src={image.url}
                            alt="" />
                        </div>
                      )}
                    </div>
                    <div className="p1">
                      <div className="p1-item">
                        <div className="title">ID:</div>
                        <div className="content">{currentAuction.id}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Tên sản phẩm:</div>
                        <div className="content">{currentAuction.name}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Loại sản phẩm:</div>
                        <div className="content">{currentAuction.product_category}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Title</div>
                        <div className="content">{currentAuction.title}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Description</div>
                        <div className="content">{currentAuction.description}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Branch</div>
                        <div className="content">{currentAuction.branch || 'Không có'}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Keyword</div>
                        <div className="content">{currentAuction.key_word || 'Không có'}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Chất lượng</div>
                        <div className="content">{currentAuction.status || 'Không có'}</div>
                      </div>

                      <div className="p1-item">
                        <div className="title">Thời gian bắt đầu</div>
                        <div className="content">{moment(currentAuction.start_time).format('DD/MM/YYYY HH:mm:ss')}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Thời gian đấu</div>
                        <div className="content">{AUCTION_TIMES[currentAuction.time]}</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Giá khởi điểm</div>
                        <div className="content">{currentAuction.start_price} VND</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Giá bán</div>
                        <div className="content">{currentAuction.sell_price} VND</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Trạng thái</div>
                        <div className="content">ID</div>
                      </div>
                      <div className="p1-item">
                        <div className="title">ID Người bán</div>
                        <div className="content">{currentAuction.seller_id}
                          <Link style={{ textDecoration: 'none', color: "black" }} to={`/user/${currentAuction.seller_id}`}>
                            <span style={{ color: 'red' }}>Thông tin người bán</span>
                          </Link>
                        </div>
                      </div>
                      <div className="p1-item">
                        <div className="title">Số lượt đấu giá</div>
                        <div className="content">{currentAuction.auction_count} <span onClick={() => handleClickOpenAuctionHistoryDialog()} style={{ color: 'red' }}>Chi tiết lịch sử đấu</span></div>
                      </div>
                    </div>
                  </div>
                </>
                : <></>}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseAuctionDialog('cancel')}>Hủy</Button>
            <Button onClick={() => handleCloseAuctionDialog('confirm')}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAuctionHistoryDialog} onClose={handleCloseAuctionHistoryDialog}>
          <div className="auction-history-dialog">
            <div className="history-dialog-header">Lịch sử đấu giá</div>
            <div className="history-dialog-wrapper">
              <div className="history-dialog-item">
                <div className="history-dialog-stt">STT</div>
                <div className="history-dialog-user" style={{ textAlign: 'center' }}>Người đấu giá</div>
                <div className="history-dialog-amount">Số tiền(VND)</div>
                <div className="history-dialog-time" style={{ textAlign: 'center' }}>Thời gian</div>
              </div>
              {auctionHistoryData && auctionHistoryData.length && auctionHistoryData.map((item, index) => (
                <div key={item.id} className="history-dialog-item">
                  <div className="history-dialog-stt">{auctionHistoryData.length - index}</div>
                  <div className="history-dialog-user">{item.auctioneer_name}</div>
                  <div className="history-dialog-amount">{item.bet_amount}</div>
                  <div className="history-dialog-time">{moment(item.bet_time).format('DD-MM-YYYY HH:mm:ss')}</div>
                </div>
              ))}
            </div>
          </div>
          <DialogActions>
            <Button onClick={handleCloseAuctionHistoryDialog}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
