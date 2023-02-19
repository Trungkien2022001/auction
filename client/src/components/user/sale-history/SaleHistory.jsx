/* eslint-disable react-hooks/exhaustive-deps */

import './SaleHistory.scss'
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import moment from 'moment'

function createData(name, calories, fat, d, e, f, g, h, i, carbs, protein, a, b, c) {
  return {
    name,
    calories,
    fat,
    carbs,
    d, e, f, g, h, i,
    protein,
    a,
    b,
    c
  };
}

const rows = [
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 'Chà nèo', 'Đồng hồ', 'Còn mới', 1, 50000, 120000, '16:00:00 20-2-2001', '1h', 'success'),
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 'Chà nèo', 'Đồng hồ', 'Còn mới', 1, 50000, 120000, '16:00:00 20-2-2001', '1h', 'pending'),
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 'Chà nèo', 'Đồng hồ', 'Còn mới', 1, 50000, 120000, '16:00:00 20-2-2001', '1h', 'processing'),
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 'Chà nèo', 'Đồng hồ', 'Còn mới', 1, 50000, 120000, '16:00:00 20-2-2001', '1h', 'waiting'),
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 'Chà nèo', 'Đồng hồ', 'Còn mới', 1, 50000, 120000, '16:00:00 20-2-2001', '1h', 'failed'),
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 'Chà nèo', 'Đồng hồ', 'Còn mới', 1, 50000, 120000, '16:00:00 20-2-2001', '1h', 'cancel'),

];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: 'product_image',
    numeric: true,
    disablePadding: false,
    label: 'Hình ảnh',
  },
  {
    id: 'product_name',
    numeric: true,
    disablePadding: false,
    label: 'Tên sản phẩm',
  },
  {
    id: 'product_name',
    numeric: true,
    disablePadding: false,
    label: 'Thương hiệu',
  },
  {
    id: 'product_name',
    numeric: true,
    disablePadding: false,
    label: 'Tình trạng',
  },
  {
    id: 'product_name',
    numeric: true,
    disablePadding: false,
    label: 'Danh mục',
  },
  {
    id: 'product_init_price',
    numeric: true,
    disablePadding: false,
    label: 'Giá ban đầu',
  },
  {
    id: 'product_sell_price',
    numeric: false,
    disablePadding: false,
    label: 'Giá bán',
  },
  {
    id: 'a',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian bắt đầu',
  },
  {
    id: 'b',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian đấu',
  },
  {
    id: 'c',
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái',
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
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Lịch sử giao dịch
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const api_endpoint = process.env.REACT_APP_API_ENDPOINT
export const SaleHistory = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [data, setData] = useState({})
  const [currentAuctionId, setCurrentAuctionId] = useState()

  async function getData() {
    let result = await get(`${api_endpoint}/auction-sell-history?user_id=${currentUser.id}`, currentUser)
    if (result.status === 200) {
      setData(result.data.result)
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

  const handleClickOpenAuctionDialog = () => {
    setOpenAuctionDialog(true);
  };

  const handleCloseAuctionDialog = (option) => {
    setOpenAuctionDialog(false);
    if(option){
      socket.emit('seller_comnfirm', {
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className='dashboard-container'>
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table
                stickyHeader
                sx={{ minWidth: 750, maxHeight: 600 }}
                aria-labelledby="tableTitle"
                aria-label="sticky table"
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
                        // height='200px'
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
                          <TableCell align="center">
                            <img className='product-sell-image' src={row.image} alt='product_image' /></TableCell>
                          <TableCell align="left" className='product-history-name'>{row.name}</TableCell>
                          <TableCell align="left">{row.branch || 'Không có'}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell align="center">{row.category}</TableCell>
                          <TableCell align="center">{row.start_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                          })}</TableCell>
                          <TableCell align="center">{row.sell_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                          })}</TableCell>
                          <TableCell align="center">{moment(row.start_time).format('DD-MM-YYYY')}</TableCell>
                          <TableCell align="center">{row.auction_time}</TableCell>
                          <TableCell align="center">
                            {row.auction_status === 5 ? <Button color='success' variant="contained">Thành công</Button> : <></>}
                            {row.auction_status === 6 ? <Button color='error' variant="contained">Chả ai mua</Button> : <></>}
                            {row.auction_status === 3? <Button onClick={() => {handleClickOpenAuctionDialog(); setCurrentAuctionId(row.id)}} color='warning' variant="contained">Chờ xác nhận</Button> : <></>}
                            {row.auction_status === 4? <Button  color='warning' variant="contained">Chờ người mua xác nhận</Button> : <></>}
                            {row.auction_status === 2 ? <Button variant="contained">Đang đấu giá</Button> : <></>}
                            {row.auction_status === 1 ? <Button color='secondary' variant="contained">Sắp đấu giá</Button> : <></>}
                            {[7,8].includes(row.auction_status) ? <Button color='secondary' variant="contained">Đã hủy</Button> : <></>}
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
              rowsPerPageOptions={[5, 10, 25]}
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
      </div>
      <Dialog open={openAuctionDialog} onClose={handleCloseAuctionDialog}>
        <DialogTitle>Xác nhận phiên đấu giá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Phiên đấu giá đã thành công, vui lòng xác nhận hoặc hủy đơn hàng này
          </DialogContentText>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Xác nhận" />
            <FormControlLabel value="male" control={<Radio />} label="Hủy" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleCloseAuctionDialog('cancel')}>Hủy</Button>
          <Button onClick={()=>handleCloseAuctionDialog('confirm')}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
