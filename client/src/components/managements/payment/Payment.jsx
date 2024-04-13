/* eslint-disable react-hooks/exhaustive-deps */

import './Payment.scss'
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { Button } from '@mui/material';
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

import { visuallyHidden } from '@mui/utils';
import { MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import {post } from '../../../utils/customRequest';
import moment from 'moment';
import { filterTable } from '../../../utils/filterTable';
import { checkApiResponse } from '../../../utils/checkApiResponse';
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'

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
    label: 'Payment ID',
  },
  {
    id: 'auction_id',
    disablePadding: false,
    label: 'Auction ID',
  },
  {
    id: 'user_id',
    disablePadding: false,
    label: 'User ID',
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'User Email',
  },
  {
    id: 'ype',
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'amount',
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'currency',
    disablePadding: false,
    label: 'Currency',
  },
  {
    id: 'created_at',
    disablePadding: false,
    label: 'Created At',
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

const CustomPopover = ({ content, trigger }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (v) => {
      setVisible(!visible);
  };

  return (
      <div style={{ position: 'relative', display: 'inline-block', marginRight: "5px" }}>
          <span onClick={()=>handleClick(true)} style={{ cursor: 'pointer' }}>
              {trigger}
          </span>
          {visible && (
              <div style={{ position: 'absolute', top: '100%', right: -350, zIndex: 999, border: "3px solid #ccc", backgroundColor: "#fff"}}>
                <div>
                  {content}
                </div>
              <Button onClick={()=>handleClick(false)} style={{ width: "100%"}}  variant="contained">Xong</Button>
              </div>
          )}
      </div>
  );
};

function EnhancedTableToolbar(props) {
  const { numSelected, fn, fn1, fn2, dates } = props;

  return (
    <Toolbar
      style={{ paddingTop: "20px" }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
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
       <CustomPopover
            trigger={
              <Button style={{height: "56px"}} variant="outlined">Date</Button>
            }
            content={ <DateRangePicker
              ranges={[dates.selection]}
              moveRangeOnFirstSelection={false}
              onChange={fn2}
              months={2}
              maxDate={new Date()}
              direction="horizontal"
            />}
        />
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
          <MenuItem value={'auction_create_fee'}>auction_create_fee</MenuItem>
          <MenuItem value={'auction_raise_fee'}>auction_raise_fee</MenuItem>
          <MenuItem value={'auction_success_fee'}>auction_success_fee</MenuItem>
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

export const Payment = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [dates, setDates] = useState( {selection: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}})
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState([])

  if (!currentUser.role.dashboard_action_log) {
    window.location.href = `/management/dashboard`
  }

  async function getData(d) {
    let result = await post(`/payment/admin`, {
      "dates": d,
   }, currentUser)
    if (checkApiResponse(result)) {
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
      setData(initialData.filter(i=>i.type === option))
    }
  }
  useEffect(() => {

    getData([moment().format('YYYY-MM-DD')])
  }, [])

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate, 'day')) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
    }

    return dates;
}
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

  const dateRangeSelect = ranges => {
    
    setDates(ranges)
    getData(getDates(ranges.selection.startDate, ranges.selection.endDate))
  }

  return (
    <div style={{ margin: '15px 0 0 10px' }}>
      <div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar fn={handleSearch} fn1={handleFilterByStatus} fn2 = {dateRangeSelect} dates={dates} />
            <TableContainer>
              <Table
                stickyHeader
                sx={{ minWidth: 750, maxHeight: 3000 }}
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
                        <TableRow className='sell-table-row big-row'
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          sx={{ maxHeight: 100, overflowY: 'hidden' }}
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
                          <TableCell align="center">{row.auction_id}</TableCell>
                          <TableCell align="center">{row.user_id}</TableCell>
                          <TableCell align="center" className='small-cell'>{row.email}</TableCell>
                          <TableCell align="center" className='small-cell'>{row.type}</TableCell>
                          <TableCell align="center" className='small-cell'>{row.amount}</TableCell>
                          <TableCell align="center">
                              {row.currency}
                          </TableCell>
                          <TableCell align="center" className='small-cell'>{moment(row.created_at).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
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
      </div>
    </div>
  );
}
