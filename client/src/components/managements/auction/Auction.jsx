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
import { get, post } from '../../../utils/customRequest';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AUCTION_STATUS, AUCTION_TIMES } from '../../../utils/constants';
import { filterTable } from '../../../utils/filterTable';
import { checkApiResponse } from '../../../utils/checkApiResponse';
import { Loading } from '../../loading/Loading';

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
        {AUCTION_STATUS.map((item, index) =>
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

export const Auction = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [data, setData] = useState([])
  // const [cnt, setCnt] = useState([])
  const [initialData, setInitialData] = useState([])
  const [status, setStatus] = useState(-1)
  const [currentAuctionId, setCurrentAuctionId] = useState()
  const [currentAuction, setCurrentAuction] = useState({})
  const [openAuctionHistoryDialog, setOpenAuctionHistoryDialog] = useState(false);
  const [auctionHistoryData, setAuctionHistoryData] = useState([]);
  const [loading, setLoading] = useState(true)

  if (!currentUser.role.dashboard_auction) {
    window.location.href = `/management/dashboard`
  }

  async function getData(stt) {
    setLoading(true)
    let result = await post(`/auctions?type=dashboard&status=${stt}&limit=100`, {}, currentUser)
    if (checkApiResponse(result)) {
      setData(result.data.data.products)
      setInitialData(result.data.data.products)
    }
    setLoading(false)
  }
  const handleSearch = (event) => {
    const dataList = filterTable(event.target.value, initialData, headCells)
    setData(dataList)
  }
  const handleFilterByStatus = (event) => {
    const option = event.target.value
    setStatus(option)
    // if (option === -1) {
    //   setData(initialData)
    // } else {
    //   setData(initialData.filter(i => i.status === option))
    // }
    // const dataList = filterTable(event.target.value, initialData, headCells)
    // setData(dataList)
  }
  async function getAuctionDetail() {
    let result = await post(`/api/v1/auction/${currentAuctionId}`, {}, currentUser)
    if (checkApiResponse(result)) {
      setCurrentAuction(result.data.data)
    }
    result = await get(`/auction-history?auction_id=${currentAuctionId}`, currentUser)
    if (checkApiResponse(result)) {
      setAuctionHistoryData(result.data.data)
    }

  }

  useEffect(() => {
    if (currentAuctionId) {
      getAuctionDetail()
    }
  }, [currentAuctionId])
  useEffect(() => {

    getData(status)
  }, [status])
  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateUI', () => {
        // getData()
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
            <EnhancedTableToolbar fn={handleSearch} fn1={handleFilterByStatus} />
            {
              !loading ?
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
                      {Array.isArray(data) && stableSort(data, getComparator(order, orderBy))
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
                  <TablePagination
                    rowsPerPageOptions={[7, 15, 25, 500]}
                    component="div"
                    count={data ? data.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
                : <Loading></Loading>
            }
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
                  <div className="auction-view1">
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
                  <div className="history-dialog-amount">{new Intl.NumberFormat('VIE', { style: 'currency', currency: 'VND' }).format(parseInt(item.bet_amount))}</div>
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
