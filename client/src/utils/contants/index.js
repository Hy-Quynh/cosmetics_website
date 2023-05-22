import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TopicIcon from "@mui/icons-material/Topic";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_INFO_KEY = "user_info";
export const USER_CART_INFO = "user_cart";

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
];
