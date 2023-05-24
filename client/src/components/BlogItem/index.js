import React from "react";
import { dateTimeConverter } from "../../utils/helpers";

export default function BlogItem({
  blogImage,
  blogTitle,
  blogId,
  blogCreated,
}) {
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <img
        className="img-fluid"
        src={blogImage}
        alt=""
        style={{ height: "70%", minHeight: "300px", minWidth: "100%" }}
      />
      <div className="bg-light p-4">
        <a className="d-block h5 lh-base mb-4" href={`/blog/${blogId}`}>
          {blogTitle}
        </a>
        <div className="text-muted border-top pt-4">
          <small className="me-3">
            <i className="fa fa-calendar text-primary me-2" />
            {dateTimeConverter(blogCreated)}
          </small>
        </div>
      </div>
    </div>
  );
}
