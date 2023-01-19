import Typist from "react-typist";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const OwlCarousel = dynamic(import("react-owl-carousel3"));

// Carousel Options
const options = {
  loop: true,
  margin: 20,
  nav: true,
  mouseDrag: false,
  items: 3,
  dots: true,
  autoplay: true,
  smartSpeed: 500,

  navText: [
    "<i class='flaticon-left-chevron'></i>",
    "<i class='flaticon-right-chevron'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  },
};

const Banner = () => {
  const [run, setRun] = useState(false);

  const [allVendors, setAllVendors] = useState([]);
  const [stateName, setStateName] = useState();
  const [city, setCity] = useState([]);
  const [citie, setCitie] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  // Fetching Redux Data
  const reduxData = useSelector((state) => state.vendor.vendor);

  const router = useRouter();
  console.log(allVendors)
  useEffect(() => {
    getAllVendors();
    // console.log(process.env.DOMAIN_NAME)
  }, [run]);

  const getAllVendors = () => {
    setAllVendors(reduxData);
    // console.log(allVendors)
    if (allVendors.length < 1) {
      setRun(!run);
    } else {
      getStatesAndCities();
    }
  };

  // Fetching Registered Vendor states and cities from Redux
  const getStatesAndCities = () => {
    console.log("running");
    let stateArray = [];
    let citiesArray = [];
    allVendors.map((s) => {
      if (s.state[0] !== undefined) {
        console.log(stateArray.includes(s.state));
        stateArray.push(s.state);
      }
      if (s.city[0] !== undefined) {
        citiesArray.push(s.city);
      }
    });
    // Unique State Array
    console.log(stateArray)
    let stringStateArray = stateArray.map(JSON.stringify);
    console.log(stringStateArray)
    let uniqueStateStringArray = new Set(stringStateArray);
    console.log(uniqueStateStringArray)
    let uniqueStateArray = Array.from(uniqueStateStringArray, JSON.parse);
    console.log(uniqueStateArray)
    uniqueStateArray.sort((a, b) => (a[0] < b[0] ? -1 : 1));

    //Unique City Array
    let stringCityArray = citiesArray.map(JSON.stringify);
    let uniqueCityStringArray = new Set(stringCityArray);
    let uniqueCityArray = Array.from(uniqueCityStringArray, JSON.parse);
    uniqueCityArray.sort((a, b) => (a[0] < b[0] ? -1 : 1));
    // console.log(a, b)

    // console.log("States",stateArray)
    // console.log("Duplicates Removed",uniqueStateArray)

    setAllStates(uniqueStateArray);
    setAllCities(uniqueCityArray);
    console.log(stateArray);
    console.log(citiesArray);
  };

  // Link to Photographer Details Page

  const singlePhotographer = (id) => {
    console.log(id);
    router.push({
      pathname: "/dashboard/photographer",
      query: { id: id },
    });
  };

  // State Change

  const handleChange = (e) => {
    const sta = e.target.value;
    setStateName(sta.split(","));
  };

  // City Change

  const handleChangeCity = (e) => {
    const cty = e.target.value;
    setCity(cty.split(","));
  };

  // Filtering Cities by State

  const handleClickCity = () => {
    console.log(stateName);
    if (stateName == undefined) {
      swal({
        title: "Error",
        text: "Please select State",
        icon: "error",
        button: "OK !",
      });
      console.log(allVendors);
    } else {
      console.log(allCities);
      const c = allCities.filter((citi) => citi[2] == stateName[1]);
      console.log(c);
      setCitie(c);
    }
  };

  // Search Vendors by State and City wise
  const handleSubmit = (e) => {
    console.log("123");
    console.log(stateName, city);
    e.preventDefault();
    if (stateName == undefined && city.length == 0) {
      router.push({
        pathname: "/dashboard/location",
        query: { id: 0 },
      });
    }
    if (stateName !== undefined && city.length == 0) {
      router.push({
        pathname: "/dashboard/location",
        query: { states: stateName[1] },
      });
    }
    if (stateName !== undefined && city.length !== 0) {
      router.push({
        pathname: "/dashboard/location",
        query: { cities: city[1] },
      });
    }
  };

  return (
    <>
      <div className="main-banner-area">
        <div className="container">
          <div className="main-banner-content">
            <div className="banner-flexi">
              <h1 className="banner-one-heading">
                <span className="typewrite"> Find Nearby </span>

                <Typist>
                  <span>Photographers </span>
                  <Typist.Backspace count={15} delay={200} />
                  <span> Photographers </span>
                  <Typist.Backspace count={15} delay={200} />
                  <span> Photographers </span>
                  <Typist.Backspace count={15} delay={200} />
                  <span> Photographers </span>
                  <Typist.Backspace count={15} delay={200} />
                  <span> Photographers </span>
                </Typist>
                <span className="wrap"></span>
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row m-0 align-items-center">
                <div className="col-lg-4 col-md-12 p-0">
                  <div className="form-group">
                    <label>
                      <i className="flaticon-search"></i>
                    </label>
                    <select className="form-control">
                      <option>Photographers</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 p-0">
                  <div className="form-group ">
                    <label>
                      <i className="flaticon-pin"></i>
                    </label>
                    <select
                      className="dashbaord-category-select form-control"
                      placeholder="Select the state"
                      onChange={handleChange}
                      value={stateName}
                    >
                      <option>Select the State</option>
                      {allStates.map((state) => {
                        console.log(state)
                        return (
                          <option value={[state[0], state[1]]} key={state[0]}>
                            {state[0]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 p-0">
                  <div className="form-group">
                    <label>
                      <i className="flaticon-category"></i>
                    </label>
                    <select
                      className="dashbaord-category-select form-control"
                      onFocus={handleClickCity}
                      onChange={handleChangeCity}
                    >
                      <option>
                        {city.length > 0 ? city[0] : "Select City"}
                      </option>
                      {citie.map((cit) => {
                        return (
                          <option value={[cit[0], cit[1]]} key={cit[0]}>
                            {cit[0]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-2 col-md-12 p-0">
                  <div className="submit-btn">
                    <button type="submit">Search Now</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <>
        <section className="listings-area ptb-100 bg-f9f9f9">
          <div className="container">
            <div className="section-title">
              <h2>Trending Photographers</h2>
            </div>
            {allVendors.length < 1 ? (
              <div className="loader">
                <ReactLoading type="spokes" color="#30eded" />
              </div>
            ) : (
              <div className="listings-slides owl-theme">
                {allVendors.length > 0 ? (
                  <OwlCarousel {...options}>
                    {allVendors.map((vendor) => {
                      let profilePic = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${vendor.profilePicture}`;
                      let coverPic = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${vendor.coverPicture}`;
                      // let cover = coverPic.split("http://localhost:3002/api/account/vendor/get-profile-photo/");
                      // console.log(cover)
                      return (
                        <div className="single-listings-box" key={vendor._id}>
                          <div
                            className="listings-image img-before-none"
                            id="img-before-none"
                            onClick={() => singlePhotographer(vendor._id)}
                          >
                            {vendor.coverPicture != undefined ? (
                              <div className="single-destinations-box">
                                <img
                                  src={coverPic}
                                  alt="image"
                                  className="img-height image-fit cursur-pointer img-zoom"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <img
                                src="/images/profile.png"
                                alt="image"
                                className="img-height image-fit cursur-pointer"
                              />
                            )}

                            {/* <form onSubmit={(e) => vendorLike(e, vendor.id)}>
                              {lVendors && (
                                <span className="bookmark-save like-btn home-like">
                                  <button>
                                    {lVendors ? (
                                      likedVendors.some(
                                        (liked) => liked.id == vendor.id
                                      ) ? (
                                        <BsFillHeartFill color="red" />
                                      ) : (
                                        <BsFillHeartFill />
                                      )
                                    ) : (
                                      <></>
                                    )}
                                  </button>
                                </span>
                              )}
                            </form> */}
                          </div>

                          <div className="listings-content">
                            <div className="author">
                              <div className="d-flex align-items-center">
                                <img src={profilePic} />
                                <span>{vendor.name}</span>
                              </div>
                            </div>
                            <ul className="listings-meta">
                              <li>
                                <i className="flaticon-pin"></i>

                                {vendor.state[0]}, {vendor.city[0]}
                              </li>
                            </ul>
                            <div className="studio-profile-btn">
                              <div>
                                <h3>{vendor.studioName}</h3>
                              </div>
                              <div>
                                <button
                                  key={vendor._id}
                                  onClick={() => singlePhotographer(vendor._id)}
                                >
                                  View
                                  <i
                                    class="flaticon-right-arrow"
                                    style={{
                                      fontSize: "12px",
                                      paddingLeft: "5px",
                                    }}
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>

          <div className="divider2"></div>
        </section>
      </>
    </>
  );
};

export default Banner;
