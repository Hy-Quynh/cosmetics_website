import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FORMAT_NUMBER } from "../../../../utils/contants";
import CloseIcon from "@mui/icons-material/Close";
import { productAPI } from "../../../../services/productAPI";
import { dateTimeConverter } from "../../../../utils/helpers"; 

export default function ViewDataDrawer({ visible, onClose, viewData }) {
  const [listCheckoutProduct, setListCheckoutProduct] = useState([]);

  const getListCheckoutProduct = async () => {
    try {
      const productRes = await productAPI.getCheckoutById(viewData?._id);
      if (productRes?.success)
        setListCheckoutProduct(productRes?.payload);
    } catch (error) {
      console.log("get list checkout product error >>>>> ", error);
    }
  };

  useEffect(() => {
    getListCheckoutProduct();
  }, []);

  return (
    <React.Fragment key="right">
      <Drawer
        anchor="right"
        open={visible}
        onClose={() => onClose()}
        sx={{
          ".css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
            maxWidth: "1050px !important",
          },
        }}
      >
        <Box sx={{ width: "100%", paddingTop: "80px" }}>
          <Stack justifyContent={"start"} flexDirection={"row"}>
            <Box sx={{ width: "50%" }}>
              <Button onClick={() => onClose()}>
                <CloseIcon />
              </Button>
            </Box>
            <Box sx={{ width: "50%", fontSize: "20px", fontWeight: 700 }}>
              Thông tin sản phẩm
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Stack
          flexWrap="nowrap"
          flexDirection={"row"}
          alignItems="center"
          justifyContent="flex-start"
          style={{ marginBottom: "10px", padding: "20px 20px 0 20px" }}
        >
          <Box sx={{ color: "#1876D1" }}>Địa chỉ giao hàng:&nbsp;&nbsp; </Box>
          <Box>{viewData?.user_address}</Box>
        </Stack>
        <Stack
          flexWrap="nowrap"
          flexDirection={"row"}
          alignItems="center"
          justifyContent="flex-start"
          style={{ marginBottom: "10px", padding: "20px 20px 0 20px" }}
        >
          <Box sx={{ color: "#1876D1" }}>
            Phương thức lấy hàng:&nbsp;&nbsp;{" "}
          </Box>
          <Box>
            {viewData?.pickup_method === "SHIP" ? "Giao tận nơi" : "Tự đến lấy"}
          </Box>
        </Stack>
        {viewData?.pickup_method !== "SHIP" ? (
          <Stack
            flexWrap="nowrap"
            flexDirection={"row"}
            alignItems="center"
            justifyContent="flex-start"
            style={{ marginBottom: "20px", padding: "20px 20px 0 20px" }}
          >
            <Box sx={{ color: "#1876D1" }}>Ngày lấy hàng:&nbsp;&nbsp; </Box>
            <Box>{dateTimeConverter(viewData?.pickup_date)}</Box>
          </Stack>
        ) : (
          <></>
        )}
        <Box sx={{ width: "100%", padding: "20px" }}>
          <TableContainer component={Paper} sx={{overflowX: 'auto'}}>
            <Table sx={{ overflowX: 'auto' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Hình ảnh</TableCell>
                  <TableCell align="left" width={100}>Tên sản phẩm</TableCell>
                  <TableCell align="right" width={100}>Số lượng</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right" width={200}>Giá khuyến mãi</TableCell>
                  <TableCell align="right">Tổng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCheckoutProduct.map((row, index) => (
                  <TableRow
                    key={row?.product_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={row?.proudct_image}
                        style={{
                          width: "150px",
                          height: "150px",
                          margin: "0 auto",
                        }}
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="left">{row?.product_name}</TableCell>
                    <TableCell align="right">{row?.product_quanlity}</TableCell>
                    <TableCell align="right">
                      {FORMAT_NUMBER.format(row?.product_price)}
                    </TableCell>
                    <TableCell align="right">
                      {FORMAT_NUMBER.format(row?.product_sale)}
                    </TableCell>
                    <TableCell align="right">
                      {FORMAT_NUMBER.format(
                        Number(
                          row?.product_sale > 0
                            ? row?.product_sale
                            : row?.product_price
                        ) * Number(row?.product_quanlity)
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
