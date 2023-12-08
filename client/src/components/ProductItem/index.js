import React from "react";
import { FORMAT_NUMBER, USER_INFO_KEY } from "../../utils/contants";
import { parseJSON } from "../../utils/helpers";
import { toast } from "react-toastify";
import { addProductToCart } from "../../utils/util";
import moment from "moment";

export default function ProductItem({
  image,
  isNew,
  name,
  price,
  salePrice,
  id,
  currentQuantity,
  start_new,
  end_new,
}) {
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY));

  return (
    <div className="product-item">
      <div className="position-relative bg-light overflow-hidden">
        <img
          className="img-fluid w-100"
          src={image}
          alt=""
          style={{ height: "300px" }}
        />
        {start_new && end_new && 
        moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').isSameOrAfter(moment(moment(start_new).format('DD-MM-YYYY'), 'DD-MM-YYYY')) &&
        moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').isSameOrBefore(moment(moment(end_new).format('DD-MM-YYYY'), 'DD-MM-YYYY'))  ? (
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

        {Number(price) === Number(salePrice) || Number(salePrice) <= 0 ? (
          <div className="text-primary me-1">
            <span>{FORMAT_NUMBER.format(price)} đ</span>
          </div>
        ) : (
          <div className="text-primary me-1">
            <span>
              {Number(salePrice) > 0 && Number(salePrice) !== Number(price)
                ? FORMAT_NUMBER.format(salePrice)
                : FORMAT_NUMBER.format(price)}{" "}
              đ
            </span>
            {Number(salePrice) > 0 && Number(salePrice) !== Number(price) ? (
              <span
                className="text-body text-decoration-line-through"
                style={{ marginLeft: "10px" }}
              >
                {FORMAT_NUMBER.format(price)} đ
              </span>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <div className="d-flex border-top">
        <small className="w-50 text-center border-end py-2">
          <a className="text-body" href={`/product/${id}`}>
            <i className="fa fa-eye text-primary me-2" />
            Xem chi tiết
          </a>
        </small>
        <small className="w-50 text-center py-2">
          <a
            className="text-body"
            style={{ cursor: "pointer" }}
            href
            onClick={() => {
              if (!userData?._id) {
                return toast.error(
                  "Bạn cần đăng nhập để thực hiện chức năng này"
                );
              }

              if (Number(currentQuantity) < 1) {
                return toast.error(
                  "Số lượng lớn hơn số lượng sản phẩm hiện có"
                );
              }

              addProductToCart({
                product_id: id,
                product_name: name,
                product_price: price,
                product_sale: salePrice,
                product_image: image,
                quantity: 1,
              });
              toast.success("Thêm vào giỏ hàng thành công");
            }}
          >
            <i className="fa fa-shopping-bag text-primary me-2" />
            Thêm vào giỏ
          </a>
        </small>
      </div>
    </div>
  );
}
