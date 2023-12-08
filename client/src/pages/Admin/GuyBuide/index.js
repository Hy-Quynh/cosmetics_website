import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import CustomPopover from '../../../components/CustomPopover';
import 'braft-editor/dist/index.css';
import storage from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { dateTimeConverter } from '../../../utils/helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CustomInput from '../../../components/CustomInput';
import CustomDialog from '../../../components/CustomDialog';
import BraftEditor from 'braft-editor';
import { buyGuideAPI } from '../../../services/buyGuideAPI';
import { Tooltip } from '@mui/material';

const maxFileSize = 500000; //500 kb
const controls = [
  'bold',
  'italic',
  'underline',
  'separator',
  'text-indent',
  'text-align',
  'list-ul',
  'list-ol',
  'link',
  'separator',
  'media',
];

const columns = [
  { id: 'stt', label: 'STT', minWidth: 100 },
  { id: 'title', label: 'Tiêu đề', minWidth: 170 },
  {
    id: 'created_day',
    label: 'Ngày tạo',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
  },
];

export default function AdminBuyGuide(props) {
  const [allBuyGuideData, setAllBuyGuideData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openBuyGuideModal, setOpenBuyGuideModal] = useState({
    status: false,
    type: '',
  });
  const [buyGuideModalData, setBuyGuideModalData] = useState({
    id: '',
    title: '',
    guide_description: '',
  });
  const [popoverId, setPopoverId] = useState('');
  const [braftValue, setBraftValue] = useState(
    BraftEditor.createEditorState('')
  );
  const [popoverStatusId, setPopoverStatusId] = useState('');

  const getAllBuyGuideData = async () => {
    try {
      const getBuyGuideRes = await buyGuideAPI.getAllBuyGuide(
        -1,
        undefined,
        undefined
      );
      if (getBuyGuideRes?.success) {
        setAllBuyGuideData(getBuyGuideRes?.payload?.buyGuide);
      }
    } catch (error) {
      console.log('getAllBuyGuideData error: ', error);
    }
  };

  useEffect(() => {
    getAllBuyGuideData();
  }, []);

  const addNewBuyGuide = async () => {
    try {
      if (
        !buyGuideModalData?.title?.length ||
        !buyGuideModalData?.guide_description?.length
      ) {
        toast.error('Các trường không được bỏ trống');
        return '';
      } else {
        const buyGuideData = {
          title: buyGuideModalData.title,
          guide_description: buyGuideModalData.guide_description,
        };

        const addBuyGuideRes = await buyGuideAPI.createNewBuyGuide(
          buyGuideData
        );
        if (addBuyGuideRes?.success) {
          getAllBuyGuideData();
          setOpenBuyGuideModal({ status: false, type: '' });
          setBuyGuideModalData({ id: '', title: '', guide_description: '' });
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  };

  const handleUpdateBuyGuideData = async () => {
    try {
      if (
        !buyGuideModalData.title.length ||
        !buyGuideModalData.guide_description.length
      ) {
        toast.error('Các trường không được để trống');
        return false;
      } else {
        const buyGuideData = {
          id: buyGuideModalData.id,
          title: buyGuideModalData.title,
          guide_description: buyGuideModalData.guide_description,
        };

        const addBuyGuideRes = await buyGuideAPI.updatebuyGuideData(
          buyGuideData,
          buyGuideModalData.id
        );

        if (addBuyGuideRes?.success) {
          getAllBuyGuideData();
          setOpenBuyGuideModal({ status: false, type: '' });
          setBuyGuideModalData({ id: '', title: '', guide_description: '' });
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  };

  const deleteBuyGuide = async (buyGuideId) => {
    try {
      const deleteBuyGuideRes = await buyGuideAPI.deleteBuyGuide(
        buyGuideId
      );
      if (deleteBuyGuideRes?.success) {
        getAllBuyGuideData();
        toast.success('Xoá hướng dẫn thành công');
      } else {
        toast.error('Xoá hướng dẫn thất bại');
        props.setDeleteFailed();
      }
    } catch (error) {
      toast.error('Xoá hướng dẫn thất bại');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const customUpload = async (props) => {
    const { file, success, error } = props;
    const imageName = 'buyGuide-' + new Date().getTime();
    const storageRef = ref(storage, imageName);

    const updateImageRes = await uploadBytes(storageRef, file);
    if (updateImageRes) {
      const pathReference = ref(storage, imageName);
      const url = await getDownloadURL(pathReference);
      success({ url });
    } else {
      error('File upload failed');
      toast.warn('File upload failed');
    }
  };

  const validateFn = (file) => {
    let fileSizeError = 'File tải lên không thể quá 500 kb';

    if (file.size > maxFileSize) {
      toast.warn(fileSizeError);
      return false;
    }
    return true;
  };

  const handleActiveBuyGuide = async(id) => {
    try {
      const res = await buyGuideAPI.changeActiveBuyGuide(id);
      if (res?.success){
        getAllBuyGuideData();
        toast.success('Kích hoạt hướng dẫn thành công');
      }else {
        toast.error('Kích hoạt hướng dẫn thất bại');
      }
    } catch (error) {
      toast.error('Kích hoạt hướng dẫn thất bại');
    }
  };

  const handleInActiveBuyGuide = async (id) => {
    try {
      const res = await buyGuideAPI.changeInActiveBuyGuide(id);
      if (res?.success){
        getAllBuyGuideData();
        toast.success('Huỷ kích hoạt hướng dẫn thành công');
      }else {
        toast.error('Huỷ kích hoạt hướng dẫn thất bại');
      }
    } catch (error) {
      toast.error('Huỷ kích hoạt hướng dẫn thất bại');
    }
  };

  const renderStatus = (status, id) => {
    switch (status) {
      case 0: {
        return (
          <CustomPopover
            open={popoverStatusId === id}
            onClose={() => setPopoverStatusId('')}
            handleSubmit={() => handleActiveBuyGuide(id)}
            noti='Bạn có chắc chắn muốn kích hoạt hướng dẫn này?'
          >
            <Tooltip title='Nhấn vào đây để kích hoạt' placement='top'>
              <div
                style={{
                  padding: '10px 20px',
                  background: '#7a7a79',
                  textAlign: 'center',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={()=>setPopoverStatusId(id)}
              >
                CHƯA KÍCH HOẠT
              </div>
            </Tooltip>
          </CustomPopover>
        );
      }
      case 1: {
        return (
          <CustomPopover
            open={popoverStatusId === id}
            onClose={() => setPopoverStatusId('')}
            handleSubmit={() => handleInActiveBuyGuide(id)}
            noti='Bạn có chắc chắn muốn huỷ kích hoạt hướng dẫn này?'
          >
            <Tooltip title='Nhấn vào đây để huỷ kích hoạt' placement='top'>
              <div
                style={{
                  padding: '10px 20px',
                  background: '#05a82b',
                  textAlign: 'center',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={()=>setPopoverStatusId(id)}
              >
                ĐÃ KÍCH HOẠT
              </div>
            </Tooltip>
          </CustomPopover>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <div>
      {openBuyGuideModal.status && (
        <CustomDialog
          onClose={() => setOpenBuyGuideModal({ status: false, type: '' })}
          visible={openBuyGuideModal.status}
          title={
            openBuyGuideModal.type === 'add'
              ? 'Thêm hướng dẫn mới'
              : 'Cập nhật hướng dẫn'
          }
          closeTitle='Đóng'
          closeSubmitTitle={'Xác nhận'}
          handleSubmit={() => {
            if (openBuyGuideModal.type === 'add') {
              return addNewBuyGuide();
            } else if (openBuyGuideModal.type === 'update') {
              return handleUpdateBuyGuideData();
            }
          }}
          maxWidth='1000px'
          width='1000px'
        >
          <CustomInput
            label='Tiêu đề'
            defaultValue=''
            id='buyGuide-title'
            variant='filled'
            style={{ marginTop: 11 }}
            value={buyGuideModalData.title}
            onChange={(event) =>
              setBuyGuideModalData({
                ...buyGuideModalData,
                title: event.target.value,
              })
            }
          />
          {typeof window !== 'undefined' && (
            <div className='editor-wrapper'>
              <BraftEditor
                language='en'
                controls={controls}
                media={{ uploadFn: customUpload, validateFn: validateFn }}
                contentStyle={{
                  height: 350,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)',
                }}
                value={braftValue}
                onChange={(editorState) => {
                  setBraftValue(editorState);
                  setBuyGuideModalData({
                    ...buyGuideModalData,
                    guide_description: editorState.toHTML(),
                  });
                }}
              />
            </div>
          )}
        </CustomDialog>
      )}
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography
          component='h2'
          variant='h6'
          color='primary'
          gutterBottom
          sx={{ textAlign: 'left' }}
        >
          Quản lí hướng dẫn mua hàng
        </Typography>

        <Button
          variant='contained'
          onClick={() => {
            setBuyGuideModalData({ id: '', title: '', guide_description: '' });
            setOpenBuyGuideModal({ status: true, type: 'add' });
            setBraftValue(BraftEditor?.createEditorState?.(''));
          }}
        >
          Thêm mới
        </Button>
      </Stack>
      <br />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              {allBuyGuideData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
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
                            {column.id === 'id' ? (
                              page * 10 + (rowIndex + 1)
                            ) : column.id === 'action' ? (
                              <Stack
                                flexDirection={'row'}
                                justifyContent='center'
                              >
                                <Tooltip title='Cập nhật' placement='top'>
                                  <Button
                                    sx={{
                                      height: '30px',
                                      padding: 0,
                                      width: 'fit-content',
                                      minWidth: '30px',
                                    }}
                                    variant='text'
                                    onClick={async () => {
                                      setOpenBuyGuideModal({
                                        status: true,
                                        type: 'update',
                                      });
                                      setBuyGuideModalData({
                                        id: row._id,
                                        title: row.title,
                                        guide_description: row.guide_description,
                                      });
                                      setBraftValue(
                                        BraftEditor?.createEditorState?.(
                                          row.guide_description
                                        )
                                      );
                                    }}
                                  >
                                    <BorderColorIcon />
                                  </Button>
                                </Tooltip>

                                <CustomPopover
                                  open={popoverId === row._id}
                                  onClose={() => setPopoverId('')}
                                  handleSubmit={() => deleteBuyGuide(row._id)}
                                  noti='Bạn có chắc chắn muốn xoá hướng dẫn?'
                                >
                                  <Tooltip title='Xoá' placement='top'>
                                    <Button
                                      sx={{
                                        height: '30px',
                                        padding: 0,
                                        width: 'fit-content',
                                        minWidth: '30px',
                                      }}
                                      variant='text'
                                      color='error'
                                      onClick={() => {
                                        if (popoverId === row._id) {
                                          setPopoverId('');
                                        } else {
                                          setPopoverId(row._id);
                                        }
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Tooltip>
                                </CustomPopover>
                              </Stack>
                            ) : column.id === 'created_day' ? (
                              dateTimeConverter(value)
                            ) : column.id === 'status' ? (
                              renderStatus(value, row._id)
                            ) : column.id === 'stt' ? (
                              <div
                                style={{
                                  color: 'red',
                                  fontWeight: 'bold',
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
          component='div'
          count={allBuyGuideData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
