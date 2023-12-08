import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "../../../components/ProductItem";
import { categoryAPI } from "../../../services/categoryAPI";
import { productAPI } from "../../../services/productAPI";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import { FORMAT_NUMBER } from "../../../utils/contants";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import _debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import { useLocation } from "react-router-dom";

const PRODUCT_IN_PAGE = 12;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000000;

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 60,
    height: 60,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function Product() {
  const [listCategory, setListCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [priceSlider, setPriceSlider] = useState([MIN_PRICE, MAX_PRICE]);
  const searchText = useRef("");
  const searchInputRef = useRef(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();
  const search = useLocation().search;
  const queryCategory = new URLSearchParams(search).get("category");

  const getCategoryData = async () => {
    const categoryList = await categoryAPI.getAllCategory();
    const category = categoryList?.payload?.category;
    if (category?.length) {
      const allCategory = [...category];
      allCategory?.unshift({
        _id: -1,
        category_name: "Tất cả",
      });
      setListCategory(allCategory);
      if (!queryCategory) {
        setActiveCategory(allCategory[0]?._id);
      } else {
        setActiveCategory(Number(queryCategory));
      }
    }
  };

  const getProductData = async (
    categoryId,
    page,
    search,
    minPrice,
    maxPrice
  ) => {
    const productList = await productAPI.getListProduct(
      search,
      PRODUCT_IN_PAGE,
      page,
      categoryId === -1 ? undefined : categoryId,
      minPrice,
      maxPrice
    );
    const product = productList?.payload?.product;
    const total = productList?.payload?.total;

    if (product) {
      if (page > currentPage) {
        const newPrd = [...listProduct];
        newPrd?.push(...product);
        setListProduct(newPrd);
      } else {
        setListProduct(product);
      }

      setTotalPage(Math.ceil(total / PRODUCT_IN_PAGE));
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  React.useEffect(() => {
    getProductData(
      activeCategory,
      currentPage,
      searchText.current,
      priceSlider?.[0],
      priceSlider?.[1]
    );
  }, [activeCategory]);

  const getRecommendedProduct = async () => {
    const productList = await productAPI.getListProduct(
      searchText.current,
      5,
      undefined,
      activeCategory === -1 ? undefined : activeCategory
    );

    const product = productList?.payload?.product || [];
    setIsComponentVisible(true);
    setSearchList(product);
  };

  const debounceFn = useCallback(_debounce(getRecommendedProduct, 200), []);

  return (
    <div>
      <div
        className="container-fluid page-header mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <h1 className="display-3 mb-3 animated slideInDown">
            Trang sản phẩm
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a className="text-body" href="/">
                  Trang chủ
                </a>
              </li>
              <li
                className="breadcrumb-item text-dark active"
                aria-current="page"
              >
                Sản phẩm
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
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
                <h1 className="display-5 mb-3">Sản phẩm</h1>
                <p>
                  Luôn cam kết mang đến những sản phẩm tốt và chất lượng nhất
                  đến với bạn
                </p>
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
          <div className="row g-0 gx-5 align-items-start mb-5">
            <div className={`col-lg-5`} style={{ marginTop: "20px" }}>
              <Typography gutterBottom>Tìm kiếm</Typography>
              <div style={{ position: "relative" }}>
                <SearchBar
                  handleClick={() => {
                    if (!isComponentVisible && searchText.current?.length) {
                      setIsComponentVisible(true);
                    }
                  }}
                  customStyle={{ width: "70%" }}
                  handleChange={(value) => {
                    searchText.current = value;
                    debounceFn(value);
                  }}
                  ref={searchInputRef}
                  handleSubmit={() => {
                    getProductData(
                      activeCategory,
                      currentPage,
                      searchText.current,
                      priceSlider?.[0],
                      priceSlider?.[1]
                    );
                  }}
                />
                {(isComponentVisible && (
                  <ul
                    ref={ref}
                    style={{
                      maxHeight: "300px",
                      overflow: "auto",
                      background: "white",
                      position: "absolute",
                      width: "calc(70% + 40px)",
                      zIndex: 50,
                      padding: "10px",
                      marginTop: "-50px",
                      borderBottom: "1px solid #3CB914",
                      borderLeft: "1px solid #3CB914",
                      borderRight: "1px solid #3CB914",
                      listStyleType: "none",
                    }}
                  >
                    {searchList?.length ? (
                      searchList?.map((item, index) => {
                        return (
                          <>
                            <li
                              key={`search-list-item-${index}`}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                navigate(`/product/${item?._id}`);
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <img
                                    src={item?.product_image}
                                    width={50}
                                    height={50}
                                    placeholder="blur"
                                    alt=""
                                  />
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                  {item?.product_name}
                                </div>
                              </div>
                            </li>
                            {index < searchList?.length - 1 && (
                              <Divider sx={{ my: "10px" }} />
                            )}
                          </>
                        );
                      })
                    ) : (
                      <li>Không có sản phẩm trùng khớp</li>
                    )}
                  </ul>
                )) ||
                  ""}
              </div>
            </div>
            <div className={`col-lg-2`} />
            <div className="col-lg-5" style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={{ width: "calc(100% - 90px)" }}>
                  <Typography gutterBottom>Lọc theo giá</Typography>
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    value={priceSlider}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={1000}
                    onChange={(event, newValue) => {
                      setPriceSlider(newValue);
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="px-3 py-1"
                      style={{
                        border: "1px solid rgb(60,185,20)",
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {FORMAT_NUMBER.format(priceSlider[0])}
                    </div>
                    <div
                      className="px-3 py-1"
                      style={{
                        border: "1px solid rgb(60,185,20)",
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {FORMAT_NUMBER.format(priceSlider[1])}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "60px",
                    marginLeft: "30px",
                    marginTop: "-15px",
                  }}
                >
                  <FilterAltIcon
                    sx={{ cursor: "pointer", color: "#3CB914" }}
                    onClick={() =>
                      getProductData(
                        activeCategory,
                        currentPage,
                        searchText.current,
                        priceSlider?.[0],
                        priceSlider?.[1]
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tab-content">
            {listProduct?.length ? (
              <div className="row g-4">
                {listProduct?.map((item, index) => {
                  return (
                    <div
                      className="col-xl-3 col-lg-4 col-md-6 wow"
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
            ) : (
              <div style={{ textAlign: "center" }}>
                Không có sản phẩm phù hợp
              </div>
            )}
            {currentPage + 1 < totalPage ? (
              <div class="col-12 text-center mt-5">
                <a
                  class="btn btn-primary rounded-pill py-3 px-5"
                  onClick={() =>
                    getProductData(
                      activeCategory,
                      currentPage + 1,
                      searchText.current,
                      priceSlider[0],
                      priceSlider[1]
                    )
                  }
                >
                  Xem thêm
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* Product End */}
    </div>
  );
}

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
