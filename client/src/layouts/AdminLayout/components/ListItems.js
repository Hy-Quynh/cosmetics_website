import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ADMIN_ROLE } from "../../../utils/contants";
import { useLocation, useNavigate } from "react-router-dom";

export default function MainListItems() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <React.Fragment>
      {ADMIN_ROLE?.map((item, index) => {
        return (
          <ListItemButton
            key={`role-item-${index}`}
            onClick={() => {
              navigate(`${item?.href}`);
            }}
            sx={{
              background: location?.pathname === item?.href ? "#e8e2e1" : "",
            }}
          >
            <ListItemIcon>{item?.icon}</ListItemIcon>
            <ListItemText primary={item?.label} />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );
}
