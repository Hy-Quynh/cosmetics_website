import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./index.scss";

export default function SearchBar({
  handleChange,
  debounceSearch,
  handleSubmit,
}) {
  return (
    <div className="homeSearchBar">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Bạn muốn tìm kiếm bài viết gì?"
          onChange={(event) => handleChange(event.target.value)}
          onKeyUp={(event) => {
            if (event?.code === "Backspace") {
              debounceSearch();
            }
          }}
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
