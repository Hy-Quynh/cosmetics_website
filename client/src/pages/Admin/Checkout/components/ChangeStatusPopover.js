import React, { useEffect, useState } from "react";
import CustomPopover from "../../../../components/CustomPopover";
import { ORDER_STATUS } from "../../../../utils/contants";

export default function ChangeCheckoutStatusPopover(props) {
  const [selectStatus, setSelectStatus] = useState(-1);
  const { visible, onClose, handleSubmit, children, currentStatus } = props;

  useEffect(() => {
    setSelectStatus(currentStatus);
  }, [currentStatus]);

  return (
    <CustomPopover
      open={visible}
      onClose={() => onClose()}
      handleSubmit={() => handleSubmit(selectStatus)}
      noti={
        <div style={{ fontSize: "16px", fontWeight: 'bold' }}>
          Bạn có chắc chắn muốn đổi trạng thái đơn hàng?
        </div>
      }
      width="350px"
      content={
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Đã đặt hàng", value: ORDER_STATUS.CONFIRM },
            { label: "Đang vận chuyển", value: ORDER_STATUS.SHIPPING },
            { label: "Đã giao hàng", value: ORDER_STATUS.DELIVERED },
          ].map((statusItem) => {
            return (
              <div
                style={{
                  width: "48%",
                  padding: "4px 6px",
                  border: "1px solid gray",
                  fontSize: "14px",
                  marginRight: "5px",
                  cursor: "pointer",
                  textAlign: 'center',
                  marginTop: '10px',
                  background:
                    selectStatus === statusItem?.value ? "#c9c4c3" : "",
                }}
                onClick={() => {
                  setSelectStatus(statusItem?.value);
                }}
              >
                {statusItem?.label}
              </div>
            );
          })}
        </div>
      }
    >
      {children}
    </CustomPopover>
  );
}
