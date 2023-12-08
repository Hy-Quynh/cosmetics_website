import React, { useEffect, useState } from "react";
import { parseJSON } from "../../utils/helpers";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_CART_INFO,
  USER_INFO_KEY,
} from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import { categoryAPI } from "../../services/categoryAPI";

export default function Header() {
  const [productCategory, setProductCategory] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const userInfo = parseJSON(localStorage.getItem(USER_INFO_KEY));
  const navigate = useNavigate();
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));

  const getCategoryData = async () => {
    const categoryList = await categoryAPI.getAllCategory();
    const category = categoryList?.payload?.category;
    if (category?.length) {
      const allCategory = [...category];
      allCategory?.unshift({
        _id: -1,
        category_name: "Tất cả",
      });
      setProductCategory(allCategory);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    const changeQuantityInCart = () => {
      const cartData =
        parseJSON(
          localStorage.getItem(USER_CART_INFO + `_${userData?._id || ""}`)
        ) || [];
      setCartQuantity(cartData?.length);
    };
    changeQuantityInCart();
    window.addEventListener("storage", changeQuantityInCart);
    return () => {
      window.removeEventListener("storage", changeQuantityInCart);
    };
  }, []);

  return (
    <div>
      {/* Navbar Start */}
      <div
        className="container-fluid fixed-top px-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
          <div className="col-lg-6 px-5 text-start">
            <small>
              <i className="fa fa-map-marker-alt me-2" />
              123 Street, Hồ Chí Minh, Việt Nam
            </small>
            <small className="ms-4">
              <i className="fa fa-envelope me-2" />
              info@example.com
            </small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>Theo dõi chúng tôi tại:</small>
            <a className="text-body ms-3" href>
              <i className="fab fa-facebook-f" />
            </a>
            <a className="text-body ms-3" href>
              <i className="fab fa-twitter" />
            </a>
            <a className="text-body ms-3" href>
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="text-body ms-3" href>
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
        <nav
          className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <a href="/" className="navbar-brand ms-4 ms-lg-0">
            <h1 className="fw-bold text-primary m-0">
              Cos<span className="text-secondary">me</span>tic
            </h1>
          </a>
          <button
            type="button"
            className="navbar-toggler me-4"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <a href="/" className="nav-item nav-link active">
                Trang chủ
              </a>

              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Sản phẩm
                </a>
                <div className="dropdown-menu m-0">
                  {productCategory?.map((item, index) => {
                    return (
                      <a
                        href={`/product${
                          item?._id === -1 ? "" : `?category=${item?._id}`
                        }`}
                        className="dropdown-item"
                      >
                        {item?.category_name}
                      </a>
                    );
                  })}
                </div>
              </div>
              <a href="/blog" className="nav-item nav-link">
                Bài viết
              </a>
              <a href="/contact" className="nav-item nav-link">
                Liên hệ
              </a>
              <a href="/about" className="nav-item nav-link">
                Về chúng tôi
              </a>
              <a href="/buy-guide" className="nav-item nav-link">
                Hướng dẫn
              </a>
            </div>
            <div className="d-none d-lg-flex ms-2">
              <a className="btn-sm-square bg-white rounded-circle ms-3" href>
                <small className="fa fa-search text-body" />
              </a>
              {userInfo?.type === "user" && userInfo?._id ? (
                <div className="nav-item dropdown">
                  <a className="btn-sm-square bg-white rounded-circle ms-3">
                    <small className="fa fa-user text-body" />
                  </a>
                  <div
                    className="dropdown-menu"
                    style={{ marginLeft: "-40px" }}
                  >
                    <a
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      href="/personal"
                    >
                      Trang cá nhân
                    </a>
                    <a
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        localStorage.removeItem(USER_INFO_KEY);
                        localStorage.removeItem(ACCESS_TOKEN_KEY);
                        localStorage.removeItem(REFRESH_TOKEN_KEY);
                        navigate("/login");
                      }}
                    >
                      Đăng xuất
                    </a>
                  </div>
                </div>
              ) : (
                <a
                  className="btn-sm-square bg-white rounded-circle ms-3"
                  href="/login"
                >
                  <small className="fa fa-arrow-left text-body" />
                </a>
              )}

              <a
                className="btn-sm-square bg-white rounded-circle ms-3"
                style={{ position: "relative" }}
                onClick={() => navigate("/cart")}
              >
                <small
                  className="fa fa-shopping-bag text-body"
                  style={{ cursor: "pointer" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: 0,
                    fontWeight: 900,
                    color: "#F74F06",
                  }}
                >
                  {cartQuantity}
                </div>
              </a>
            </div>
          </div>
        </nav>
      </div>
      {/* Navbar End */}
    </div>
  );
}
