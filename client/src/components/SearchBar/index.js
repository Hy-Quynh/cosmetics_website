import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./index.scss";

export default function SearchBar({
  handleChange,
  debounceSearch,
  handleSubmit,
  handleClick,
  ref,
  customStyle,
}) {
  return (
    <div className="homeSearchBar">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          style={customStyle}
          placeholder="Nhập từ bạn muốn tìm kiếm"
          onChange={(event) => handleChange(event?.target?.value)}
          onKeyUp={(event) => {
            if (event?.code === "Backspace") {
              debounceSearch?.();
            }
          }}
          ref={ref}
          onClick={() => handleClick?.()}
        />
        <button
          type="submit"
          className="searchButton"
          onClick={() => handleSubmit()}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
