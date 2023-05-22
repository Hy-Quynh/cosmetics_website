import React, { useEffect, useState } from "react";
import { blogAPI } from "../../../../../services/blogAPI";
import BlogItem from "../../../../../components/BlogItem";
const LIMIT_POST = 12;

export default function ListBlog() {
  const [listBlog, setListBlog] = useState([]);

  const getBlogData = async () => {
    const postList = await blogAPI.getAllBlogList(LIMIT_POST, 0);
    if (postList?.success) {
      setListBlog(postList?.payload?.blog);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="section-header text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "500px" }}
        >
          <h1 className="display-5 mb-3">Bài viết mới viết</h1>
          <p>Cung cấp các thông tin giúp các bạn lựa chọn sản phẩm phù hợp</p>
        </div>
        <div className="row g-4">
          {listBlog?.map((item, index) => {
            return (
              <BlogItem
                blogCreated={item?.create_at}
                blogImage={item?.blog_image}
                blogTitle={item?.blog_title}
                blogId={item?._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
