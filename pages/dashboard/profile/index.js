import swal from "sweetalert";
import DashboardNavbar from "../../../components/Dashboard/DashboardNavbar";
import { useState, useEffect } from "react";
import { states } from "../../../utils/state";
import { cities } from "../../../utils/cities";
import { services } from "../../../utils/services";
import { vendorExperience } from "../../../utils/vendorExperience";
import router from "next/router";
import axios from "axios";
import Navbar from "../../../components/_App/Navbar";

const Profile = () => {
  const [run, setRun] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [studio, setStudio] = useState("");
  const [about, setAbout] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [pincode, setPincode] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [stateName, setStateName] = useState();
  const [city, setCity] = useState([]);
  const [citie, setCitie] = useState([]);
  const [error, setError] = useState(false);
  const [service, setService] = useState([]);
  const [allServicesChecked, setAllServicesChecked] = useState(Boolean);
  const [pack, setPack] = useState([]);
  const [id, setId] = useState(0);
  const [pName, setPName] = useState("");
  const [pPPD, setPPPD] = useState("");
  const [additionalCost, setAdditionalCost] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [experience, setExperience] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [apiProfileImg, setApiProfileImg] = useState();
  const [show, setShow] = useState(true);
  const [coverImg, setCoverImg] = useState(null);
  const [apiCoverImg, setApiCoverImage] = useState();

  console.log(states)
  useEffect(async () => {
    console.log(token);
    console.log(userId);
    console.log(vendorExperience);
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
      let user = localStorage.getItem("user");
      let parsedUser = JSON.parse(user);
      let id = parsedUser._id;
      console.log(id);
      setToken(localStorage.getItem("token"));
      // setUserId(localStorage.getItem("user"));
      await getVendorProfile(id);
      // states.sort((a,b)=>(a[0]<b[0]? -1 : 1))
      states.sort((a, b) => a.Geo_Name.toLowerCase() < b.Geo_Name.toLocaleLowerCase() ? -1 : 1);
      console.log(states);
    } else {
      console.log("we are running on the server");
    }
  }, [run]);

  //Get vendor details by id
  const getVendorProfile = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.get(
        `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile/${id}`
      );
      console.log(data);
      setName(data.vendor.name);
      setEmail(data.vendor.email);
      setPhone(data.vendor.mobile);
      setStudio(data.vendor.studioName);
      setAbout(data.vendor.about);
      setWebsiteUrl(data.vendor.siteUrl);
      setFacebookUrl(data.vendor.fbUrl);
      setInstagramUrl(data.vendor.instaUrl);
      setYoutubeUrl(data.vendor.youtubeUrl);
      setPincode(data.vendor.pincode);
      setCity(data.vendor.city);
      setStateName(data.vendor.state);
      setLandmark(data.vendor.landmark);
      setDoorNo(data.vendor.addressLine1);
      setStreet(data.vendor.addressLine2);
      setPack(data.vendor.packages);
      setService(data.vendor.services);
      setAdditionalCost(data.vendor.additionalCost);
      setPaymentTerms(data.vendor.paymentTerms);
      setExperience(data.vendor.experience);
      setProfileImg(
        `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${data.vendor.profilePicture}`
      );
      setCoverImg(
        `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${data.vendor.coverPicture}`
      );
    } catch (error) {
      console.log(error, "getVendorerror");
    }
  };

  const addProfileSubmit = async (e) => {
    e.preventDefault();
    // Data to be upload
    const d = {
      name,
      email,
      mobile: phone,
      studioName: studio,
      about,
      siteUrl: websiteUrl,
      fbUrl: facebookUrl,
      instaUrl: instagramUrl,
      youtubeUrl,
      pincode,
      addressLine1: doorNo,
      addressLine2: street,
      landmark,
      state: stateName,
      city,
      services: service,
      packages: pack,
      additionalCost,
      paymentTerms,
      experience,
    };
    console.log(d);
    console.log(pack);

    if (studio == undefined) {
      console.log(studio)
      setError(true);
      router.push("#studio");
    } else if (
      facebookUrl == undefined &&
      instagramUrl == undefined
    ) {
      setError(true);
      router.push("#facebook");
    } else if (
      pincode == undefined &&
      doorNo == undefined &&
      street == undefined &&
      stateName.length < 1 &&
      city.length < 1
    ) {
      setError(true);
      router.push("#address");
      return swal({
        title: "Error",
        text: "Please fill all details...",
        icon: "error",
        button: "OK!",
      });
    } else if (service.length === 0) {
      return swal({
        title: "Error",
        text: "Please select some services!...",
        icon: "error",
        button: "OK!",
      });
    } else if (pack.length === 0) {
      return swal({
        title: "Error",
        text: "Please add some packages...",
        icon: "error",
        button: "OK!",
      });

    } else {
      // Update Profile
      try {
        const api = await axios.put(
          `${process.env.DOMAIN_NAME}/api/account/vendor/update-profile/${token}`,
          d
        );
        console.log(api.data);
        if (!api.data.success) {
          swal({
            title: "Error",
            text: api.data.msg,
            icon: "error",
            button: "OK !",
          });
        }
        if (api.data.success) {
          swal({
            title: "Success",
            text: api.data.msg,
            icon: "success",
            button: "OK !",
          });
          localStorage.setItem("user", JSON.stringify(api.data.vendor));
          setRefresh(!refresh);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // State Change
  const handleChange = (e) => {
    const sta = e.target.value;
    setStateName(sta.split(","));
  };

  //City Change
  const handleChangeCity = (e) => {
    const cty = e.target.value;
    setCity(cty.split(","));
  };

  //Filter City by State
  const handleClickCity = () => {
    if (stateName == undefined) {
      swal({
        title: "Error",
        text: "Please select State",
        icon: "error",
        button: "OK !",
      });
    } else {
      const c = cities.filter((citi) => citi.Geo_Head == stateName[1]);
      c.sort((a, b) => (a[1] < b[1] ? -1 : 1));
      console.log(c);
      setCitie(c);
    }
  };

  // Select All Services function
  const selectAllServices = (e) => {
    let checkboxes = [];
    checkboxes.push(document.getElementsByClassName("services"));
    let c = Array.from(checkboxes[0]);
    console.log(c);
    console.log(e.target.checked);
    if (e.target.checked === false) {
      c.map((check) => {
        check.checked = false;
        console.log("f");
        setService([]);
      });
      setAllServicesChecked(true);
    }
    if (e.target.checked === true) {
      c.map((check) => {
        let val = parseInt(check.value);
        check.checked = true;
        setService(services);
      });
      setAllServicesChecked(false);
    }
  };

  // Service Change
  const servicesChange = (e) => {
    console.log("running");
    if (e.target.checked === true) {
      console.log(true);
      setService((serv) => [
        ...serv,
        { id: e.target.value, desc: e.target.name },
      ]);
    }
    if (e.target.checked === false) {
      console.log(false);
      setService(service.filter((serv) => serv.id != e.target.value));
    }
    console.log(service);
  };

  // Package Start
  const createPackage = () => {
    if (pName !== "" && pPPD !== "") {
      setId((id) => id + 1);
      setPack((pack) => [...pack, { id: id, description: pName, pricePerDay: pPPD },]);
      console.log(pack);
      setPName("");
      setPPPD("");
    }
  };

  const rmPackage = (des) => {
    const p = pack.filter((p) => p.description !== des);
    setPack(p);
  };
  // Package End

  const checkFacebook = (e) => {
    let userInput = e.target.value;
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res !== null) {
      setFacebookUrl(e.target.value);
      // return true;
    }
    alert("Enter valid Facebook Url");
    // return false;
  };

  // Profile Image Change
  const profilePicHandleChange = (e) => {
    setProfileImg(URL.createObjectURL(e.target.files[0]));
    setApiProfileImg(e.target.files[0]);
  };

  // Cover Image Change
  const coverPicHandleChange = (e) => {
    setCoverImg(URL.createObjectURL(e.target.files[0]));
    setApiCoverImage(e.target.files[0]);
  };

  // Upload Profile Image
  const profilePicSubmit = async (e) => {
    e.preventDefault();
    console.log(profileImg);
    const formData = new FormData();
    formData.append("file", apiProfileImg);
    try {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/account/vendor/upload-profile-photo/${token}`,
        formData
      );

      console.log(data);
      if (data.success) {
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          button: "OK!..",
        });
        localStorage.setItem("user", JSON.stringify(data.vendor));
        setRefresh(!refresh);
      } else {
        swal({
          title: "Error",
          text: data.msg,
          icon: "error",
          button: "OK!..",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Cover Photo Upload
  const coverPicSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", apiCoverImg);
    try {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/account/vendor/upload-cover-photo/${token}`,
        formData
      );
      if (data.success) {
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          button: "OK!..",
        });
      } else {
        swal({
          title: "Error",
          text: data.msg,
          icon: "error",
          button: "OK!..",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="main-content d-flex flex-column">
        <Navbar navbar={show} refresh={refresh} />

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="my-profile-box">
              <h3>Profile Details</h3>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <form onSubmit={profilePicSubmit}>
                    <div className="col-xl-6 col-lg-6 col-md-12">
                      <div className="form-group profile-box">
                        {profileImg != null ? (
                          <img
                            src={profileImg}
                            alt="imag"
                            className="profile-image"
                          />
                        ) : (
                          <img
                            src="/images/profile.png"
                            alt="imag"
                            className="profile-image"
                          />
                        )}
                        <input
                          type="file"
                          name="file"
                          id="file"
                          className="inputfile p-5 w-10 file-upload input-size"
                          onChange={(e) => profilePicHandleChange(e)}
                          style={{ opacity: 0, cursor: "pointer" }}
                        ></input>
                      </div>
                      <div className="mt-5">
                        <button type="submit">
                          <i className="bx bx-upload"></i> Upload Profile Photo
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 col-md-12">
                  <form onSubmit={coverPicSubmit}>
                    <div className="col-xl-6 col-lg-6 col-md-12">
                      <div className="form-group profile-box">
                        {coverImg != null ? (
                          <img
                            src={coverImg}
                            alt="imag"
                            className="profile-image"
                          />
                        ) : (
                          <img
                            src="/images/profile.png"
                            alt="imag"
                            className="profile-image"
                          />
                        )}

                        <input
                          type="file"
                          name="file"
                          id="cover"
                          className="inputfile p-5 w-10  file-upload input-size"
                          onChange={(e) => coverPicHandleChange(e)}
                          style={{ opacity: 0, cursor: "pointer" }}
                        ></input>
                      </div>
                      <div className="mt-5">
                        <button type="submit">
                          <i className="bx bx-upload"></i> Upload Cover Photo
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <form onSubmit={addProfileSubmit}>
                <div className="row">
                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        // onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label id="studio">Studio Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Studio Name"
                        onChange={(e) => setStudio(e.target.value)}
                        value={studio}
                      />
                      {error &&
                        (studio == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Please enter Studio Name
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>About</label>
                      <textarea
                        cols="30"
                        rows="6"
                        placeholder="Short description about you..."
                        className="form-control"
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="social-icons-style">
                        <i className="bx bx-globe"></i> Website URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Website URL"
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        value={websiteUrl}
                      />
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="social-icons-style" id="facebook">
                        <i className="bx bxl-facebook-square"></i> Facebook URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Facebook Url"
                        // onChange={checkFacebook}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        value={facebookUrl}
                      />
                      {error &&
                        (facebookUrl == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Please enter Facebook URL
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="social-icons-style">
                        <i className="bx bxl-instagram"></i>Instagram URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Instagram URL"
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        value={instagramUrl}
                      />
                      {error &&
                        (instagramUrl == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Please enter Instagram Url
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label className="social-icons-style">
                        <i className="bx bxl-youtube"></i>Youtube URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Youtube URL"
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        value={youtubeUrl}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <h3 id="address">ADDRESS</h3>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>PIN code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pin Code"
                        onChange={(e) => setPincode(e.target.value)}
                        value={pincode}
                      />
                      {error &&
                        (pincode == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Please enter Pincode
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Door No.</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Door No."
                        onChange={(e) => setDoorNo(e.target.value)}
                        value={doorNo}
                      />
                      {error &&
                        (doorNo == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Please enter Door No.
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Street, Sector, Area, Colony</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street"
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                      />
                      {error &&
                        (street == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Please enter Street
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Landmark</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Landmark"
                        onChange={(e) => setLandmark(e.target.value)}
                        value={landmark}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        <i className="bx bx-menu-alt-left"></i> State:
                      </label>
                      <select
                        className="dashbaord-category-select"
                        placeholder="Select the state"
                        onChange={handleChange}
                        value={stateName}
                      >
                        <option>Select the State</option>
                        {states.map((state) => {
                          return (
                            <option
                              id={state.Geo_TinNo}
                              value={[state.Geo_Name, state.Geo_TinNo]}
                              key={state.Geo_TinNo}
                            >
                              {state.Geo_Name}
                            </option>
                          );
                        })}
                      </select>
                      {error &&
                        (stateName < 1 ? (
                          <p className="error" style={{ color: "red" }}>
                            Please select State
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        <i className="bx bx-menu-alt-left"></i> City:
                      </label>
                      <select
                        className="dashbaord-category-select"
                        onFocus={handleClickCity}
                        onChange={handleChangeCity}
                      >
                        <option>
                          {city.length > 0 ? city[0] : "Select City"}
                        </option>
                        {citie.map((cit) => {
                          return (
                            <option
                              value={[cit.Geo_Name, cit.id, cit.Geo_Head]}
                              key={cit.id}
                            >
                              {cit.Geo_Name}
                            </option>
                          );
                        })}
                      </select>
                      {error &&
                        (city.length < 1 ? (
                          <p className="error" style={{ color: "red" }}>
                            Please Select City
                          </p>
                        ) : (
                          <></>
                        ))}
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <h3 id="address">SERVICES OFFERED</h3>
                    </div>
                  </div>

                  <aside className="listings-widget-area">
                    <section className="widget widget_categories">
                      <ul className="row">
                        <div className="col-xl-4 col-lg-6 col-md-12 p-2">
                          <li>
                            <input
                              type="checkbox"
                              onClick={selectAllServices}
                            />
                            <label htmlFor="categories2">All</label>
                          </li>
                        </div>
                        {services.map((serv) => {
                          let check = service.some(
                            (item) => item.id == serv.id
                          );
                          // if(check) {
                          //   setRun(!run)
                          // }
                          return (
                            <div
                              className="col-xl-4 col-lg-4 col-md-4 p-2"
                              key={serv.id}
                            >
                              <li>
                                <input
                                  name={serv.desc}
                                  type="checkbox"
                                  id={serv.id}
                                  className="services"
                                  value={serv.id}
                                  onChange={(e) => servicesChange(e)}
                                  checked={check}
                                />
                                <label htmlFor="categories2">{serv.desc}</label>
                                {/* <p>{check ? "success" : "fail"}</p> */}
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </section>
                  </aside>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <h3 id="address">PACKAGES</h3>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Price per day</label>
                      <input
                        type="number"
                        className="form-control"
                        value={pPPD}
                        onChange={(e) => setPPPD(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    className="col-xl-2 col-lg-12 col-md-12"
                    style={{ textAlign: "center" }}
                  >
                    <div className="form-group">
                      <label>
                        <br />
                      </label>
                      <span data-toggle="modal" activeClassName="active">
                        <a
                          style={{ paddingBottom: "5px" }}
                          className="default-btn"
                          onClick={createPackage}
                        >
                          Add
                        </a>
                      </span>
                    </div>
                  </div>
                  {/* packages view data */}
                  {pack.map((p) => {
                    return (
                      <div
                        className="col-xl-3 col-lg-12 col-md-12 package-view"
                        key={p.id}
                        style={{ marginRight: "7px", marginBottom: "5px" }}
                      >
                        <div className="form-group">
                          <div>
                            <span>{p.description}</span>
                          </div>
                          <div>
                            <span>Rs: {p.pricePerDay}</span>
                          </div>
                        </div>
                        <span data-toggle="modal" activeClassName="active">
                          <a
                            className="default-btn"
                            onClick={() => rmPackage(p.description)}
                          >
                            Remove
                          </a>
                        </span>
                      </div>
                    );
                  })}

                  <div className="col-lg-12 col-md-12">
                    <div
                      className="add-listings-box"
                      style={{ boxShadow: "none" }}
                    >
                      <div className="form-group">
                        <h3>ADDITIONAL INFORMATION</h3>
                        <p>How long you have been into photography?</p>
                        <ul className="facilities-list">
                          {vendorExperience.map((exp) => {
                            let radio = exp.id == experience;
                            // console.log(exp.id, experience)
                            // console.log(radio);
                            return (
                              <li key={exp.id}>
                                <label className="checkbox">
                                  <input
                                    type="radio"
                                    name="facilities-list"
                                    value={exp.id}
                                    onChange={(e) =>
                                      setExperience(e.target.value)
                                    }
                                    checked={radio}
                                  />
                                  <span>{exp.desc}</span>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Payment terms</label>
                      <textarea
                        cols="30"
                        rows="6"
                        placeholder="..."
                        className="form-control"
                        onChange={(e) => setPaymentTerms(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Additional costs</label>
                      <textarea
                        cols="30"
                        rows="6"
                        placeholder="..."
                        className="form-control"
                        onChange={(e) => setAdditionalCost(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <button type="submit">Save Changes</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-grow-1"></div>

        <div className="copyrights-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-6 col-md-6">
              <p>
                <i className="bx bx-copyright"></i>Copyright © 2020{" "}
                <a href="/">Frame In Cam</a>. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
