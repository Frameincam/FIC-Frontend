import Link from "next/link";
import axios from "axios";
import NavbarThree from "../../../components/_App/NavbarThree";
import DashboardNavbar from "../../../components/Dashboard/DashboardNavbar";
import { useEffect, useState } from "react";
import Navbar from "../../../components/_App/Navbar";

const Reviews = () => {
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState();
  const [show,setShow] = useState(true)
  // const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log(vendorId);
      const vendor = JSON.parse(localStorage.getItem("user"));
      setToken(localStorage.getItem("token"));
      // setVendorId(u._id);
      console.log(vendor._id);
      getReviews(vendor._id);
    } else {
      console.log("we are running on the server");
    }
  }, []);

  const getReviews = async (vendorId) => {
    console.log(vendorId, "api");
    try {
      const { data } = await axios.get(
        `${process.env.DOMAIN_NAME}/api/get-review/${vendorId}`
      );
      console.log(data);
      setReviews(data.review);
    } catch (error) {
      console.log(error);
    }
  };

  const replaySubmit = async (e, customerId) => {
    e.preventDefault();
    const d = {
      id: customerId,
      reply: reply,
    };
    try {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/create-replay/${token}`,
        d
      );
      console.log(data);
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardNavbar />

      <div className="main-content d-flex flex-column">
        <Navbar navbar={show} />

        <div className="breadcrumb-area">
          <h1>Reviews</h1>
          <ol className="breadcrumb">
            <li className="item">
              <Link href="/dashboard">
                <a>Home</a>
              </Link>
            </li>
            <li className="item">
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
            <li className="item">Reviews</li>
          </ol>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="visitor-reviews-box">
              <h3>Visitor Reviews</h3>
              <div className="row">
                {reviews.map((review) => {
                  let customerProfileImage = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${review.customerProfilePic}`;
                  let l = review.createdAt;
                  let reviewDate = new Date(l);
                  // let td = l.split("G");
                  return (
                    <div className="col-lg-6 col-md-6" key={review._id}>
                      <div className="user-review">
                        {review.customerProfilePic == undefined ? (
                          <img
                            src="/images/profile.png"
                            className="user"
                            width="200px"
                          />
                        ) : (
                          <img
                            src={customerProfileImage}
                            className="user"
                            alt="image"
                          />
                        )}
                        <div className="review-rating">
                          <div className="review-stars">
                            {review.customerRating >= 1 && (
                              <i className="bx bxs-star"></i>
                            )}
                            {review.customerRating >= 2 && (
                              <i className="bx bxs-star"></i>
                            )}
                            {review.customerRating >= 3 && (
                              <i className="bx bxs-star"></i>
                            )}
                            {review.customerRating >= 4 && (
                              <i className="bx bxs-star"></i>
                            )}
                            {review.customerRating >= 5 && (
                              <i className="bx bxs-star"></i>
                            )}

                            {review.customerRating <= 4 && (
                              <i className="bx bx-star"></i>
                            )}
                            {review.customerRating <= 3 && (
                              <i className="bx bx-star"></i>
                            )}
                            {review.customerRating <= 2 && (
                              <i className="bx bx-star"></i>
                            )}
                            {review.customerRating <= 1 && (
                              <i className="bx bx-star"></i>
                            )}
                          </div>
                          <span className="d-inline-block">
                            {review.customerName}
                          </span>
                          <span className="date">
                            <i className="bx bx-calendar"></i>
                            {reviewDate
                              .toString()
                              .split(" GMT+0530 (India Standard Time)")}
                          </span>
                        </div>
                        <p>
                          <strong className="">Review: </strong>
                          {review.customerReview}
                        </p>
                        {review.reply !== undefined ? (
                          <p>
                            <strong className="">Reply: </strong>
                            {review.reply}
                          </p>
                        ) : (
                          <div className="btn-box">
                            <form
                              onSubmit={(e) => replaySubmit(e, review._id)}
                              className="reply-view"
                            >
                              <div
                                className="form-group"
                                style={{ display: "flex" }}
                              >
                                <input
                                  style={{
                                    border: "none",
                                    borderBottom: "1px solid gray",
                                  }}
                                  type="text"
                                  placeholder="Replay here"
                                  onChange={(e) => setReply(e.target.value)}
                                />
                                <div className="btn-box">
                                  <button className="default-btn" type="submit">
                                    {" "}
                                    <i className="bx bx-reply"></i>replay
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow-1"></div>

        <div className="copyrights-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-6 col-md-6">
              <p>
                <i className="bx bx-copyright"></i><a href="#">FrameInCam</a>.
                All rights reserved
              </p>
            </div>

            {/* <div className="col-lg-6 col-sm-6 col-md-6 text-right">
              <p>
                Designed by ❤️{" "}
                <a
                  href="https://envytheme.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  EnvyTheme
                </a>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
