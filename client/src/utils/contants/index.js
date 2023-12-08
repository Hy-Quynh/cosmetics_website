import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TopicIcon from "@mui/icons-material/Topic";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_INFO_KEY = "user_info";
export const USER_CART_INFO = "user_cart";
export const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY

export const FORMAT_NUMBER = new Intl.NumberFormat();

export const ADMIN_ROLE = [
  {
    label: "Dashboard",
    value: "admin-dashboard",
    href: "/admin",
    icon: <DashboardIcon />,
  },
  {
    label: "Danh mục",
    value: "admin-category",
    href: "/admin/category",
    icon: <TopicIcon />,
  },
  {
    label: "Sản phẩm",
    value: "admin-product",
    href: "/admin/product",
    icon: <StorefrontIcon />,
  },
  {
    label: "Đơn hàng",
    value: "admin-order",
    href: "/admin/order",
    icon: <ShoppingBasketIcon />,
  },
  {
    label: "Bài viết",
    value: "admin-blog",
    href: "/admin/blog",
    icon: <PostAddIcon />,
  },
  {
    label: "Tài khoản",
    value: "admin-account",
    href: "/admin/account",
    icon: <PeopleIcon />,
  },
  {
    label: "Góp ý",
    value: "admin-contact",
    href: "/admin/contact",
    icon: <ContactPhoneIcon />,
  },
  {
    label: "Hướng dẫn mua hàng",
    value: "admin-guide",
    href: "/admin/buy-guide",
    icon: <AutoStoriesIcon />,
  },
  {
    label: "Tin nhắn",
    value: "admin-chat",
    href: "/admin/chat",
    icon: <TextsmsOutlinedIcon />,
  },
];

export const ORDER_STATUS = {
  CANCEL: 0,
  CONFIRM: 1,
  SHIPPING: 2,
  DELIVERED: 3
}

export const CHAT_HOST = "http://localhost:5005";