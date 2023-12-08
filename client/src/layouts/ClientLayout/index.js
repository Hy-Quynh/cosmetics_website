import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { parseJSON } from "../../utils/helpers";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_INFO_KEY } from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../components/ChatBox";

export default function ClientLayout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));
    if (userData?.type === "admin") {
      localStorage.removeItem(USER_INFO_KEY);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      {props.children}
      <Footer />
      <ChatBox />
    </div>
  );
}
