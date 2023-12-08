import React, { useEffect } from "react";
import { productAPI } from "../../../../../services/productAPI";
import ProductItem from "../../../../../components/ProductItem";

export default function SellingProduct() {
  const [sellingProduct, setSellingProduct] = React.useState([]);

  const getSellingProductInfo = async () => {
    const productList = await productAPI.getSellingProduct();
    if (productList?.success) {
      setSellingProduct(productList?.payload);
    }
  };

  useEffect(() => {
    getSellingProductInfo();
  }, []);

  return (
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
        </div>
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4">
              {sellingProduct?.map((item, index) => {
                return (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                    key={`product-item-${index}`}
                  >
                    <ProductItem
                      id={item?._id}
                      image={item?.product_image}
                      isNew={false}
                      name={item?.product_name}
                      price={item?.product_price}
                      salePrice={item?.sale_price}
                      currentQuantity={item?.current_quantity}
                      start_new={item?.start_new}
                      end_new={item?.end_new}
                    />
                  </div>
                );
              })}
              <div
                className="col-12 text-center wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <a
                  className="btn btn-primary rounded-pill py-3 px-5"
                  href="/product"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
