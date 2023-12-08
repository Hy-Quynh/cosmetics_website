import React from "react";
import { categoryAPI } from "../../../../../services/categoryAPI";
import { productAPI } from "../../../../../services/productAPI";
import ProductItem from "../../../../../components/ProductItem";

const LIMIT_CATEGORY = 5;
const LIMIT_PRODUCT = 12;

export default function NewProduct() {
  const [listCategory, setListCategory] = React.useState([]);
  const [listProduct, setListProduct] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState(0);

  const getCategoryData = async () => {
    const categoryList = await categoryAPI.getAllCategory(LIMIT_CATEGORY, 0);
    const category = categoryList?.payload?.category;
    if (category?.length) {
      setListCategory(category);
      setActiveCategory(category[0]?._id);
    }
  };

  const getProductData = async (categoryId) => {
    const productList = await productAPI.getListProduct(
      "",
      LIMIT_PRODUCT,
      0,
      categoryId
    );
    const { product } = productList?.payload;
    if (product) {
      setListProduct(product);
    }
  };

  React.useEffect(() => {
    getCategoryData();
  }, []);

  React.useEffect(() => {
    if (activeCategory > 0) {
      getProductData(activeCategory);
    }
  }, [activeCategory]);

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
              <h1 className="display-5 mb-3">Sản phẩm mới nhất</h1>
              <p>Hàng hoá luôn được cập nhật liên tục</p>
            </div>
          </div>
          <div
            className="col-lg-6 text-start text-lg-end wow slideInRight"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
              {listCategory?.map((item, index) => {
                return (
                  <li
                    className="nav-item me-2"
                    key={`home-category-item-${index}`}
                    onClick={() => {
                      setActiveCategory(item?._id);
                    }}
                    style={{ marginTop: "20px" }}
                  >
                    <a
                      className={`btn btn-outline-primary border-2 ${
                        activeCategory === item?._id ? "active" : ""
                      }`}
                      data-bs-toggle="pill"
                    >
                      {item?.category_name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4">
              {listProduct?.map((item, index) => {
                return (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                    key={`product-item-${index}`}
                  >
                    <ProductItem
                      id={item?._id}
                      image={item?.product_image}
                      isNew={true}
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
