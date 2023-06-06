import React from "react";
import AboutCosmetic from "../../../assets/imgs/about-cosmetic.jpeg";

export default function AboutPage() {
  return (
    <div>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <h1 className="display-3 mb-3 animated slideInDown">Về chúng tôi</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a className="text-body" href="#">
                  Trang chủ
                </a>
              </li>
              <li
                className="breadcrumb-item text-dark active"
                aria-current="page"
              >
                Về chúng tôi
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img className="img-fluid w-100" src={AboutCosmetic} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-5 mb-4">COSMENTIC STORE</h1>
              <p className="mb-4">
                Cosmetic thương hiệu đi đầu trong ngành phân phối mỹ phẩm chính
                hãng, phục vụ cho nhu cầu mua sắm & làm đẹp của hàng triệu khách
                hàng tại Việt Nam.
              </p>
              <p className="mb-4">
                Có mặt từ năm 2009, Cosmetic đã mở rộng thị phần & nhanh chóng
                trở thành một trong những địa chỉ mua sắm mỹ phẩm uy tín trong
                lòng khách hàng, đến nay Cosmetic đã có 9 showroom từ Bắc chí
                Nam.
              </p>
              <p className="mb-4">
                Với sự phát triển không ngừng trong suốt 14 năm qua, các thương
                hiệu mỹ phẩm trong và ngoài nước đồng loạt ký hợp đồng chiến
                lược cùng Cosmetics để mang đến những sản phẩm chất lượng, hiệu
                quả và an toàn với người tiêu dùng.
              </p>
              <p className="mb-4">
                Đồng thời nhờ sự "hậu thuẫn" rất lớn từ các tập đoàn mỹ phẩm lớn
                mạnh, Cosmetic cam kết mỹ phẩm chính hãng & có giá bán lẻ rẻ
                nhất thị trường, Ở ĐÂU RẺ HƠN COSMETIC HOÀN TIỀN CHÊNH LỆCH.
              </p>
            </div>
          </div>
          <div className="row g-5 align-items-center">
            <p>
              Thấu hiểu được tầm quan trọng trong việc mang đến những sản phẩm
              chăm sóc da có hiệu quả thật sự cho làn da, Cosmetics đã không
              ngừng nỗ lực để trở thành địa chỉ mua sắm mỹ phẩm chính hãng cho
              hàng triệu khách hàng trên khắp cả nước. Mua hàng tại Cosmetics
              bạn sẽ có những lợi ích sau:
            </p>
            <ul style={{ marginTop: "0" }}>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Yên tâm mua mỹ phẩm chính hãng từ các thương hiệu lớn trên thế
                giới
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Giá rẻ nhất thị trường - Ở đâu rẻ hơn COSMETIC hoàn tiền chênh
                lệch
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Bắt kịp xu hướng làm đẹp và phong cách sống
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Dịch vụ chăm sóc khách hàng tận tâm
              </p>
              <p>
                <i className="fa fa-check text-primary me-3" />
                Không gian mua sắm thoải mái, sang trọng
              </p>
            </ul>
          </div>
          <div className="row g-5 align-items-center mt-2">
            <p style={{ marginTop: "10px" }}>
              Vẻ ngoài rạng rỡ xinh đẹp từ làn da đến vóc dáng sẽ giúp chúng ta
              tự tin hơn rất nhiều. Vậy nên đừng ngần ngại đến COSMETIC và chia
              sẻ với COSMETIC những mong muốn của bạn về những sản phẩm làm đẹp
              an toàn, hiệu quả.
            </p>
          </div>
        </div>
      </div>
      {/* About End */}
    </div>
  );
}
