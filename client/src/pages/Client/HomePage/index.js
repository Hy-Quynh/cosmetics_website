import React from "react";
import Banner1 from "../../../assets/imgs/banner1.jpeg";
import Banner2 from "../../../assets/imgs/banner2.jpeg";
import AboutHomePage from "../../../assets/imgs/about-homepage.jpeg";
import Lipstick from "../../../assets/imgs/lipstick.jpeg";
import ListBlog from "./components/ListBlog";
import NewProduct from "./components/NewProduct";
import SellingProduct from "./components/SellingProduct";

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
                        href='/'
                        className="btn btn-primary rounded-pill py-sm-3 px-sm-5"
                      >
                        Sản phẩm
                      </a>
                      <a
                        href
                        className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3"
                      >
                        Dịch vụ
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
                        href='/product'
                        className="btn btn-primary rounded-pill py-sm-3 px-sm-5"
                      >
                        Sản phẩm
                      </a>
                      <a
                        href
                        className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3"
                      >
                        Dịch vụ
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
                khách hàng tại Việt Nam. Có mặt từ năm 2012, Cosmetic đã mở rộng thị
                phần & nhanh chóng trở thành một trong những địa chỉ mua sắm mỹ
                phẩm uy tín trong lòng khách hàng, đến nay Cosmetic đã có 9 showroom
                từ Bắc chí Nam. Với sự phát triển không ngừng trong suốt 10 năm
                qua, các thương hiệu mỹ phẩm trong và ngoài nước đồng loạt ký
                hợp đồng chiến lược cùng Cosmetic Cosmetics để mang đến những sản
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
                Giá rẻ nhất thị trường - Ở đâu rẻ hơn Cosmetic hoàn tiền chênh lệch
              </p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* New product */}
      <NewProduct />

      {/* Selling product */}
      <SellingProduct />
      <ListBlog />
    </div>
  );
}
