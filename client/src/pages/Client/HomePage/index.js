import React from "react";
import Banner1 from "../../../assets/imgs/banner1.jpeg";
import Banner2 from "../../../assets/imgs/banner2.jpeg";
import AboutHomePage from "../../../assets/imgs/about-homepage.jpeg";
import Lipstick from "../../../assets/imgs/lipstick.jpeg";

export default function HomePage() {
  return (
    <div>
      {/* Carousel Start */}
      <div
        className="container-fluid p-0 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src={Banner1} alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <h1 className="display-2 mb-5 animated slideInDown">
                        Mỹ phẩm chính hãng tốt nhất hiện nay
                      </h1>
                      <a
                        href
                        className="btn btn-primary rounded-pill py-sm-3 px-sm-5"
                      >
                        Products
                      </a>
                      <a
                        href
                        className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3"
                      >
                        Services
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src={Banner2} alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <h1 className="display-2 mb-5 animated slideInDown">
                        Mỹ phẩm chính hãng tốt nhất hiện nay
                      </h1>
                      <a
                        href
                        className="btn btn-primary rounded-pill py-sm-3 px-sm-5"
                      >
                        Products
                      </a>
                      <a
                        href
                        className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3"
                      >
                        Services
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img
                  className="img-fluid w-100"
                  src={AboutHomePage}
                  alt="Hình ảnh giới thiệu"
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-5 mb-4">COSMETICS</h1>
              <p className="mb-4">
                Cosmetics - thương hiệu đi đầu trong ngành phân phối mỹ phẩm
                chính hãng, phục vụ cho nhu cầu mua sắm & làm đẹp của hàng triệu
                khách hàng tại Việt Nam. Có mặt từ năm 2012, Nuty đã mở rộng thị
                phần & nhanh chóng trở thành một trong những địa chỉ mua sắm mỹ
                phẩm uy tín trong lòng khách hàng, đến nay Nuty đã có 9 showroom
                từ Bắc chí Nam. Với sự phát triển không ngừng trong suốt 10 năm
                qua, các thương hiệu mỹ phẩm trong và ngoài nước đồng loạt ký
                hợp đồng chiến lược cùng Nuty Cosmetics để mang đến những sản
                phẩm chất lượng, hiệu quả và an toàn với người tiêu dùng.
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Đối với tín đồ yêu mỹ phẩm, mỗi sự khởi đầu của vẻ đẹp đều bắt
                nguồn từ những sản phẩm chất lượng.
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Yên tâm mua mỹ phẩm chính hãng từ các thương hiệu lớn trên thế
                giới
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Giá rẻ nhất thị trường - Ở đâu rẻ hơn NUTY hoàn tiền chênh lệch
              </p>
              <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href>
                Tìm hiểu thêm
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Feature Start */}
      <div className="container-fluid bg-light bg-icon my-5 py-6">
        <div className="container">
          <div
            className="section-header text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <h1 className="display-5 mb-3">Dịch vụ của chúng tôi</h1>
            <p>Luôn đem đến cho bạn sự trải nghiệm dịch vụ tốt nhất</p>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img
                  className="img-fluid mb-4"
                  src="https://nuty.vn/data/sites/1/skins/default/img/footer-icon.png"
                  alt=""
                />
                <h4 className="mb-3">GIAO HÀNG TOÀN QUỐC</h4>
                <p className="mb-4">
                  Hỗ trợ phí ship rẻ nhất cho các quận, tỉnh thành trên cả nước.
                </p>
                <a
                  className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                  href
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img
                  className="img-fluid mb-4"
                  src="https://nuty.vn/Data/Sites/1/media/icon/shipping-fast.png"
                  alt=""
                />
                <h4 className="mb-3">GIAO HÀNG NHANH</h4>
                <p className="mb-4">
                  Giao hàng nhanh chóng trong nội thành HCM và Hà Nội.
                </p>
                <a
                  className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                  href
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="bg-white text-center h-100 p-4 p-xl-5">
                <img
                  className="img-fluid mb-4"
                  src="https://nuty.vn/Data/Sites/1/media/icon/globe-americas.png"
                  alt=""
                />
                <h4 className="mb-3">THƯƠNG HIỆU UY TÍN</h4>
                <p className="mb-4">
                  Đảm bảo tất cả sản phẩm được bán ra là 100% chính hãng
                </p>
                <a
                  className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                  href
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}
      {/* Product Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-lg-6">
              <div
                className="section-header text-start mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: "500px" }}
              >
                <h1 className="display-5 mb-3">Sản phẩm mới nhất</h1>
                <p>Hàng hoá luôn được cập nhật liên tục</p>
              </div>
            </div>
            <div
              className="col-lg-6 text-start text-lg-end wow slideInRight"
              data-wow-delay="0.1s"
            >
              <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                <li className="nav-item me-2">
                  <a
                    className="btn btn-outline-primary border-2 active"
                    data-bs-toggle="pill"
                    href="#tab-1"
                  >
                    Son môi
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a
                    className="btn btn-outline-primary border-2"
                    data-bs-toggle="pill"
                    href="#tab-2"
                  >
                    Sữa rửa mặt{" "}
                  </a>
                </li>
                <li className="nav-item me-0">
                  <a
                    className="btn btn-outline-primary border-2"
                    data-bs-toggle="pill"
                    href="#tab-3"
                  >
                    Kem chống nắng
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 1
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 2
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 3
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 4
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 5
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 6
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 7
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 8
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 text-center wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <a className="btn btn-primary rounded-pill py-3 px-5" href>
                    Xem thêm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product End */}

      {/* Product Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-lg-6">
              <div
                className="section-header text-start mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: "500px" }}
              >
                <h1 className="display-5 mb-3">Sản phẩm bán chạy</h1>
                <p>Sản phẩm được ưa chuộng nhất thời gian qua</p>
              </div>
            </div>
            <div
              className="col-lg-6 text-start text-lg-end wow slideInRight"
              data-wow-delay="0.1s"
            >
              <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                <li className="nav-item me-2">
                  <a
                    className="btn btn-outline-primary border-2 active"
                    data-bs-toggle="pill"
                    href="#tab-1"
                  >
                    Son môi
                  </a>
                </li>
                <li className="nav-item me-2">
                  <a
                    className="btn btn-outline-primary border-2"
                    data-bs-toggle="pill"
                    href="#tab-2"
                  >
                    Sữa rửa mặt{" "}
                  </a>
                </li>
                <li className="nav-item me-0">
                  <a
                    className="btn btn-outline-primary border-2"
                    data-bs-toggle="pill"
                    href="#tab-3"
                  >
                    Kem chống nắng
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 1
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 2
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 3
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 4
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 5
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 6
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 7
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item">
                    <div className="position-relative bg-light overflow-hidden">
                      <img className="img-fluid w-100" src={Lipstick} alt="" />
                      <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        New
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <a className="d-block h5 mb-2" href>
                        Son môi 8
                      </a>
                      <span className="text-primary me-1">$19.00</span>
                      <span className="text-body text-decoration-line-through">
                        $29.00
                      </span>
                    </div>
                    <div className="d-flex border-top">
                      <small className="w-50 text-center border-end py-2">
                        <a className="text-body" href>
                          <i className="fa fa-eye text-primary me-2" />
                          View detail
                        </a>
                      </small>
                      <small className="w-50 text-center py-2">
                        <a className="text-body" href>
                          <i className="fa fa-shopping-bag text-primary me-2" />
                          Add to cart
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 text-center wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <a className="btn btn-primary rounded-pill py-3 px-5" href>
                    Xem thêm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product End */}

      {/* Blog Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="section-header text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <h1 className="display-5 mb-3">Bài viết mới viết</h1>
            <p>Cung cấp các thông tin giúp các bạn lựa chọn sản phẩm phù hợp</p>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <img
                className="img-fluid"
                src="https://vinmec-prod.s3.amazonaws.com/images/20210313_063949_898085_my-pham-an-toan.max-800x800.jpg"
                alt=""
              />
              <div className="bg-light p-4">
                <a className="d-block h5 lh-base mb-4" href>
                  Màu son trendy với mùa hè năm nay
                </a>
                <div className="text-muted border-top pt-4">
                  <small className="me-3">
                    <i className="fa fa-user text-primary me-2" />
                    Admin
                  </small>
                  <small className="me-3">
                    <i className="fa fa-calendar text-primary me-2" />
                    01 Jan, 2045
                  </small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <img
                className="img-fluid"
                src="https://vinmec-prod.s3.amazonaws.com/images/20210313_063949_898085_my-pham-an-toan.max-800x800.jpg"
                alt=""
              />
              <div className="bg-light p-4">
                <a className="d-block h5 lh-base mb-4" href>
                  Kem chống nắng dành cho da dầu
                </a>
                <div className="text-muted border-top pt-4">
                  <small className="me-3">
                    <i className="fa fa-user text-primary me-2" />
                    Admin
                  </small>
                  <small className="me-3">
                    <i className="fa fa-calendar text-primary me-2" />
                    01 Jan, 2045
                  </small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <img
                className="img-fluid"
                src="https://vinmec-prod.s3.amazonaws.com/images/20210313_063949_898085_my-pham-an-toan.max-800x800.jpg"
                alt=""
              />
              <div className="bg-light p-4">
                <a className="d-block h5 lh-base mb-4" href>
                  Cách lựa chọn màu son ưng ý
                </a>
                <div className="text-muted border-top pt-4">
                  <small className="me-3">
                    <i className="fa fa-user text-primary me-2" />
                    Admin
                  </small>
                  <small className="me-3">
                    <i className="fa fa-calendar text-primary me-2" />
                    01 Jan, 2045
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}
    </div>
  );
}
