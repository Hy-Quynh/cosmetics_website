import React from "react";
import { parseJSON } from "../../utils/helpers";
import { USER_INFO_KEY } from "../../utils/contants";

export default function Header() {
  const userInfo = parseJSON(localStorage.getItem(USER_INFO_KEY));

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
              123 Street, New York, USA
            </small>
            <small className="ms-4">
              <i className="fa fa-envelope me-2" />
              info@example.com
            </small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>Follow us:</small>
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
          <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
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
                Home
              </a>
              <a href="/about" className="nav-item nav-link">
                About Us
              </a>
              {/* <a href="/product" className="nav-item nav-link">
                Products
              </a> */}
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Sản phẩm
                </a>
                <div className="dropdown-menu m-0">
                  <a href="/product" className="dropdown-item">
                    Son môi
                  </a>
                  <a href="/product" className="dropdown-item">
                    Nước tẩy trang
                  </a>
                  <a href="/product" className="dropdown-item">
                    Kem chống nắng
                  </a>
                  <a href="/product" className="dropdown-item">
                    Nước hoa
                  </a>
                </div>
              </div>
              <a href="/post" className="nav-item nav-link">
                Bài viết
              </a>
              <a href="/contact" className="nav-item nav-link">
                Liên hệ
              </a>
              <a href="/about" className="nav-item nav-link">
                Giới thiệu
              </a>
            </div>
            <div className="d-none d-lg-flex ms-2">
              <a className="btn-sm-square bg-white rounded-circle ms-3" href>
                <small className="fa fa-search text-body" />
              </a>
              {userInfo?.type === "user" && userInfo?._id ? (
                <a className="btn-sm-square bg-white rounded-circle ms-3" href>
                  <small className="fa fa-user text-body" />
                </a>
              ) : (
                <a
                  className="btn-sm-square bg-white rounded-circle ms-3"
                  href="/login"
                >
                  <small className="fa fa-arrow-left text-body" />
                </a>
              )}

              <a className="btn-sm-square bg-white rounded-circle ms-3" href>
                <small className="fa fa-shopping-bag text-body" />
              </a>
            </div>
          </div>
        </nav>
      </div>
      {/* Navbar End */}
    </div>
  );
}
