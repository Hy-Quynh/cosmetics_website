import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import chatApi from "../../../../../services/chatAPI";
import "./style.scss";
import avatarPlaceholder from "../../../../../assets/imgs/user_placeholder.png";
import { CHAT_HOST, USER_INFO_KEY } from "../../../../../utils/contants";
import { toast } from "react-toastify";
import { parseJSON } from "../../../../../utils/helpers";


export default function UserChat({ user }) {
  const [socketId, setSocketId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [userListMessage, setUserListMessage] = useState([]);
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});

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
      if (user?._id) {
        const userMessage = await chatApi.getUserChat(user?._id);
        const chat = userMessage?.chat;
        if (chat) {
          setUserListMessage(chat);
        }
      } else {
        if (userListMessage?.length) setUserListMessage([]);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (setChatMessage?.length) {
      setChatMessage("");
    }
  }, [user]);

  const sendMessage = async () => {
    if (!chatMessage?.trim()?.length) {
      return toast.error("Tin nhắn không thể bỏ trống");
    }
    setChatMessage("");
    socketRef.current.emit("sendDataClient", {
      userId: user?._id,
      message: chatMessage?.trim(),
      adminId: userData?._id,
      type: "chat-reply",
    });
  };

  return (
    <div
      style={{
        minHeight: "84vh",
        maxHeight: "84vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "45px",
          padding: "6px 10px",
          boxSizing: "border-box",
          borderTop: "3px solid #3CB914",
          borderLeft: "3px solid #3CB914",
          borderRight: "3px solid #3CB914",
          fontWeight: 700,
        }}
      >
        {user ? (
          <span>
            <img
              src={avatarPlaceholder}
              width={30}
              height={30}
              alt="user_placeholder"
              style={{ borderRadius: "15px" }}
            />
          </span>
        ) : (
          <></>
        )}
        <span style={{ marginLeft: "10px" }}>{(user?.adFirstName || user?.first_name || '') + ' ' + (user?.adLastName || user?.last_name || '')}</span>
      </div>
      <div
        style={{
          position: "absolute",
          height: "calc(84vh - 65px - 45px)",
          overflowY: "auto",
          width: "100%",
          paddingRight: "15px",
        }}
        className={"AdminChatMessageFrame"}
      >
        {userListMessage?.map((item, index) => {
          return (
            <div
              className={`message ${
                item?.ownerId ? "message-right" : "message-left"
              }`}
              key={`user-chat-item-${index}`}
            >
              <div
                className={`bubble ${
                  item?.ownerId ? "bubble-dark" : "bubble-light"
                }`}
              >
                {item?.message || item?.replyMessage || ""}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className={"AdminChattypeArea"}>
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
            disabled={!user?._id}
            className="button-send"
            onClick={() => sendMessage()}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
