/* eslint-disable react-hooks/exhaustive-deps */

import './BuyHistory.scss'
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
import moment from 'moment';
import { checkApiResponse } from '../../../utils/checkApiResponse';

function createData(name, calories, fat, carbs, protein, a, b, c) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    a,
    b,
    c
  };
}

const rows = [
  createData(1, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 50000, 120000, 'trungkien2022001', '20-2-2001', 'success'),
  createData(2, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 50000, 120000, 'trungkien2022001', '20-2-2001', 'pending'),
  createData(3, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 50000, 120000, 'trungkien2022001', '20-2-2001', 'cancel'),
  createData(4, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 50000, 120000, 'trungkien2022001', '20-2-2001', 'cancel'),
  createData(5, 'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA', 'Tuổi trẻ đáng giá bao nhiêu - Nguyễn Nhật Ánh', 50000, 120000, 'trungkien2022001', '20-2-2001', 'cancel'),

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
    id: 'product_init_price1',
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
    id: 'b',
    numeric: true,
    disablePadding: false,
    label: 'Ngày đấu',
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

export const BuyHistory = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAuctionDialog, setOpenAuctionDialog] = useState(false);
  const [data, setData] = useState({})
  const [currentAuctionId, setCurrentAuctionId] = useState()

  async function getData() {
    let result = await get(`/auction-purchase-history?user_id=${currentUser.id}`, currentUser)
    if (checkApiResponse(result)) {
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className='dashboard-container'>
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
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
                          <TableCell align="center" className='product-history-name'>{row.name}</TableCell>
                          <TableCell align="center">{row.start_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                          })}</TableCell>
                          <TableCell align="center">{row.sell_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'VND',
                          })}</TableCell>
                          <TableCell align="center">{moment(row.start_time).format('DD-MM-YYYY')}</TableCell>
                          <TableCell align="center">
                            {row.sell_status === 'Thành công' ? <Button className={row.c} color='success' variant="contained">{row.sell_status}</Button> : <></>}
                            {row.sell_status === 'Người mua hủy đơn hàng' || row.sell_status === 'Người mua hủy đơn hàng'? <Button className="cancel" color='error' variant="contained">{row.sell_status}</Button> : <></>}
                            {row.sell_status === 'Chờ người bán xác nhận' ? <Button className={row.c} color='warning' variant="contained">{row.sell_status}</Button> : <></>}
                            {row.sell_status === 'Chờ người đấu xác nhận' ? <Button className={row.c} onClick={() => {handleClickOpenAuctionDialog(); setCurrentAuctionId(row.id)}} color='warning' variant="contained">{row.sell_status}</Button> : <></>}
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
    </div>
  );
}
