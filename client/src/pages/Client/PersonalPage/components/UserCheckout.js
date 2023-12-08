import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, Button, Stack, Tooltip } from '@mui/material';
import {
  USER_INFO_KEY,
  FORMAT_NUMBER,
  ORDER_STATUS,
} from '../../../../utils/contants';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ViewDataDrawer from './CheckoutDrawer';
import { parseJSON, dateTimeConverter } from '../../../../utils/helpers';
import { productAPI } from '../../../../services/productAPI';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomPopover from '../../../../components/CustomPopover';
import { toast } from 'react-toastify';

const columns = [
  { id: 'checkout_date', label: 'Ngày đặt hàng', width: 200, align: 'center' },
  { id: 'total_price', label: 'Tổng giá tiền', width: 200, align: 'right' },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Thao tác',
    minWidth: 170,
    align: 'center',
  },
];

export default function UserCheckout() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [listProduct, setListProduct] = useState([]);
  const [visibleViewDataDrawer, setVisibleViewDataDrawer] = useState(false);
  const [viewData, setViewData] = useState({});
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});
  const [popoverId, setPopoverId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getListProduct = async () => {
    const getListRes = await productAPI.getCheckoutByUserId(userData?._id);
    if (getListRes?.success) {
      setListProduct(getListRes?.payload);
    }
  };

  useEffect(() => {
    getListProduct();
  }, []);

  const displayStatus = (status) => {
    if (status === ORDER_STATUS.CANCEL) {
      return (
        <Alert badgeContent={4} color='error' icon={false}>
          Đã huỷ
        </Alert>
      );
    } else if (status === ORDER_STATUS.CONFIRM) {
      return (
        <Alert badgeContent={4} color='warning' icon={false}>
          Đặt hàng thành công
        </Alert>
      );
    } else if (status === ORDER_STATUS.SHIPPING) {
      return (
        <Alert badgeContent={4} color='primary' icon={false}>
          Đang giao hàng
        </Alert>
      );
    } else if (status === ORDER_STATUS.DELIVERED) {
      return (
        <Alert badgeContent={4} color='success' icon={false}>
          Đã giao hàng
        </Alert>
      );
    }
  };

  const handleCancelOrder = async (checkoutId) => {
    try {
      const res = await productAPI.changeCheckoutStatus(ORDER_STATUS.CANCEL, checkoutId);
      if (res?.success) {
        setPopoverId('')
        getListProduct();
        toast.success("Huỷ đơn đặt hàng thành công");
      } else {
        toast.error("Huỷ đơn đặt hàng thất bại");
      }
    } catch (error) {
      toast.error("Huỷ đơn đặt hàng thất bại");
    }
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listProduct
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'action' ? (
                              <Stack
                                flexDirection={'row'}
                                justifyContent='center'
                              >
                                {/*View detail*/}
                                <Button
                                  sx={{
                                    height: '30px',
                                    padding: 0,
                                    width: 'fit-content',
                                    minWidth: '30px',
                                  }}
                                  variant='text'
                                  color='success'
                                  onClick={() => {
                                    setViewData(row);
                                    setVisibleViewDataDrawer(true);
                                  }}
                                >
                                  <Tooltip title='Xem chi tiết' placement='top'>
                                    <RemoveRedEyeIcon />
                                  </Tooltip>
                                </Button>

                                {/*Cancel*/}
                                {row?.status === ORDER_STATUS.CONFIRM ? (
                                  <CustomPopover
                                    open={popoverId === row?._id}
                                    onClose={() => setPopoverId('')}
                                    handleSubmit={() =>
                                      handleCancelOrder(row?._id)
                                    }
                                    noti='Bạn có chắc chắn muốn huỷ đơn hàng?'
                                  >
                                    <Button
                                      sx={{
                                        height: '30px',
                                        padding: 0,
                                        width: 'fit-content',
                                        minWidth: '30px',
                                      }}
                                      variant='text'
                                      color='success'
                                      onClick={() => {
                                        setPopoverId(row?._id);
                                      }}
                                    >
                                      <Tooltip
                                        title='Huỷ đơn hàng'
                                        placement='top'
                                      >
                                        <CancelIcon sx={{ color: 'red' }} />
                                      </Tooltip>
                                    </Button>
                                  </CustomPopover>
                                ) : null}
                              </Stack>
                            ) : column.id === 'checkout_date' ? (
                              <div style={{ fontWeight: 700 }}>
                                {dateTimeConverter(value)}
                              </div>
                            ) : column.id === 'checkout_id' ? (
                              <div
                                style={{
                                  textAlign: 'center',
                                  color: 'red',
                                  fontWeight: 'bold',
                                }}
                              >
                                {value}
                              </div>
                            ) : column.id === 'total_price' ? (
                              <div
                                style={{ fontWeight: 700, color: '#F74F06' }}
                              >
                                {FORMAT_NUMBER.format(value)} đ
                              </div>
                            ) : column.id === 'status' ? (
                              displayStatus(value, row?.checkout_id)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component='div'
          count={listProduct.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {visibleViewDataDrawer && (
        <ViewDataDrawer
          visible={visibleViewDataDrawer}
          onClose={() => setVisibleViewDataDrawer(false)}
          viewData={viewData}
        />
      )}
    </>
  );
}
