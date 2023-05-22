import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Alert, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box } from "@mui/system";
import ViewUserDrawer from "./components/ViewUserDrawer";
import { toast } from "react-toastify";
import AddManagerModal from "./components/AddManagerModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomPopover from "../../../components/CustomPopover";
import ChangeStatusPopover from "./components/ChangeStatusPopover";
import { userAPI } from "../../../services/userAPI";

const userColumns = [
  { id: "stt", label: "Số thứ tự", minWidth: 170 },
  { id: "name", label: "Tên", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "phone_number",
    label: "SĐT",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Thao tác",
  },
];

const adminColumns = [
  { id: "stt", label: "Số thứ tự", minWidth: 170 },
  { id: "name", label: "Tên", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "phone_number",
    label: "SĐT",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Thao tác",
  },
];

export default function AdminAccount() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentTab, setCurrentTab] = useState("user");
  const [tableData, setTableData] = useState([]);
  const [viewUserData, setViewUserData] = useState({});
  const [visibleUserDrawer, setVisibleUserDrawer] = useState(false);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [popoverId, setPopoverId] = useState("");
  const [changeStatusPopoverId, setChangeStatusPopoverId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllUserData = async () => {
    setTableData([]);
    const accountRes = await userAPI.getAllUser(currentTab);
    if (accountRes?.payload?.user?.length) {
      setTableData(accountRes?.payload?.user);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, [currentTab]);

  const handleCreateManager = async (managerData) => {
    const { address, email, firstName, lastName, password, phone } =
      managerData;
    const createData = {
      firstName,
      lastName,
      email: email,
      phone_number: phone,
      address: address,
      password: password,
      type: "admin",
    };
    const createRes = await userAPI.createNewUser(createData);
    if (createRes?.success) {
      getAllUserData();
      setVisibleAddModal(false);
      toast.success("Thêm mới nhân viên quản lí thành công");
      return { success: true };
    } else {
      toast.error("Thêm mới nhân viên quản lí thất bại");
      return createRes;
    }
  };

  const handleChangeUserStatus = async (status, userId) => {
    const changeStatusRes = await userAPI.changeUserStatus(
      status,
      userId,
      currentTab
    );

    if (changeStatusRes?.success) {
      getAllUserData();
      toast.success("Cập nhật trạng thái thành công");
      setPopoverId("");
    } else {
      toast.error(
        changeStatusRes?.error?.message || "Cập nhật trạng thái thất bại"
      );
    }
  };

  const handleDeleteAccount = async (userId) => {
    const deleteRes = await userAPI.deleteUser(userId, currentTab);

    if (deleteRes?.success) {
      getAllUserData();
      toast.success("Xoá tài khoản thành công");
      setPopoverId("");
    } else {
      toast.error(deleteRes?.error?.message || "Xoá tài khoản thất bại");
    }
  };

  const displayStatus = (status, userId) => {
    if (status === 0) {
      return (
        <ChangeStatusPopover
          visible={changeStatusPopoverId === userId}
          onClose={() => setChangeStatusPopoverId("")}
          currentStatus={status}
          handleSubmit={(selectStatus) => {
            handleChangeUserStatus(selectStatus, userId);
            return;
          }}
        >
          <Alert
            color="error"
            icon={false}
            onClick={() => setChangeStatusPopoverId(userId)}
            sx={{ cursor: "pointer" }}
          >
            Vô hiệu hoá
          </Alert>
        </ChangeStatusPopover>
      );
    } else if (status === 1) {
      return (
        <ChangeStatusPopover
          visible={changeStatusPopoverId === userId ? true : false}
          onClose={() => setChangeStatusPopoverId("")}
          currentStatus={status}
          handleSubmit={(selectStatus) => {
            handleChangeUserStatus(selectStatus, userId);
            return;
          }}
        >
          <Alert
            color="success"
            icon={false}
            sx={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => setChangeStatusPopoverId(userId)}
          >
            Hoạt động
          </Alert>
        </ChangeStatusPopover>
      );
    }
  };

  return (
    <>
      <Stack
        flexWrap={"nowrap"}
        flexDirection="row"
        justifyContent={"space-between"}
        sx={{ marginBottom: "20px" }}
      >
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          Quản lí tài khoản
        </Typography>
        <div>
          <Button variant="contained" onClick={() => setVisibleAddModal(true)}>
            Thêm mới
          </Button>
        </div>
      </Stack>
      <Box sx={{ marginBottom: "10px" }}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="user" label="Khách hàng" />
          <Tab value="admin" label="Nhân viên" />
        </Tabs>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {(currentTab === "user" ? userColumns : adminColumns)?.map(
                  (column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.align}
                      style={{ minWidth: column?.minWidth }}
                    >
                      {column?.label}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {(currentTab === "user" ? userColumns : adminColumns).map(
                        (column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "action" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    flexWrap: "nowrap",
                                  }}
                                >
                                  <Button
                                    sx={{
                                      height: "30px",
                                      padding: 0,
                                      width: "fit-content",
                                      minWidth: "30px",
                                    }}
                                    variant="text"
                                    color="success"
                                    onClick={() => {
                                      setViewUserData(row);
                                      setVisibleUserDrawer(true);
                                    }}
                                  >
                                    {value}
                                    <RemoveRedEyeIcon />
                                  </Button>
                                  <CustomPopover
                                    open={popoverId === row._id}
                                    onClose={() => setPopoverId("")}
                                    handleSubmit={() =>
                                      handleDeleteAccount(row?._id)
                                    }
                                    noti="Tất cả thông tin của khách hàng sẽ bị mất hoàn toàn khi tài khoản bị xoá"
                                  >
                                    <Button
                                      sx={{
                                        height: "30px",
                                        padding: 0,
                                        width: "fit-content",
                                        minWidth: "30px",
                                      }}
                                      variant="text"
                                      color="error"
                                      onClick={() => {
                                        if (popoverId === row._id) {
                                          setPopoverId("");
                                        } else {
                                          setPopoverId(row?._id);
                                        }
                                      }}
                                    >
                                      <DeleteForeverIcon />
                                    </Button>
                                  </CustomPopover>
                                </div>
                              ) : column.id === "name" ? (
                                <div>
                                  {row?.first_name + " " + row?.last_name}
                                </div>
                              ) : column.id === "status" ? (
                                displayStatus(row?.status, row?._id)
                              ) : column.id === "stt" ? (
                                <div
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {index + 1}
                                </div>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {visibleUserDrawer && (
        <ViewUserDrawer
          visible={visibleUserDrawer}
          initData={viewUserData}
          onClose={() => setVisibleUserDrawer(false)}
          type={currentTab}
        />
      )}

      {visibleAddModal && (
        <AddManagerModal
          visible={visibleAddModal}
          onClose={() => setVisibleAddModal(false)}
          handleSubmit={(managerData) => handleCreateManager(managerData)}
        />
      )}
    </>
  );
}
