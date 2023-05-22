import React, { useEffect, useState } from "react";
import { dateTimeConverter, parseJSON } from "../../../utils/helpers";
import { blogAPI } from "../../../services/blogAPI";
import { USER_INFO_KEY } from "../../../utils/contants";
import { Markup } from "interweave";
import "./style.scss";
import BlogReview from "./components/BlogReview";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BlogDetailPage() {
  const [postDetail, setBlogDetail] = useState({});
  const [relativeBlog, setRelativeBlog] = useState([]);
  const [userFavourite, setUserFavourite] = useState(false);
  const { blogId } = useParams();
  const userData = parseJSON(localStorage.getItem(USER_INFO_KEY), {});

  const getBlogData = async () => {
    const detail = await blogAPI.getBlogById(blogId);
    if (detail?.success) {
      const payload = detail?.payload;
      const changeView = await blogAPI.changeBlogView(
        blogId,
        payload?.blog_view + 1
      );

      if (changeView?.success) {
        payload.blog_view = payload?.blog_view + 1;
      }
      setBlogDetail(payload);
    }
  };

  const getRelativeBlog = async () => {
    const post = await blogAPI.getAllRelativeBlog(5, 0, blogId);
    if (post?.payload?.length) setRelativeBlog(post?.payload);
  };

  const getUserBlogFavourite = async () => {
    const favourite = await blogAPI.getUserFavouriteBlog(userData?._id, blogId);
    if (favourite?.success) {
      setUserFavourite(favourite?.payload);
    }
  };

  useEffect(() => {
    getBlogData();
    getRelativeBlog();
  }, []);

  useEffect(() => {
    if (blogId && userData?._id) {
      getUserBlogFavourite();
    }
  }, [blogId, userData]);

  const handleChangeBlogFavourite = async (status) => {
    if (!userData?._id) {
      return toast.error("Bạn cần đăng nhập để thực hiện chức năng này");
    }

    const changeRes = await blogAPI.changeUserFavouriteBlog(
      userData?._id,
      blogId,
      status
    );

    if (changeRes?.success) {
      setUserFavourite(status);
      if (status) {
        setBlogDetail({
          ...postDetail,
          count_favourite: Number(postDetail?.count_favourite) + 1,
        });
      } else {
        setBlogDetail({
          ...postDetail,
          count_favourite: Number(postDetail?.count_favourite) - 1,
        });
      }
    }
  };

  return (
    <div>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <h1 className="display-3 mb-3 animated slideInDown">
            Trang chi tiết bài viết
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a className="text-body" href="/">
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item">
                <a className="text-body" href="/post">
                  Trang bài viết
                </a>
              </li>
              <li
                className="breadcrumb-item text-dark active"
                aria-current="page"
              >
                {postDetail?.blog_title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container-xxl py-6">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-8">
              <div
                className="section-header text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <h1 className="mb-3">{postDetail?.blog_title}</h1>
              </div>
              <div
                style={{ width: "100%", height: "500px", position: "relative" }}
              >
                <img
                  src={postDetail?.blog_image}
                  alt="post-image"
                  placeholder="blur"
                  style={{width: '100%', height: '95%'}}
                />
              </div>
              <div className="text-muted border-top pt-4">
                <small className="me-3">
                  <i className="fa fa-calendar text-primary me-2" />
                  {dateTimeConverter(postDetail?.create_at)}
                </small>
                <small className="me-3">
                  <i className="fa fa-eye text-success me-2" />
                  {postDetail?.blog_view}
                </small>
                <small className="me-3">
                  <Tooltip
                    title={
                      userFavourite
                        ? "Nhấn vào để bỏ yêu thích"
                        : "Nhấn vào để yêu thích bài viết"
                    }
                    placement="top"
                  >
                    {userFavourite ? (
                      <FavoriteIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleChangeBlogFavourite(false)}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleChangeBlogFavourite(true)}
                      />
                    )}
                  </Tooltip>
                  {postDetail?.count_favourite}
                </small>
              </div>

              <div
                style={{ width: "100%", marginTop: "50px" }}
                className='post-detail-description'
              >
                <Markup content={postDetail?.blog_desc} />
              </div>
            </div>
            <div className="col-md-1" />
            <div className="col-12 col-md-3">
              <div
                className="text-center mx-auto mb-5 wow fadeInUp mt-5"
                data-wow-delay="0.1s"
              >
                <h4 className="mb-3" style={{marginTop: '4.7rem'}}>Bài viết mới nhất</h4>
                <div className="row g-4" style={{ justifyContent: "center" }}>
                  {relativeBlog?.map((blogItem, blogIndex) => {
                    return (
                      <div
                        className="col-12 wow fadeInUp"
                        data-wow-delay="0.1s"
                        key={`post-item-${blogIndex}`}
                        style={{ marginTop: blogIndex !== 0 ? "30px" : "" }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "180px",
                          }}
                        >
                          <img
                            src={blogItem?.blog_image}
                            // layout="fill"
                            style={{width: '100%', height: '100%'}}
                            alt="post-iamge"
                            placeholder="blur"
                          />
                        </div>
                        <div className="bg-light p-1">
                          <a
                            className="d-block h5 lh-base mb-1"
                            href={`/blog/${blogItem?._id}`}
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              maxWidth: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              padding: "5px 10px",
                            }}
                          >
                            {blogItem?.blog_title}
                          </a>
                          <div className="text-muted border-top pt-1">
                            <small className="me-3">
                              <i className="fa fa-calendar text-primary me-2" />
                              {dateTimeConverter(blogItem?.create_at)}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4 mt-5">
            <BlogReview />
          </div>
        </div>
      </div>
    </div>
  );
}
