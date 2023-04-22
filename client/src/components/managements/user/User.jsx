/* eslint-disable react-hooks/exhaustive-deps */

import './User.scss'
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
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { get } from '../../../utils/customRequest';
import moment from 'moment';
import { USER_STATUS } from '../../../utils/constants';

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
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'role',
    numeric: true,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Ngày tạo',
  },
  {
    id: 'is_verify',
    numeric: true,
    disablePadding: false,
    label: 'Xác thực',
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

export const User = ({ currentUser, socket }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openUserDialog, setOpenUserDialog] = useState(true);
  const [data, setData] = useState({})
  const [currentUserId, setCurrentUserId] = useState()

  async function getData() {
    let result = await get(`${api_endpoint}/users`, currentUser)
    if (result.status === 200) {
      setData(result.data.users)
    }
    console.log(result.data.users)
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

  const handleClickOpenUserDialog = (user_id) => {
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = (option) => {
    setOpenUserDialog(false);
    if (option) {
      socket.current.emit('Usereer_confirm', {
        userId: currentUser.id,
        UserId: currentUserId,
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
                          <TableCell align="center" className='product-history-name'>{row.name}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="center">{row.rating}</TableCell>
                          <TableCell align="center">{row.role_id}</TableCell>
                          <TableCell align="center">{moment(row.created_at).format('DD-MM-YYYY')}</TableCell>
                          <TableCell align="center">{row.is_verified ? "Verified" : "Not Verified"}</TableCell>
                          <TableCell align="center">{USER_STATUS[row.is_blocked]}</TableCell>
                          <TableCell align="center">
                            <InfoIcon style={{ color: "blue" }} onClick={() => handleClickOpenUserDialog(row.id)}></InfoIcon>
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
              rowsPerPageOptions={[8, 15, 25, 500]}
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
        <Dialog
          open={openUserDialog}
          onClose={handleCloseUserDialog}
          fullWidth={true}
          maxWidth={'lg'}>
          <DialogTitle> Thông tin chi tiết của người dùng</DialogTitle>
          <DialogContent>
            <div className='user-popup'>
              <div className="user-view">
                <div className="avatar">
                  <img
                    src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                    alt="" />
                </div>
                <div className="u-info">
                 <div className="u-p1">
                  <div className="u-p1-id">
                      <div className="title">ID</div>
                      <div className="content">15</div>
                  </div>
                  <div className="u-p1-name">
                      <div className="title">Name</div>
                      <div className="content">Kien</div>
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseUserDialog()}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
