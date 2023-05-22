import React from "react";
import { FORMAT_NUMBER } from "../../utils/contants";

export default function ProductItem({
  image,
  isNew,
  name,
  price,
  salePrice,
  id,
}) {
  return (
    <div className="product-item">
      <div className="position-relative bg-light overflow-hidden">
        <img className="img-fluid w-100" src={image} alt="" />
        {isNew ? (
          <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
            New
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="text-center p-4">
        <a className="d-block h5 mb-2" href={`/product/${id}`}>
          {name}
        </a>
        <span className="text-primary me-1">
          {" "}
          {Number(salePrice) > 0 && Number(salePrice) !== Number(price)
            ? salePrice
            : ""}
        </span>
        <span className="text-body text-decoration-line-through">
          {FORMAT_NUMBER.format(price) + "VNĐ"}
        </span>
      </div>
      <div className="d-flex border-top">
        <small className="w-50 text-center border-end py-2">
          <a className="text-body" href={`/product/${id}`}>
            <i className="fa fa-eye text-primary me-2" />
            Xem chi tiết
          </a>
        </small>
        <small className="w-50 text-center py-2">
          <a className="text-body" href>
            <i className="fa fa-shopping-bag text-primary me-2" />
            Thêm vào giỏ
          </a>
        </small>
      </div>
    </div>
  );
}
