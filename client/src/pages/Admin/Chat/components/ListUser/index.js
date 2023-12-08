import { useCallback, useEffect, useRef, useState } from "react";
import chatApi from "../../../../../services/chatAPI";
import { userAPI } from "../../../../../services/userAPI";
import _ from "lodash";
import avatarPlaceholder from "../../../../../assets/imgs/user_placeholder.png";
import './style.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import socketIOClient from "socket.io-client";
import { CHAT_HOST } from "../../../../../utils/contants";
import { toast } from "react-toastify";

export default function ListUserHaveChat({
  changeUserSelected,
}) {
  const [socketId, setSocketId] = useState("");
  const [listUser, setListUser] = useState([]);
  const [userSelected, setUserSelected] = useState("");
  const searchText = useRef("");
  const [searchList, setSearchList] = useState([]);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = (socketIOClient).connect(CHAT_HOST);
    socketRef.current.on("getId", (data) => {
      setSocketId(data);
    });

    socketRef.current.on("sendListUserServer", (dataGot) => {
      setListUser(dataGot?.data);
    });
  }, []);

  const getListUserHaveChat = async () => {
    const response = await chatApi.getAllUserHaveChat();
    if (response?.user) {
      setListUser(response?.user);
    }
  };

  const searchData = async (keyWord) => {
    if (keyWord?.length) {
      const response = await userAPI.getAllUser('user',undefined, undefined, undefined, keyWord?.trim());
      if (response?.payload?.user) {
        setSearchList(response?.payload?.user);
      }
    } else {
      setSearchList([]);
    }
  };

  useEffect(() => {
    getListUserHaveChat();
  }, []);

  const debounceSearch = useCallback(
    _.debounce(() => {
      searchData(searchText.current);
    }, 200),
    []
  );


  const handleActiveUser = async (user) => {
    try {
      const changeStatusRes = await chatApi.updateReadMessage(user?._id)
      console.log('changeStatusRes > >', changeStatusRes);
      if (changeStatusRes){
        getListUserHaveChat()
        changeUserSelected?.(user);
        setUserSelected?.(user?._id)
      }else {
        toast.error('Xảy ra lỗi hệ thống')
      }
      
    } catch (error) {
      toast.error('Xảy ra lỗi hệ thống')
    }
  }

  return (
    <div
      style={{
        minHeight: "84vh",
        maxHeight: "84vh",
        overflowY: "auto",
      }}
    >
      <div className="homeSearchBar">
        <div style={{ position: "relative" }}>
          <div className="search" style={{ marginBottom: 0 }}>
            <input
              type="text"
              className="searchTerm"
              placeholder="Nhập tên khách hàng muốn tìm kiếm tại đây?"
              onChange={(event) => (searchText.current = event.target.value)}
              onKeyUp={(event) => {
                if (event?.code === "Backspace") {
                  debounceSearch();
                }
              }}
              style={{ width: "80%" }}
              onClick={() => {
                if (!isComponentVisible) {
                  setIsComponentVisible(true);
                }
              }}
            />
            <button
              type="submit"
              className="searchButton"
              onClick={() => {
                if (!isComponentVisible) {
                  setIsComponentVisible(true);
                }
                searchData(searchText.current);
              }}
            >
              <SearchOutlinedIcon />
            </button>
          </div>
          {(searchList?.length && isComponentVisible && (
            <ul
              ref={ref}
              style={{
                maxHeight: "300px",
                overflow: "auto",
                background: "white",
                position: "absolute",
                width: "80%",
                zIndex: 50,
                padding: "10px",
                borderBottom: "1px solid #3CB914",
                borderLeft: "1px solid #3CB914",
                borderRight: "1px solid #3CB914",
                listStyleType: "none",
              }}
            >
              {searchList?.map((item, index) => {
                return (
                  <>
                    <li
                      key={`search-list-item-${index}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const checkUser = listUser?.find(
                          (it) => it?._id === item?._id
                        );
                        if (!checkUser?._id) {
                          const ur = [...listUser];
                          ur?.push(item);
                          setListUser(ur);
                        }
                        handleActiveUser(item);
                        setIsComponentVisible(false);
                      }}
                    >
                      {item?.first_name + ' ' + item?.last_name}
                    </li>
                    {index < searchList?.length - 1 && (
                      <div
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          border: "1px solid #3CB914",
                        }}
                      />
                    )}
                  </>
                );
              })}
            </ul>
          )) ||
            ""}
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        {listUser?.map((item, index) => {
          return (
            <div
              key={`user-chat-item-${index}`}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "10px 5px",
                cursor: "pointer",
                background: item?._id === userSelected ? "rgb(44,206,245)" : "",
              }}
              onClick={() => {
                if (item?._id !== userSelected) {
                  handleActiveUser?.(item);
                }
              }}
            >
              <div>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  src={avatarPlaceholder}
                  width={30}
                  height={30}
                  alt="user_placeholder"
                  style={{borderRadius: '15px'}}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>{item?.adFirstName + ' ' + item?.adLastName} <span style={{color: 'red'}}>( <span> {item?.totalUnRead} </span>)</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
