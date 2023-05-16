import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TopicIcon from "@mui/icons-material/Topic";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_INFO_KEY = "user_info";
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
    label: "Tài khoản",
    value: "admin-account",
    href: "/admin/account",
    icon: <PeopleIcon />,
  },
];
