import { USER_CART_INFO, USER_INFO_KEY } from "../contants";
import { parseJSON } from "../helpers";

export const addProductToCart = (cardData) => {
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});

  const currCart = parseJSON(
    localStorage.getItem(USER_CART_INFO + `_${userData?._id || ""}`),
    []
  );

  if (currCart?.length) {
    const findPrd = currCart?.findIndex(
      (item) => item?.product_id === cardData?.product_id
    );
    if (findPrd >= 0) {
      currCart[findPrd].quantity =
        Number(currCart[findPrd].quantity) + Number(cardData?.quantity);

      localStorage.setItem(
        USER_CART_INFO + `_${userData?._id || ""}`,
        JSON.stringify(currCart)
      );
      return window.dispatchEvent(new Event("storage"));
    }
  }
  
  currCart?.push(cardData);
  localStorage.setItem(
    USER_CART_INFO + `_${userData?._id || ""}`,
    JSON.stringify(currCart)
  );

  window.dispatchEvent(new Event("storage"));
};
