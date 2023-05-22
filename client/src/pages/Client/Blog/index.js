import React, { useCallback, useEffect, useRef, useState } from "react";
import { blogAPI } from "../../../services/blogAPI";
import BlogItem from "../../../components/BlogItem";
import SearchBar from "../../../components/SearchBar";
import { debounce } from "@mui/material";

const BLOG_IN_PAGE = 12;

export default function BlogPage() {
  const [listBlog, setListBlog] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const searchText = useRef("");

  const getBlogList = async (page, search) => {
    const blog = await blogAPI.getAllBlogList(BLOG_IN_PAGE, page, search);
    const { payload } = blog;

    if (payload) {
      const total = payload?.total;
      const blog = payload?.blog;

      if (page > currentPage) {
        const newBlog = [...listBlog];
        newBlog?.push(...blog);
        setListBlog(newBlog);
      } else {
        setListBlog(blog);
      }
      setCurrentPage(page);
      setTotalPage(Math.ceil(total / BLOG_IN_PAGE));
    }
  };

  useEffect(() => {
    getBlogList(currentPage);
  }, []);

  const debounceSearch = useCallback(
    debounce(() => {
      getBlogList(0, searchText.current);
    }, 200),
    []
  );

  return (
    <div>
      <div
        className="container-fluid page-header wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <h1 className="display-3 mb-3 animated slideInDown">
            Trang bài viết
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
                Trang bài viết
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-xxl py-6">
        <div className="container">
          <div
            className="section-header text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <h1 className="display-5 mb-3">Bài Viết</h1>
            <p>
              Những bài viết mới mẻ sẽ đem lại những kiến thức thú vị dành cho
              bạn
            </p>
          </div>

          <SearchBar
            handleChange={(value) => (searchText.current = value)}
            debounceSearch={() => debounceSearch()}
            handleSubmit={() => getBlogList(0, searchText.current)}
          />

          <div className="row g-4">
            {listBlog?.map((blogItem, blogIndex) => {
              return (
                <BlogItem
                  blogCreated={blogItem?.create_at}
                  blogId={blogItem?._id}
                  blogImage={blogItem?.blog_image}
                  blogTitle={blogItem?.blog_title}
                  key={blogIndex}
                />
              );
            })}
            <div
              className="col-12 text-center wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {currentPage + 1 < totalPage ? (
                <a
                  className="btn btn-primary rounded-pill py-3 px-5"
                  href
                  onClick={() => getBlogList(currentPage + 1)}
                >
                  Xem thêm
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
