import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Alert, Typography } from "@mui/material";
import { dateTimeConverter } from "../../../../../utils/helpers";
import { FORMAT_NUMBER } from "../../../../../utils/contants";

export default function Orders(props) {
  const { orderData } = props;

  const displayStatus = (status) => {
    let statusProperties = {
      0: {
        text: "Đã huỷ",
        color: "error",
      },
      1: {
        text: "Đặt hàng thành công",
        color: "warning",
      },
      2: {
        text: "Đang giao hàng",
        color: "primary",
      },
      3: {
        text: "Đã giao hàng",
        color: "success",
      },
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Alert
          badgeContent={4}
          color={statusProperties[status].color}
          icon={false}
          sx={{
            cursor: "pointer",
            maxWidth: "200px",
            width: "200px",
            textAlign: "center",
          }}
        >
          {statusProperties[status].text}
        </Alert>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Đơn đặt hàng
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Ngày đặt hàng</TableCell>
            <TableCell align="right">Tổng giá tiền</TableCell>
            <TableCell align="center" style={{ maxWidth: "200px" }}>
              Trạng thái
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((row) => (
            <TableRow
              key={`dashboard-checkout-${row?._id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {dateTimeConverter(row.checkout_date)}
              </TableCell>
              <TableCell align="right">
                {FORMAT_NUMBER.format(row.total_price)} VNĐ
              </TableCell>
              <TableCell align="center">{displayStatus(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
