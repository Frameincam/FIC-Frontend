import Link from "next/link";
import Navbar from "../../../components/_App/Navbar";
import DashboardNavbar from "../../../components/Dashboard/DashboardNavbar";
import { useEffect, useState } from "react";
import { states } from "../../../utils/state";
import axios from "axios";
import swal from "sweetalert";
import { cities } from "../../../utils/cities";
import { set, useForm } from "react-hook-form";

const locationId = () => {
  const [run, setRun] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [pincode, setPincode] = useState();
  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [stateName, setStateName] = useState([]);
  const [city, setCity] = useState([]);
  const [citie, setCitie] = useState([]);
  const [error, setError] = useState(false);
  const [token, setToken] = useState();
  const [profileImg, setProfileImg] = useState(null);
  const [apiProfileImg, setApiProfileImg] = useState();
  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  useEffect(async () => {
    let user = localStorage.getItem("user");
    let parsedUser = JSON.parse(user);
    let id = parsedUser._id;
    setToken(localStorage.getItem("token"));
    await getCustomerProfile(id);
    states.sort((a, b) =>
      a.Geo_Name.toLowerCase() < b.Geo_Name.toLocaleLowerCase() ? -1 : 1
    );
  }, []);

  const getCustomerProfile = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.get(
        `${process.env.DOMAIN_NAME}/api/account/customer/get-profile/${id}`
      );
      console.log(data);
      setName(data.customer.name);
      setEmail(data.customer.email);
      setPhone(data.customer.mobile);
      setPincode(data.customer.pincode);
      setCity(data.customer.city);
      setStateName(data.customer.state);
      setLandmark(data.customer.landmark);
      setDoorNo(data.customer.addressLine1);
      setStreet(data.customer.addressLine2);
      setProfileImg(
        `${process.env.DOMAIN_NAME}/api/account/customer/get-profile-photo/${data.customer.profilePicture}`
      );
      console.log(data.customer.pincode);
    } catch (error) {
      console.log(error, "getcustomererror");
    }
  };

  const addProfileSubmit = async (e) => {
    // e.preventDefault();
    const d = {
      name,
      email,
      mobile: phone,
      pincode,
      addressLine1: doorNo,
      addressLine2: street,
      landmark,
      state: stateName,
      city,
    };
    console.log(d);
    console.log(
      pincode,
      doorNo,
      street,
      landmark,
      stateName.length,
      city.length
    );
    if (
      pincode != null &&
      doorNo != '' &&
      street !== undefined &&
      stateName.length > 0 &&
      city.length > 0
    ) {
      setError(false);
      try {
        const { data } = await axios.put(
          `${process.env.DOMAIN_NAME}/api/account/customer/update-profile/${token}`,
          d
        );
        console.log(data);
        if (data.success) {
          swal({
            title: "Success",
            text: data.msg,
            icon: "success",
            button: "OK !..",
          });
          localStorage.setItem("user", JSON.stringify(data.customer));
          setRun(!run);
        } else {
          swal({
            title: "Error",
            text: data.msg,
            icon: "error",
            button: "OK !..",
          });
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setError(true);
      swal({
        title: "Error",
        text: "Please fill all details",
        icon: "error",
        button: "OK",
      });
    }
  };

  // Profile Image Change
  const profilePicHandleChange = (e) => {
    setProfileImg(URL.createObjectURL(e.target.files[0]));
    setApiProfileImg(e.target.files[0]);
  };

  // Upload Profile Image
  const profilePicSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", apiProfileImg);
    console.log(apiProfileImg);
    console.log(formData);

    try {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/account/customer/upload-profile-photo/${token}`,
        formData
      );

      console.log(data.customer);
      if (data.success) {
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          button: "OK",
        });
        console.log('success')
        localStorage.setItem("user", JSON.stringify(data.customer));
        setRun(!run);
      } else {
        swal({
          title: "Error",
          text: data.msg,
          icon: "error",
          button: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // State Change
  const handleChange = (e) => {
    const sta = e.target.value;
    console.log(sta);
    setStateName(sta.split(","));
  };

  //City Change
  const handleChangeCity = (e) => {
    const cty = e.target.value;
    console.log(cty);
    setCity(cty.split(","));
  };

  //Filter City by State
  const handleClickCity = () => {
    console.log(stateName);
    if (stateName.length < 1) {
      swal({
        title: "Error",
        text: "Please select State",
        icon: "error",
        button: "OK",
      });
    } else {
      const c = cities.filter((citi) => citi.Geo_Head == stateName[1]);
      c.sort((a, b) => (a[1] < b[1] ? -1 : 1));
      setCitie(c);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="main-content d-flex flex-column">
        <Navbar navbar={show} refresh={run} />
        <div className="d-flex flex-column px-4">
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
                            <i className="bx bx-upload"></i> Upload Profile
                            Photo
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <form onSubmit={handleSubmit(addProfileSubmit)}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.mobile && "invalid"
                          }`}
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {error && phone == "" && (
                          <small className="text-danger">
                            Phone no. is required
                          </small>
                        )}
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
                          type="number"
                          value={pincode}
                          className={`form-control ${
                            errors.pincode && "invalid"
                          }`}
                          placeholder="Pin Code"
                          onChange={(e) => setPincode(e.target.value)}
                        />
                        {error && pincode == null ? (
                          <p className="error" style={{ color: "red" }}>
                            Pincode is required
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Door No.</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.doorno && "invalid"
                          }`}
                          placeholder="Door No."
                          value={doorNo}
                          onChange={(e) => setDoorNo(e.target.value)}
                        />
                        {error && doorNo == "" ? (
                          <p className="error" style={{ color: "red" }}>
                            Door No. is required
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Street, Sector, Area, Colony</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.street && "invalid"
                          }`}
                          placeholder="Street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                        {error && street == undefined ? (
                          <p className="error" style={{ color: "red" }}>
                            Street is required
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Landmark</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.landmark && "invalid"
                          }`}
                          placeholder="Landmark"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                        {/*     */}
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
                        {error && stateName.length < 1 ? (
                          <p className="error" style={{ color: "red" }}>
                            Please select State
                          </p>
                        ) : (
                          <></>
                        )}
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
                        {error && city.length < 1 ? (
                          <p className="error" style={{ color: "red" }}>
                            Please Select City
                          </p>
                        ) : (
                          <></>
                        )}
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

              {/* <div className='col-lg-6 col-sm-6 col-md-6 text-right'>
              <p>
                Designed by ❤️{' '}
                <a href='https://envytheme.com/' target='_blank' rel="noreferrer">
                  EnvyTheme
                </a>
              </p>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default locationId;
