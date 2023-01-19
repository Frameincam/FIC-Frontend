import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import router from "next/router";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const VendorRegisterForm = ({ open }) => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [displayOtpPopup, setDisplayOtpPopup] = useState(false);
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  // Password Visibility
  const loginPasswordVisibilityClick = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  // Submit OTP function
  const submitOtp = async (e) => {
    e.preventDefault();
    const d = {
      name,
      email,
      mobile,
      password,
    };
    console.log(otp);
    try {
      const { data } = await axios.post(
        `${process.env.DOMAIN_NAME}/api/verify/otp/${otp}`,
        d
      );
      console.log(data);
      const token = data.token;
      const user = JSON.stringify(data.user);
      if (!data.success) {
        console.log("swal");
        swal({
          title: "Error",
          text: data.msg,
          icon: "error",
          button: "OK! ",
        });
      }
      if (data.success) {
        console.log("swal");
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          button: "OK! ",
        });
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        router.push("/dashboard/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Vendor Registration Function

  const vendorRegistrationSubmit = async (e) => {
    // console.log(e);
    const d = {
      type: "photographer",
      email: e.email,
    };
    setName(e.name);
    setEmail(e.email);
    setMobile(e.mobile);
    setPassword(e.password);
    console.log(e.mobile);
    try {
      const { data } = await axios.post(
        `${process.env.DOMAIN_NAME}/api/account/vendor/send-register-otp/${e.mobile}`,
        d
      );
      console.log(data);
      if (data.success) {
        setDisplayOtpPopup(!displayOtpPopup);
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

  // Google Register Start

  const googleVendorLoginSuccess = async (res) => {
    console.log(res);
    console.log(res.tokenId);
    const da = {
      tokenId: res.tokenId,
      email: res.profileObj.email,
      name: res.profileObj.name,
    };
    try {
      const google = await axios.post(
        `${process.env.DOMAIN_NAME}/api/account/vendor/google-register/${res.tokenId}`
      );
      const token = google.data.token;

      if (!google.data.success) {
        console.log(google.data.msg);
        swal({
          title: "Error",
          text: google.data.msg,
          icon: "error",
          button: "OK! ",
        });
      }
      if (google.data.success) {
        console.log("success");
        swal({
          title: "Success",
          text: google.data.msg,
          icon: "success",
          button: "OK! ",
        });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(google.data.user));
        router.push("/dashboard/profile");
      }
      console.log(google);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLoginFailure = (data) => {
    console.log(data, "failure");
  };

  // Google Register End

  // Facebook Register Start

  const responseFacebook = async (response) => {
    // response.preventDefault();
    console.log(response);
    console.log(response.accessToken);
    const data = {
      userId: response.userID,
      accessToken: response.accessToken,
    };
    try {
      const faceBookLoginApi = await axios.post(
        `${process.env.DOMAIN_NAME}/api/account/vendor/facebook-register`,
        data
      );
      console.log(faceBookLoginApi);
      const token = faceBookLoginApi.data.token;
      if (!faceBookLoginApi.data.success) {
        swal({
          title: "Error",
          text: faceBookLoginApi.data.msg,
          icon: "error",
          button: "OK! ",
        });
      }
      if (faceBookLoginApi.data.success) {
        console.log("success");
        swal({
          title: "Success",
          text: "Registration Success",
          icon: "success",
          button: "OK! ",
        });
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify(faceBookLoginApi.data.user)
        );
        router.push("/dashboard/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Facebook Register End

  return (
    <>
      <div
        className={displayOtpPopup ? "body_overlay open" : "body_overlay"}
      ></div>
      <div className="tab-pane" id="register">
        <div className="miran-register">
          <div className="register-with-account">
            <span>Register with</span>
            <ul>
              <div className="row" style={{ textAlign: " -webkit-center" }}>
                <div className="col-lg-6 col-md-12">
                  <li>
                    <FacebookLogin
                      // 651404169340394
                      appId="459248115751300"
                      autoLoad={false}
                      callback={responseFacebook}
                    />
                  </li>
                </div>
                <div className="col-lg-6 col-md-12">
                  <li>
                    <GoogleLogin
                      clientId="1044646467235-3qsh4khsql66k1v9p6nuh6h5476gd09j.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <a
                          href="#"
                          className="twitter"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img src="/images/google.png" width={25} />{" "}
                          <span style={{ color: "#4686f7" }}>G</span>
                          <span style={{ color: "#e74137" }}>o</span>
                          <span style={{ color: "#f2bb13" }}>o</span>
                          <span style={{ color: "#4686f7" }}>g</span>
                          <span style={{ color: "#50a856" }}>l</span>
                          <span style={{ color: "#e74f40" }}>e</span>
                          {/* <i class="bx bxl-google" aria-hidden="true"></i> Google*/}
                        </a>
                      )}
                      buttonText="Login With Google"
                      onSuccess={googleVendorLoginSuccess}
                      onFailure={googleLoginFailure}
                      cookiePolicy={"single_host_origin"}
                    />
                  </li>
                </div>
              </div>
            </ul>
          </div>
          <span className="sub-title">
            <span>Or Register with</span>
          </span>
          <form onSubmit={handleSubmit(vendorRegistrationSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Vendor Name"
                // onChange={e=>setName(e.target.value)}
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={`form-control ${errors.email && "invalid"}`}
                // onChange= {e=>setEmail(e.target.value)}
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Mobile Number"
                className={`form-control ${errors.mobile && "invalid"}`}
                // onChange={e=>setMobile(e.target.value)}
                {...register("mobile", {
                  required: "Mobile is Required",
                  minLength: {
                    value: 10,
                    message: "invalid mobile number",
                  },
                  maxLength: {
                    value: 10,
                    message: "invalid mobile number",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only Numbers are allowed",
                  },
                })}
                onKeyUp={() => {
                  trigger("mobile");
                }}
              />
              {errors.mobile && (
                <small className="text-danger">{errors.mobile.message}</small>
              )}
            </div>

            <div className="form-group reset">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                className={`form-control ${errors.password && "invalid"}`}
                // onChange={e=>setPassword(e.target.value)}
                {...register("password", {
                  required: "Password is Required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
                    message:
                      "Include number, lower case and special case characters",
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {showLoginPassword ? (
                <AiOutlineEye
                  className="password-icon"
                  onClick={loginPasswordVisibilityClick}
                />
              ) : (
                <AiOutlineEyeInvisible
                  fill="grey"
                  className="password-icon"
                  onClick={loginPasswordVisibilityClick}
                />
              )}
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>

            <button type="submit">Register Now</button>
          </form>
        </div>
      </div>
      {/* ------------ OTP section ------- */}
      <div
        className={
          displayOtpPopup
            ? "modal loginRegisterModal show scroll-popup"
            : "modal loginRegisterModal"
        }
        id="loginRegisterModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <button type="button" className="close" onClick={closeOtpPopup}>
              <i className="bx bx-x"></i>
            </button> */}
            <h2 className="vendor-register-head" style={{ fontSize: "20px" }}>
              Enter OTP{" "}
            </h2>

            <form onSubmit={submitOtp}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="OTP"
                  className="form-control"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </div>

              <button className="forgot-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorRegisterForm;
