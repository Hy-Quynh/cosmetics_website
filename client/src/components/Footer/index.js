import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <h1 className="fw-bold text-primary mb-4">
                Cos<span className="text-secondary">me</span>tic
              </h1>
              <p>
                Cosmetic - thương hiệu đi đầu trong ngành phân phối mỹ phẩm
                chính hãng, phục vụ cho nhu cầu mua sắm & làm đẹp của hàng triệu
                khách hàng tại Việt Nam.
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-1"
                  href
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-1"
                  href
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-1"
                  href
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-0"
                  href
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-light mb-4">Địa chỉ</h4>
              <p>
                <i className="fa fa-map-marker-alt me-3" />
                123 Street, Hồ Chí Minh, Việt Nam
              </p>
              <p>
                <i className="fa fa-phone-alt me-3" />
                +012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope me-3" />
                info@example.com
              </p>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-light mb-4">Đường dẫn</h4>
              <a className="btn btn-link" href="/about">
                Về chúng tôi
              </a>
              <a className="btn btn-link" href="/contact">
                Liên hệ
              </a>
              <a className="btn btn-link" href="/service">
                Dịch vụ
              </a>
              <a className="btn btn-link" href="/service">
                Sản phẩm
              </a>
              <a className="btn btn-link" href="/service">
                Bài viết
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
      >
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
}
