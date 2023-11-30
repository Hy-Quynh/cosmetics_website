  import React, { useCallback, useEffect, useRef, useState } from "react";
  import Paper from "@mui/material/Paper";
  import Table from "@mui/material/Table";
  import Box from "@mui/material/Box";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TablePagination from "@mui/material/TablePagination";
  import TableRow from "@mui/material/TableRow";
  import Typography from "@mui/material/Typography";
  import Stack from "@mui/material/Stack";
  import Button from "@mui/material/Button";
  import { toast } from "react-toastify";
  import CustomPopover from "../../../components/CustomPopover";
  import { debounce } from "@mui/material";
  import "braft-editor/dist/index.css";
  import storage from "../../../firebase";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { dateTimeConverter } from "../../../utils/helpers";
  import DeleteIcon from "@mui/icons-material/Delete";
  import BorderColorIcon from "@mui/icons-material/BorderColor";
  import CustomInput from "../../../components/CustomInput";
  import CustomDialog from "../../../components/CustomDialog";
  import BraftEditor from "braft-editor";
  import { blogAPI } from "../../../services/blogAPI";
  import SearchBar from "../../../components/SearchBar";

  const maxFileSize = 500000; //500 kb
  const controls = [
    "bold",
    "italic",
    "underline",
    "separator",
    "text-indent",
    "text-align",
    "list-ul",
    "list-ol",
    "link",
    "separator",
    "media",
  ];

  const columns = [
    { id: "stt", label: "Số thứ tự", minWidth: 100 },
    { id: "blog_image", label: "Hình ảnh", minWidth: 170 },
    { id: "blog_title", label: "Tiêu đề", minWidth: 170 },
    {
      id: "create_at",
      label: "Ngày viết",
      minWidth: 170,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
    },
  ];

  export default function AdminBlog(props) {
    const [allBlogData, setAllBlogData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openBlogModal, setOpenBlogModal] = useState({
      status: false,
      type: "",
    });
    const [blogModalData, setBlogModalData] = useState({
      id: "",
      title: "",
      desc: "",
      image: "",
    });
    const [popoverId, setPopoverId] = useState("");
    const searchText = useRef("");
    const [braftValue, setBraftValue] = useState(
      BraftEditor.createEditorState("")
    );

    const getAllBlogData = async (search) => {
      try {
        const getBlogRes = await blogAPI.getAllBlogList(
          undefined,
          undefined,
          search || ""
        );
        if (getBlogRes?.success) {
          setAllBlogData(getBlogRes?.payload?.blog);
        }
      } catch (error) {
        console.log("getAllBlogData error: ", error);
      }
    };

    useEffect(() => {
      getAllBlogData();
    }, []);

    const addNewBlog = async () => {
      try {
        if (
          !blogModalData?.title?.length ||
          !blogModalData?.desc?.length ||
          typeof blogModalData?.image === "string"
        ) {
          toast.error("Các trường không được bỏ trống");
          return "";
        } else {
          const postData = {
            title: blogModalData.title,
            desc: blogModalData.desc,
            image: blogModalData.image,
          };
          const imageName = "post-" + new Date().getTime();
          const storageRef = ref(storage, imageName);

          const updateImageRes = await uploadBytes(storageRef, postData.image);
          if (updateImageRes) {
            const pathReference = ref(storage, imageName);
            const url = await getDownloadURL(pathReference);

            postData.image = url;
          } else {
            postData.image = "";
          }
          const addBlogRes = await blogAPI.createNewBlog(postData);
          if (addBlogRes?.success) {
            getAllBlogData();
            setOpenBlogModal({ status: false, type: "" });
            setBlogModalData({ id: "", title: "", desc: "", image: "" });
            return true;
          } else {
            return false;
          }
        }
      } catch (error) {
        return false;
      }
    };

    const handleUpdateBlogData = async () => {
      try {
        if (!blogModalData.title.length || !blogModalData.desc.length) {
          toast.error("Các trường không được để trống");
          return false;
        } else {
          const postData = {
            id: blogModalData.id,
            title: blogModalData.title,
            desc: blogModalData.desc,
          };
          if (typeof blogModalData?.image !== "string") {
            const imageName = "post-" + new Date().getTime();
            const storageRef = ref(storage, imageName);

            const updateImageRes = await uploadBytes(
              storageRef,
              blogModalData?.image
            );
            if (updateImageRes) {
              const pathReference = ref(storage, imageName);
              const url = await getDownloadURL(pathReference);
              postData.image = url;
            } else {
              postData.image = "";
            }
          } else {
            postData.image = blogModalData.image;
          }
          const addBlogRes = await blogAPI.updateBlogData(postData);

          if (addBlogRes?.success) {
            getAllBlogData(searchText.current);
            setOpenBlogModal({ status: false, type: "" });
            setBlogModalData({ id: "", title: "", desc: "", image: "" });
            return true;
          } else {
            return false;
          }
        }
      } catch (error) {
        return false;
      }
    };

    const deleteBlog = async (postId) => {
      try {
        const deletePostRes = await blogAPI.deleteBlogData(postId);
        if (deletePostRes?.success) {
          getAllBlogData(searchText.current);
          toast.success("Xoá bài viết thành công");
        } else {
          toast.error("Xoá bài viết thất bại");
          props.setDeleteFailed();
        }
      } catch (error) {
        toast.error("Xoá bài viết thất bại");
      }
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const debounceSearch = useCallback(
      debounce(() => {
        getAllBlogData(searchText.current);
      }, 200),
      []
    );

    const customUpload = async (props) => {
      const { file, success, error } = props;
      const imageName = "post-" + new Date().getTime();
      const storageRef = ref(storage, imageName);

      const updateImageRes = await uploadBytes(storageRef, file);
      if (updateImageRes) {
        const pathReference = ref(storage, imageName);
        const url = await getDownloadURL(pathReference);
        success({ url });
      } else {
        error("File upload failed");
        toast.warn("File upload failed");
      }
    };

    const validateFn = (file) => {
      let fileSizeError = "File tải lên không thể quá 500 kb";

      if (file.size > maxFileSize) {
        toast.warn(fileSizeError);
        return false;
      }
      return true;
    };

    return (
      <div>
        {openBlogModal.status && (
          <CustomDialog
            onClose={() => setOpenBlogModal({ status: false, type: "" })}
            visible={openBlogModal.status}
            title={
              openBlogModal.type === "add"
                ? "Thêm bài viết mới"
                : "Cập nhật bài viết"
            }
            closeTitle="Đóng"
            closeSubmitTitle={"Xác nhận"}
            handleSubmit={() => {
              if (openBlogModal.type === "add") {
                return addNewBlog();
              } else if (openBlogModal.type === "update") {
                return handleUpdateBlogData();
              }
            }}
            maxWidth="1000px"
            width="1000px"
          >
            <CustomInput
              label="Tên bài viết"
              defaultValue=""
              id="post-title"
              variant="filled"
              style={{ marginTop: 11 }}
              value={blogModalData.title}
              onChange={(event) =>
                setBlogModalData({
                  ...blogModalData,
                  title: event.target.value,
                })
              }
            />
            {typeof window !== "undefined" && (
              <div className="editor-wrapper">
                <BraftEditor
                  language="en"
                  controls={controls}
                  media={{ uploadFn: customUpload, validateFn: validateFn }}
                  contentStyle={{
                    height: 350,
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,.1)",
                  }}
                  value={braftValue}
                  onChange={(editorState) => {
                    setBraftValue(editorState);
                    setBlogModalData({
                      ...blogModalData,
                      desc: editorState.toHTML(),
                    });
                  }}
                />
              </div>
            )}
            <Box sx={{ margin: "10px 0" }}>
              <Typography variant="p" component="p">
                Hình ảnh:
              </Typography>
              <CustomInput
                defaultValue=""
                id="post-title"
                variant="filled"
                style={{ marginTop: 11 }}
                type="file"
                onChange={(event) => {
                  setBlogModalData({
                    ...blogModalData,
                    image: event.target.files[0],
                  });
                }}
              />
            </Box>
          </CustomDialog>
        )}
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            Quản lí bài viết
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
              setBlogModalData({ id: "", title: "", desc: "", image: "" });
              setOpenBlogModal({ status: true, type: "add" });
              setBraftValue(BraftEditor?.createEditorState?.(""));
            }}
          >
            Thêm mới
          </Button>
        </Stack>
        <br />

        <SearchBar
          handleChange={(value) => (searchText.current = value)}
          debounceSearch={() => debounceSearch()}
          handleSubmit={() => getAllBlogData(searchText.current)}
        />

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
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
                {allBlogData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "id" ? (
                                page * 10 + (rowIndex + 1)
                              ) : column.id === "action" ? (
                                <Stack
                                  flexDirection={"row"}
                                  justifyContent="center"
                                >
                                  <Button
                                    sx={{
                                      height: "30px",
                                      padding: 0,
                                      width: "fit-content",
                                      minWidth: "30px",
                                    }}
                                    variant="text"
                                    onClick={async () => {
                                      setOpenBlogModal({
                                        status: true,
                                        type: "update",
                                      });
                                      setBlogModalData({
                                        id: row._id,
                                        title: row.blog_title,
                                        desc: row.blog_desc,
                                        image: row.blog_image,
                                      });
                                      setBraftValue(
                                        BraftEditor?.createEditorState?.(
                                          row.blog_desc
                                        )
                                      );
                                    }}
                                  >
                                    <BorderColorIcon />
                                  </Button>
                                  <CustomPopover
                                    open={popoverId === row._id}
                                    onClose={() => setPopoverId("")}
                                    handleSubmit={() => deleteBlog(row._id)}
                                    noti="Bạn có chắc chắn muốn xoá bài viết?"
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
                                          setPopoverId(row._id);
                                        }
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </CustomPopover>
                                </Stack>
                              ) : column.id === "blog_image" ? (
                                <img
                                  src={row.blog_image}
                                  width={100}
                                  height={100}
                                  alt=""
                                  placeholder="blur"
                                />
                              ) : column.id === "create_at" ? (
                                dateTimeConverter(value)
                              ) : column.id === "stt" ? (
                                <div
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {rowIndex + 1}
                                </div>
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allBlogData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
