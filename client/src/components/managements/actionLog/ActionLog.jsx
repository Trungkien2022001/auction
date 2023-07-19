/* eslint-disable react-hooks/exhaustive-deps */

import './ActionLog.scss'
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
import FilterListIcon from '@mui/icons-material/FilterList';
// import InfoIcon from '@mui/icons-material/Info';
// import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { visuallyHidden } from '@mui/utils';
import { MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import { AUCTION_STATUS } from '../../../utils/constants';
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
    id: 'mothod',
    disablePadding: false,
    label: 'Method',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'path',
    disablePadding: false,
    label: 'Path',
  },
  {
    id: 'user',
    disablePadding: false,
    label: 'User',
  },
  {
    id: 'client_ip',
    disablePadding: false,
    label: 'Client IP',
  },
  {
    id: 'request',
    disablePadding: false,
    label: 'Request',
  },
  {
    id: 'response',
    disablePadding: false,
    label: 'Response',
  },
  {
    id: 'error',
    disablePadding: false,
    label: 'Error',
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

function EnhancedTableToolbar(props) {
  const { numSelected, fn, fn1 } = props;

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

const api_endpoint = process.env.REACT_APP_API_ENDPOINT

export const ActionLog = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState([])
  async function getData() {
    let result = await get(`${api_endpoint}/logs`, currentUser)
    if (result.status === 200) {
      setData(result.data.body)
      setInitialData(result.data.body)
    }
  }
  const handleSearch = (event) => {
    const dataList = filterTable(event.target.value, initialData, headCells)
    setData(dataList)
  }
  const handleFilterByStatus = (event) => {
    // const option = event.target.value
    // if(option === -1){
    //   setData(initialData)
    // } else {
    //   setData(initialData.filter(i=>i.status === AUCTION_STATUS.find(s=>s.value === option).title))
    // }
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
                          <TableCell align="center">{row.method}</TableCell>
                          <TableCell align="center">{row.status}</TableCell>
                          <TableCell align="center" className='small-cell'>{row.path}</TableCell>
                          <TableCell align="center" className='small-cell'>{row.user}</TableCell>
                          <TableCell align="center" className='small-cell'>{row.client_ip}</TableCell>
                          <TableCell align="center" className='big-cell1'>{row.request}</TableCell>
                          <TableCell align="center" className='big-cell'>{row.response}</TableCell>
                          <TableCell align="center" className='big-cell1'>{row.error}</TableCell>
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
