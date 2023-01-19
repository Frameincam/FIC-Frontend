import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";

import Footer from "../../../components/_App/Footer";
import axios from "axios";
import { useRouter } from "next/router";
// import Navbar from "../../../components/_App/Navbar";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
// import swal from "sweetalert";
// import NavbarTwo from "../../components/_App/NavbarTwo";

import { BsFacebook, BsFillHeartFill, BsYoutube } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import Navbar from "../../../components/_App/Navbar";
import swal from "sweetalert";

const options = {
  loop: true,
  margin: 20,
  nav: true,
  mouseDrag: false,
  items: 1,
  dots: false,
  autoplay: true,
  smartSpeed: 500,

  navText: [
    "<i class='flaticon-left-chevron'></i>",
    "<i class='flaticon-right-chevron'></i>",
  ],
};

const SingleListings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [about, setAbout] = useState("");
  const [studio, setStudio] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [stateName, setStateName] = useState([]);
  const [city, setCity] = useState([]);
  const [service, setService] = useState([]);
  const [pack, setPack] = useState([]);
  const [experience, setExperience] = useState("");
  const [displayDropdownShare, setDisplayDropdownShare] = useState(false);
  const [vendorPhotos, setVendorPhotos] = useState([]);
  const [run, setRun] = useState(false);
  const [userType, setUserType] = useState();
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(null);
  const [token, setToken] = useState();
  const [custId, setCustId] = useState("");
  const [liked, setLiked] = useState(null);
  const [likeCount, setLikeCount] = useState();
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const [videos, setVideos] = useState([]);
  const [cPhotos, setCPhotos] = useState([]);
  const [carouselPicture, setCarouselPicture] = useState(false);

  const router = useRouter();
  console.log(router);
  const vendorId = router.query.id;

  const shareUrl = `https://frameincam.com/dashboard/photographer/?id=${vendorId}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
      console.log(vendorId);
      const u = JSON.parse(localStorage.getItem("user"));
      setToken(localStorage.getItem("token"));
      if (u != null) {
        setUserType(u.type);
        setCustName(u.name);
        setCustEmail(u.email);
        setCustId(u._id);
      }
      getVendor(vendorId);
      getReviews(vendorId);
      getVideos(vendorId);
    } else {
      console.log("we are running on the server");
    }
  }, [vendorId, run]);

  const toggleDropdownShare = () => {
    setDisplayDropdownShare(!displayDropdownShare);
  };

  const getVideos = async (vendorId) => {
    const d = {
      vendorId,
    };
    const { data } = await axios.get(
      `${process.env.DOMAIN_NAME}/api/vendor/video-url-get/${vendorId}`,
    );
    // console.log(d);
    console.log(data);
    if (data.vendorVideoUrl[0] != undefined) {
      setVideos(data.vendorVideoUrl[0].vendorsVideoUrl);
    }
  };

  const getReviews = async (vendorId) => {
    console.log(vendorId, "api");
    let custRatings = 0;
    try {
      const { data } = await axios.get(
        `${process.env.DOMAIN_NAME}/api/get-review/${vendorId}`
      );
      console.log(data);
      setReviews(data.review);
      data.review.map((rat) => {
        custRatings = parseInt(rat.customerRating) + custRatings;
      });
      const avg = Math.round(custRatings / data.review.length);
      console.log(avg);
      setAvgRating(avg);
    } catch (error) {
      console.log(error);
    }
  };

  const getVendor = async (vendorId) => {
    console.log(vendorId);
    // Fetching vendor by id
    try {
      const { data } = await axios.get(
        `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile/${vendorId}`
      );
      console.log(data);
      console.log(data.vendor.likedCustomers);
      const l = data.vendor.likedCustomers.some((like) => like == custId);
      // Store all the data in state
      setName(data.vendor.name);
      setEmail(data.vendor.email);
      setPhone(data.vendor.mobile);
      setStudio(data.vendor.studioName);
      setAbout(data.vendor.about);
      setWebsiteUrl(data.vendor.siteUrl);
      setFacebookUrl(data.vendor.fbUrl);
      setInstagramUrl(data.vendor.instaUrl);
      setYoutubeUrl(data.vendor.youtubeUrl);
      setCity(data.vendor.city);
      setStateName(data.vendor.state);
      setPack(data.vendor.packages);
      setService(data.vendor.services);
      setExperience(data.vendor.experience);
      setLiked(l);
      setLikeCount(data.vendor.likedCustomers.length);
      // console.log(liked);
      // console.log(data.vendor.siteUrl)
      let pictureUrl = [];
      let photoId = data.vendor.vendorPictures;

      for (var i = 0; i < photoId.length; i++) {
        if (photoId[i] !== null) {
          pictureUrl.push(`${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${photoId[i]}`
          );
        }
      }
      setVendorPhotos(pictureUrl);
      setCPhotos(pictureUrl);
      if (liked === null) {
        setRun(!run);
      }
      if (pictureUrl.length > 0) {
        if (vendorPhotos.length < 1) {
          setRun(!run);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reviewSubmit = async (e) => {
    console.log(reviews);
    e.preventDefault();
    console.log(rating);
    if (reviewMsg !== "" && rating !== null) {
      setError(false);
      const d = {
        vendorId,
        customerReview: reviewMsg,
        customerRating: rating,
      };
      console.log(d);
      try {
        const { data } = await axios.post(
          `${process.env.DOMAIN_NAME}/api/create-review/${token}`,
          d
        );
        console.log(data);

        if (data.success) {
          let custRatings = 0;
          swal({
            title: "Success",
            text: data.msg,
            icon: "success",
            button: "OK",
          });
          setReviewMsg("")
          setReviews(data.review);
          data.review.map((rat) => {
            custRatings = parseInt(rat.customerRating) + custRatings;
          });
          const avg = Math.round(custRatings / data.review.length);
          console.log(avg);
          setAvgRating(avg);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("p");
      return setError(true);
    }
  };

  const vendorLike = async () => {
    const likeData = {
      vendorId,
    };
    try {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/account/vendor/like-unlike/${token}`,
        likeData
      );
      console.log(data);
      if (data.success) {
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          button: "OK",
        });
        setLiked(data.like);
        console.log(data.like)
        if (data.like) {
          setLikeCount(likeCount + 1);
        }
        if (!data.like) {
          setLikeCount(likeCount - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVendorLikeWithoutLogin = () => {
    swal({
      title: "Error",
      text: "Please Login As Customer",
      icon: "error",
      button: "OK"
    })
  }

  const imagePopup = (id) => {
    console.log(id);
    let ind = cPhotos.indexOf(id);
    let n = cPhotos.length;
    let arr = cPhotos;
    // setVendorPhotos(vendorPhotos);
    for (let i = 0; i < ind; i++) {
      let x = arr[0];
      for (let j = 0; j < n - 1; ++j) {
        arr[j] = arr[j + 1];
      }

      arr[n - 1] = x;
    }
    setCPhotos(arr);
    setCarouselPicture(true);
  };
  const closeCarouselPopup = () => {
    setCarouselPicture(false);
  };

  return (
    <>
      <Navbar navColor={true} />
      {vendorId !== undefined ? (
        <section
          className="listings-details-area pb-70 pad "
          style={{ marginTop: "57px" }}
        >
          <div className="listings-details-image">
            <img
              src="/images/listings-details.jpg"
              alt="image"
              style={{ width: "100%" }}
            />
            <div className="container">
              <div className="container">
                <div className="listings-details-content">
                  <span className="meta">Photographer</span>
                  <h3>{name}</h3>
                  <div className="rating d-flex align-items-center">
                    {avgRating >= 1 && (
                      <span className="bx bxs-star checked"></span>
                    )}
                    {avgRating >= 2 && (
                      <span className="bx bxs-star checked"></span>
                    )}
                    {avgRating >= 3 && (
                      <span className="bx bxs-star checked"></span>
                    )}
                    {avgRating >= 4 && (
                      <span className="bx bxs-star checked"></span>
                    )}
                    {avgRating >= 5 && (
                      <span className="bx bxs-star checked"></span>
                    )}
                    {avgRating < 5 && (
                      <span className="bx bx-star checked"></span>
                    )}
                    {avgRating < 4 && (
                      <span className="bx bx-star checked"></span>
                    )}
                    {avgRating < 3 && (
                      <span className="bx bx-star checked"></span>
                    )}
                    {avgRating < 2 && (
                      <span className="bx bx-star checked"></span>
                    )}
                    {avgRating < 1 && (
                      <span className="bx bx-star checked"></span>
                    )}
                  </div>
                  <ul className="d-flex align-items-center">
                    <li className="phone-number">
                      <a href="#">
                        <i className="bx bx-phone-call"></i> {phone}
                      </a>
                    </li>
                    <li className="time">
                      <i className="bx bx-time-five"></i>
                      <span>Experience</span>
                      {experience == 1 && <>0 -3 years</>}
                      {experience == 2 && <>3 - 5 years</>}
                      {experience == 3 && <>5 -7 years</>}
                      {experience == 4 && <>7 -10 years</>}
                      {experience == 5 && <>10+ years</>}
                    </li>
                    <li className="location">
                      <i className="bx bx-map"></i>
                      <span>Location</span>
                      {stateName[0]} , {city[0]}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <ul className="share-save">
                <li>
                  <div className="share" onClick={toggleDropdownShare}>
                    <i className="bx bx-share-alt"></i> Share
                  </div>
                  {/*  */}

                  <div
                    className={
                      displayDropdownShare
                        ? "dropdown-menu show pad-none"
                        : "dropdown-menu "
                    }
                  >
                    <div className="share-icons">
                      <div>
                        <FacebookShareButton
                          url={shareUrl}
                          quote={"Welcome to Frame In Cam"}
                          hashtag={"#Photographer.."}
                        >
                          <BsFacebook size="27px" color="3B5998" />
                        </FacebookShareButton>
                      </div>
                      <div>
                        <EmailShareButton
                          url={shareUrl}
                          quote={"Welcome to Frame In Cam"}
                          hashtag={"#Photographer.."}
                        >
                          <MdEmail size="27px" color="red" />
                        </EmailShareButton>
                      </div>
                      <div>
                        <WhatsappShareButton
                          url={shareUrl}
                          quote={"Welcome to Frame In Cam"}
                          hashtag={"#Photographer.."}
                        >
                          <RiWhatsappFill size="27px" color="rgb(78 197 91)" />
                        </WhatsappShareButton>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="social">
                    <a href="#">
                      <i className="bx bxl-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxl-pinterest"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxl-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxl-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="bx bxl-whatsapp"></i>
                    </a>
                  </div>
                </li>

                <li>
                  <div className="like-btn">
                    {userType == "customer" ? (
                      <button onClick={vendorLike}>
                        {liked ? (
                          <>
                            <BsFillHeartFill fill="red" className="mr-1" />
                            {likeCount}
                          </>
                        ) : (
                          <>
                            <BsFillHeartFill className="mr-1" />
                            {likeCount}
                          </>
                        )}
                      </button>
                    ) : (
                      <button onClick={handleVendorLikeWithoutLogin}>
                        <>
                          <BsFillHeartFill className="mr-1" />
                          {likeCount}
                        </>
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="listings-details-desc reset">
                  <div className="products-details-tabs">
                    <Tabs>
                      <ul className="nav nav-tabs" id="myTab">
                        <TabList>
                          <Tab className="nav-item">
                            <a className="nav-link" id="overview-tab">
                              Overview
                            </a>
                          </Tab>
                          {vendorPhotos.length > 0 && (
                            <Tab className="nav-item">
                              <a className="nav-link" id="photos-tab">
                                Photos
                              </a>
                            </Tab>
                          )}
                          {videos.length > 0 && (
                            <Tab className="nav-item">
                              <a className="nav-link" id="videos-tab">
                                Videos
                              </a>
                            </Tab>
                          )}

                          <Tab className="nav-item">
                            {reviews.length > 0 && (
                              <a className="nav-link" id="reviews-tab">
                                Reviews
                              </a>
                            )}
                          </Tab>
                        </TabList>
                      </ul>

                      <div className="tab-content" id="myTabContent">
                        <TabPanel>
                          <div
                            className="tab-pane fade show active"
                            id="overview"
                            role="tabpanel"
                            style={{ maxWidth: "unset" }}
                          >
                            <div className="listings-details-desc">
                              <h3>About Us</h3>
                              {about}

                              <h3 id="services">Services</h3>
                              <ul
                                className="amenities-list"
                                style={{ listStyle: "none" }}
                              >
                                {service.map((servic) => {
                                  return (
                                    <li key={servic.id}>
                                      <span>
                                        <i className="bx bx-check"></i>
                                        {servic.desc}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>

                              <h3 id="packages">Packages</h3>
                              {pack.map((packagers) => {
                                return (
                                  <div id="pricing">
                                    <ul className="pricing-list">
                                      <li>
                                        {packagers.description}
                                        <span>Rs. {packagers.pricePerDay}</span>
                                      </li>
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TabPanel>

                        <TabPanel>
                          <div className="tab-pane" id="photos">
                            {vendorPhotos.length > 0 && (
                              <h3 id="photos">Photos</h3>
                            )}
                            <div className="gallery">
                              {vendorPhotos.map((pic) => {
                                return (
                                  <img
                                    src={pic}
                                    alt="missing"
                                    className="gallery__img"
                                    loading="lazy"
                                    onClick={(e) => imagePopup(pic)}
                                  />
                                );
                              })}
                              {carouselPicture && (
                                <dialog
                                  className="dialog-popup"
                                  id="image-popup"
                                  open
                                >
                                  <span
                                    className="p-close-icon"
                                    onClick={closeCarouselPopup}
                                  >
                                    <AiFillCloseCircle
                                      color="red"
                                      fontSize="30"
                                    />
                                  </span>
                                  <div className="gallery-slides owl-theme">
                                    <OwlCarousel {...options}>
                                      {cPhotos.map((pict) => {
                                        return (
                                          <div className="single-image-box caro-image">
                                            <img
                                              src={pict}
                                              alt="image"
                                              style={{
                                                width: "auto",
                                                maxHeight: "550px",
                                                objectFit: "cover",
                                                objectPosition: "top",
                                              }}
                                            />
                                          </div>
                                        );
                                      })}
                                    </OwlCarousel>
                                  </div>
                                </dialog>
                              )}
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="tab-pane" id="videos">
                            <div className="row">
                              {videos.map((video) => {
                                return (
                                  <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="video-responsive">
                                      <iframe
                                        width="853"
                                        height="480"
                                        src={`https://www.youtube.com/embed/${video}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded youtube"
                                      />
                                    </div>
                                    <br />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="tab-pane" id="reviews">
                            <div className="visitor-reviews-box" id="reviews">
                              {reviews.length > 0 && <h3>Customer Reviews</h3>}
                              <div>
                                {reviews.map((review) => {
                                  let customerProfileImage = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${review.customerProfilePic}`;
                                  let l = review.createdAt;
                                  let reviewDate = new Date(l);
                                  // let td = l.split("G");
                                  return (
                                    <div
                                      className="col-lg-12 col-md-12"
                                      key={review._id}
                                    >
                                      <div className="user-review">
                                        {review.customerProfilePic ==
                                          undefined ? (
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
                                              .split(
                                                " GMT+0530 (India Standard Time)"
                                              )}
                                          </span>
                                        </div>
                                        <p>
                                          <strong className="">Review: </strong>
                                          {review.customerReview}
                                        </p>
                                        {review.reply !== undefined ? (
                                          <p>
                                            <strong className="">
                                              Reply:{" "}
                                            </strong>
                                            {review.reply}
                                          </p>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 mt-md-3">
                <div className="listings-sidebar">
                  <div className="listings-widget listings_contact_details">
                    <h3>Contact Details</h3>
                    <ul>
                      {websiteUrl != undefined && (
                        <li>
                          <i className="bx bx-globe"></i>
                          <a href={websiteUrl} target="_blank">
                            My Website
                          </a>
                        </li>
                      )}

                      {phone !== undefined && (
                        <li>
                          <i className="bx bx-phone-call"></i>
                          <a href={"tel:" + phone}>+91 {phone}</a>
                        </li>
                      )}
                      {instagramUrl !== undefined && (
                        <li>
                          <i>
                            <AiOutlineInstagram />
                          </i>
                          <a href={instagramUrl} target="_blank">
                            My Instagram
                          </a>
                        </li>
                      )}

                      {facebookUrl !== undefined && (
                        <li>
                          <i>
                            <AiOutlineFacebook />
                          </i>
                          <a href={facebookUrl} target="_blank">
                            My Facebook
                          </a>
                        </li>
                      )}
                      {youtubeUrl !== undefined && (
                        <li>
                          <i>
                            <BsYoutube />
                          </i>
                          <a href={youtubeUrl} target="_blank">
                            My Youtube
                          </a>
                        </li>
                      )}

                      {stateName !== "" && (
                        <li>
                          <i className="bx bx-map"></i> {stateName[0]} ,{" "}
                          {city[0]}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="listings-details-desc">
                    <div id="add-review">
                      {userType == "customer" && (
                        <div className="review-form-wrapper">
                          <h3>Add A Review</h3>
                          <form onSubmit={reviewSubmit}>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="sub-ratings">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-4 col-6 col-sm-6">
                                      <div className="add-sub-rating">
                                        <h4>Rating</h4>
                                        <div className="communication-rating">
                                          <input
                                            type="radio"
                                            id="communicationStar5"
                                            name="communication-rating"
                                            // value={rating}
                                            onChange={() => setRating(5)}
                                          />
                                          <label htmlFor="communicationStar5"></label>
                                          <input
                                            type="radio"
                                            id="communicationStar4"
                                            name="communication-rating"
                                            // value={rating}
                                            onChange={() => setRating(4)}
                                          />
                                          <label htmlFor="communicationStar4"></label>
                                          <input
                                            type="radio"
                                            id="communicationStar3"
                                            name="communication-rating"
                                            // value={rating}
                                            onChange={() => setRating(3)}
                                          />
                                          <label htmlFor="communicationStar3"></label>
                                          <input
                                            type="radio"
                                            id="communicationStar2"
                                            name="communication-rating"
                                            // value={rating}
                                            onChange={() => setRating(2)}
                                          />
                                          <label htmlFor="communicationStar2"></label>
                                          <input
                                            type="radio"
                                            id="communicationStar1"
                                            name="communication-rating"
                                            // value={rating}
                                            onChange={() => setRating(1)}
                                          />
                                          <label htmlFor="communicationStar1"></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    className="form-control"
                                    value={custName}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-6">
                                <div className="form-group">
                                  <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={custEmail}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <textarea
                                    placeholder="Your review"
                                    className="form-control"
                                    cols="30"
                                    rows="6"
                                    value={reviewMsg}
                                    onChange={(e) => setReviewMsg(e.target.value)}
                                  ></textarea>
                                </div>
                                {error && (
                                  <p style={{ color: "red" }}>
                                    Please give ratings and review
                                  </p>
                                )}
                              </div>
                              <div className="col-lg-12 col-md-12 text-center">
                                <button type="submit">Submit</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}

      <Footer bgColor="bg-f5f5f5" />
      {/* </div> */}
    </>
  );
};

export default SingleListings;
