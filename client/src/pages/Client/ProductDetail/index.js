import React, { useEffect, useState } from "react";
import { productAPI } from "../../../services/productAPI";
import "./style.scss";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { USER_INFO_KEY, FORMAT_NUMBER } from "../../../utils/contants";
import { Markup } from "interweave";
import ProductDetailReview from "./components/ProductDetailReview";
import { addProductToCart } from "../../../utils/util";
import { toast } from "react-toastify";
import { parseJSON } from "../../../utils/helpers";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState({});
  const [currentTab, setCurrentTab] = useState(1);
  const [productQuantity, setProductQuantity] = useState(1);
  const { productId } = useParams();
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));

  const getProductDetail = async () => {
    const detail = await productAPI.getProductById(productId);
    if (detail?.success) {
      setProductDetail(detail?.payload);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="product-detail-page">
      <div className="pd-wrap">
        <div className="container">
          <div className="heading-section">
            <h1 className="display-5 mb-3">Chi tiết sản phẩm</h1>
          </div>
          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-md-6">
              <div className="item">
                <div style={{ position: "relative", width: "100%" }}>
                  <img
                    src={productDetail?.product_image}
                    style={{width: '70%', height: '70%'}}
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-md-6"
              style={{ paddingLeft: "30px", marginTop: "10px" }}
            >
              <div className="product-dtl">
                <div className="product-info">
                  <div
                    className="product-name"
                    style={{ fontSize: "35px", lineHeight: "50px" }}
                  >
                    {productDetail?.product_name}
                  </div>
                  <div
                    className="reviews-counter"
                    style={{ marginTop: "20px" }}
                  >
                    <ReviewsIcon sx={{ color: "#f5d442" }} />
                    <span style={{ marginLeft: "10px" }}>
                      {productDetail?.total_review} đánh giá
                    </span>
                  </div>
                  {Number(productDetail?.product_price) ===
                    Number(productDetail?.product_sale) ||
                  Number(productDetail?.product_sale) <= 0 ? (
                    <div className="product-price-discount">
                      <span>
                        {FORMAT_NUMBER.format(productDetail?.product_price)} đ
                      </span>
                    </div>
                  ) : (
                    <div className="product-price-discount">
                      <span>
                        {Number(productDetail?.sale_price) > 0 &&
                        Number(productDetail?.sale_price) !==
                          Number(productDetail?.product_price)
                          ? FORMAT_NUMBER.format(productDetail?.sale_price)
                          : FORMAT_NUMBER.format(
                              productDetail?.product_price
                            )}{" "}
                        đ
                      </span>
                      {Number(productDetail?.sale_price) > 0 &&
                      Number(productDetail?.sale_price) !==
                        Number(productDetail?.product_price) ? (
                        <span className="line-through">
                          {FORMAT_NUMBER.format(productDetail?.product_price)} đ
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <span style={{ fontWeight: 700, color: "#3CB914" }}>
                    Số lượng:
                  </span>{" "}
                  <span style={{ fontWeight: 700 }}>
                    {productDetail?.current_quantity || 0}
                  </span>
                </div>

                <div className="product-count">
                  <label htmlFor="size">Số lượng</label>
                  <form className="display-flex">
                    <div
                      className="qtyminus"
                      style={{ background: "#3CB914" }}
                      onClick={() => {
                        if (productQuantity - 1 >= 0) {
                          setProductQuantity(productQuantity - 1);
                        }
                      }}
                    >
                      -
                    </div>
                    <input
                      type="text"
                      name="quantity"
                      value={productQuantity}
                      className="qty"
                      style={{ border: "1px solid #3CB914" }}
                      onChange={(event) => {
                        setProductQuantity(event.target.value);
                      }}
                    />
                    <div
                      className="qtyplus"
                      style={{ background: "#3CB914" }}
                      onClick={() => {
                        setProductQuantity(productQuantity + 1);
                      }}
                    >
                      +
                    </div>
                  </form>
                  <a
                    className="round-black-btn"
                    style={{
                      background: "#3CB914",
                      borderColor: "#3CB914",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!userData?._id) {
                        return toast.error(
                          "Bạn cần đăng nhập để thực hiện chức năng này"
                        );
                      }

                      if (
                        productQuantity >
                        Number(productDetail?.current_quantity)
                      ) {
                        return toast.error(
                          "Số lượng lớn hơn số lượng sản phẩm hiện có"
                        );
                      }

                      addProductToCart({
                        product_id: productDetail?._id,
                        product_name: productDetail?.product_name,
                        product_price: productDetail?.product_price,
                        product_sale: productDetail?.product_sale,
                        product_image: productDetail?.product_image,
                        quantity: productQuantity,
                      });
                      toast.success("Thêm vào giỏ hàng thành công");
                    }}
                  >
                    Thêm vào giỏ
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="product-info-tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item" onClick={() => setCurrentTab(1)}>
                <a
                  className="nav-link"
                  style={{
                    cursor: "pointer",
                    color: currentTab === 1 ? "#3CB914" : "",
                  }}
                >
                  Mô tả
                </a>
              </li>
              <li className="nav-item" onClick={() => setCurrentTab(2)}>
                <a
                  className="nav-link"
                  style={{
                    cursor: "pointer",
                    color: currentTab === 2 ? "#3CB914" : "",
                  }}
                >
                  Đánh giá
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {currentTab === 1 ? (
                <div className="tab-pane fade show active">
                  <Markup content={productDetail?.product_description} />
                </div>
              ) : (
                <div style={{ marginTop: "30px" }}>
                  <ProductDetailReview />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
