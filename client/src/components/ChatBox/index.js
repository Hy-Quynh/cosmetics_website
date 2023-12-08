import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import telesaleIcon from '../../assets/imgs/telesale.png';
import chatApi from "../../services/chatAPI";
import socketIOClient from "socket.io-client";
import { useLocation } from "react-router-dom";
import { parseJSON } from "../../utils/helpers";
import { CHAT_HOST, USER_INFO_KEY } from "../../utils/contants";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { toast } from "react-toastify";

export default function ChatBox() {
  const [visibleChatBox, setVisibleChatBox] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [userListMessage, setUserListMessage] = useState([]);
  const [isAdminAccount, setIsAdminAccount] = useState(false);
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});

  const location = useLocation();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = (socketIOClient).connect(CHAT_HOST);
    socketRef.current.on("getId", (data) => {
      setSocketId(data);
    });

    socketRef.current.on("sendDataServer", (dataGot) => {
      setUserListMessage(dataGot?.data);
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (userData?._id) {
        const userMessage = await chatApi.getUserChat(userData?._id);
        const chat = userMessage?.chat;
        if (chat) {
          setUserListMessage(chat);
        }
      }
    })();
  }, [userData?._id]);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setIsAdminAccount(admin ? true : false);
  }, [userData?._id]);

  const sendMessage = async () => {
    if (!chatMessage?.trim()?.length) {
      return toast.error("Tin nhắn không thể bỏ trống");
    }

    setChatMessage("");
    return socketRef.current.emit("sendDataClient", {
      userId: userData?._id,
      message: chatMessage?.trim(),
      type: 'user-chat'
    });
  };

  return (
    <div>
      {location?.pathname?.indexOf("/admin") < 0 && !isAdminAccount ? (
        <div>
          {userData?._id ? (
            <div
              style={{
                position: "fixed",
                right: "30px",
                bottom: "100px",
                zIndex: 10,
              }}
              className="chat-contact-icon"
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid rgb(44,206,244)",
                  borderRadius: "50px",
                  background: "rgb(44,206,244)",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => setVisibleChatBox(true)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <TextsmsOutlinedIcon style={{ color: "white" }} />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {visibleChatBox ? (
            <div className="chat-box-frame">
              <div className="chat-box">
                <div className="header">
                  <div className="avatar-wrapper avatar-big">
                    <img src={telesaleIcon} alt="avatar" />
                  </div>
                  <span className="name" style={{ color: "white" }}>
                    Quản trị viên
                  </span>
                  <span
                    className="options"
                    onClick={() => setVisibleChatBox(false)}
                  >
                    <CloseOutlinedIcon style={{ color: "white" }} />
                  </span>
                </div>
                <div className="chat-room">
                  {userListMessage?.map((item, index) => {
                    return (
                      <div
                        className={`message ${
                          !item?.ownerId ? "message-right" : "message-left"
                        }`}
                        key={`user-message-item-${index}`}
                      >
                        <div
                          className={`bubble ${
                            !item?.ownerId ? "bubble-dark" : "bubble-light"
                          }`}
                        >
                          {item?.message || item?.replyMessage || ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="type-area">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="inputText"
                      placeholder="Nhập tin nhắn vào đây..."
                      value={chatMessage}
                      onChange={(event) => {
                        setChatMessage(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event?.keyCode === 13) {
                          sendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    className="button-send"
                    onClick={async () => sendMessage()}
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
