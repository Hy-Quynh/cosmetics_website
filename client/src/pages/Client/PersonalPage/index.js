import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import UserCheckout from "./components/UserCheckout";
import { userAPI } from "../../../services/userAPI";
import { parseJSON, isVietnamesePhoneNumber, validateEmail } from "../../../utils/helpers"; 
import { USER_INFO_KEY } from "../../../utils/contants";
import { Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PersonalPage() {
  const [userInfo, setUserInfo] = useState({});
  const [historyTab, setHistoryTab] = useState(0);
  const navigate = useNavigate();
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY))

  const getUserData = async () => {
    try {
      const userRes = await userAPI.getUserInfo(userData?._id);

      if (userRes?.success) {
        setUserInfo(userRes?.payload);
      }
    } catch (error) {
      console.log("get user data error: ", error);
    }
  };

  const handleUpdateUserInfo = async () => {
    try {
      if (
        userInfo?.phone_number?.trim()?.length &&
        !isVietnamesePhoneNumber(userInfo?.phone_number)
      ) {
        return toast.error("Số diện thoại không đúng định dạng");
      }

      if (
        userInfo?.email?.trim()?.length &&
        !validateEmail(userInfo?.email)
      ) {
        return toast.error("Email không hợp lệ");
      }

      const userRes = await userAPI.updateUserInfo({
        ...userInfo,
        id: userData?._id,
      });

      if (userRes?.success) {
        localStorage.setItem(
          USER_INFO_KEY,
          JSON.stringify({
            ...userInfo,
            _id: userData?._id,
            type: 'user'
          })
        );

        toast.success("Cập nhật thông tin thành công");
      } else {
        toast.error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      console.log("update user data error: ", error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div
        className="container-fluid page-header wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <h1 className="display-3 mb-3 animated slideInDown">Trang cá nhân</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a className="text-body" href="/">
                  Trang chủ
                </a>
              </li>
              <li
                className="breadcrumb-item text-dark active"
                aria-current="page"
              >
                Trang cá nhân
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <Box
        sx={{
          paddingLeft: "50px",
          paddingRight: "50px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Stack
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <TextField
                  label="Họ"
                  id="post-title"
                  variant="filled"
                  style={{ marginTop: 11, textAlign: "left", width: "48%" }}
                  value={userInfo?.first_name}
                  sx={{
                    ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                      marginTop: "12px",
                    },
                  }}
                  onChange={(event) =>
                    setUserInfo({
                      ...userInfo,
                      first_name: event.target.value,
                    })
                  }
                />
                <TextField
                  label="Tên"
                  id="post-title"
                  variant="filled"
                  style={{ marginTop: 11, textAlign: "left", width: "48%" }}
                  value={userInfo?.last_name}
                  sx={{
                    ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                      marginTop: "12px",
                    },
                  }}
                  onChange={(event) =>
                    setUserInfo({
                      ...userInfo,
                      last_name: event.target.value,
                    })
                  }
                />
              </div>

              <TextField
                label="Email"
                defaultValue=""
                id="contact-address"
                variant="filled"
                style={{ marginTop: 11, width: "100%" }}
                value={userInfo.email}
                sx={{
                  ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                    marginTop: "12px",
                  },
                }}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, email: event.target.value });
                }}
              />

              <TextField
                label="Địa chỉ"
                defaultValue=""
                id="contact-address"
                variant="filled"
                style={{ marginTop: 11, width: "100%" }}
                value={userInfo.address}
                sx={{
                  ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                    marginTop: "12px",
                  },
                }}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, address: event.target.value });
                }}
              />
              <TextField
                label="Số điện thoại"
                defaultValue=""
                id="contact-address"
                variant="filled"
                style={{ marginTop: 11, width: "100%" }}
                value={userInfo.phone_number}
                sx={{
                  ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                    marginTop: "12px",
                  },
                }}
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    phone_number: event.target.value,
                  });
                }}
              />
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  variant="contained"
                  sx={{ color: "white !important" }}
                  onClick={() => handleUpdateUserInfo()}
                >
                  Cập nhật
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={7}>
            <Tabs
              value={historyTab}
              onChange={(event, newValue) => setHistoryTab(newValue)}
              aria-label="disabled tabs example"
            >
              <Tab label="Lịch sử đặt hàng" />
            </Tabs>

            {historyTab === 0 ? (
              <div style={{marginTop: '20px'}}>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    marginBottom: "12px",
                    fontWeight: 700,
                  }}
                >
                  LỊCH SỬ ĐẶT HÀNG
                </div>
                <UserCheckout />
              </div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
