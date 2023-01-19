import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "../../utils/ActiveLink";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";
import CustomerLoginForm from "./Cutomer/CutomerLoginForm";
import CutomerRegisterForm from "./Cutomer/CustomerRegisterForm";
import VendorLoginForm from "./Vendor/VendorLoginForm";
import VendorRegisterForm from "./Vendor/VendorRegisterForm";
import { IndiceContext } from "../../contexts/index";
resetIdCounter();

const Navbar = ({ navbar, refresh, navColor }) => {
  const { toggleSideMenu } = useContext(IndiceContext);

  const [displayAuth, setDisplayAuth] = useState(false);
  const [displayMiniAuth, setDisplayMiniAuth] = useState(false);
  const [displayVendorRegister, setDisplayVendorRegister] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [userId, setUserId] = useState({});
  const [displayDropdownProfile, setDisplayDropdownProfile] = useState(false);
  const [token, setToken] = useState(null);
  const [pImg, setPImg] = useState(null);
  const [run, setRun] = useState(false);

  const [navbarColor, setNavColor] = useState(false);

  //sticky menu
  const showStickyMenu = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  if (typeof window !== "undefined") {
    // browser code
    window.addEventListener("scroll", showStickyMenu);
  }

  const toggleAuth = () => {
    setDisplayAuth(!displayAuth);
  };
  const toggleMiniAuth = () => {
    setDisplayMiniAuth(!displayMiniAuth);
  };

  const [showMenu, setshowMenu] = useState(false);

  const toggleAuthRegister = () => {
    setDisplayVendorRegister(!displayVendorRegister);
  };

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };

  const toggleDropdownProfile = () => {
    setDisplayDropdownProfile(!displayDropdownProfile);
  };

  // Profile Image

  useEffect(() => {
    let profileImg = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${userId.profilePicture}`;
    setPImg(profileImg);
    console.log(userId.profilePicture)
  }, [run, userId]);

  // Get Token and User

  useEffect(() => {
    let abortController = new AbortController();
    setNavColor(navColor);
    console.log(navColor);
    let tok = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(tok, "tok");
    console.log(user);
    if (user !== null) {
      setUserId(user);
      setToken(tok);
    }
    if (pImg === null) {
      setRun(!run);
    }
    console.log(user);
    console.log(userId.type);
    // your async action is here
    // return () => {
    //   abortController.abort();
    // };
  }, [refresh]);

  // Logout Function

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div className={displayAuth ? "body_overlay open" : "body_overlay"} ></div>
      <div
        className={displayVendorRegister ? "body_overlay open" : "body_overlay"}
      ></div>
      <div
        className={
          sticky
            ? "is-sticky navbar-area navbar-style-two py-2"
            : "navbar-area navbar-style-two py-2"
        }
        style={{ background: navbarColor == undefined ? "" : "#0ec6c6" }}
      >
        <div>
          <div className='miran-responsive-nav'>
            <div className='miran-responsive-menu'>
              <div
                onClick={() => toggleMenu()}
              // className='hamburger-menu hamburger-two dashboard-hamburger'
              >
                {showMenu ? (
                  <i className='bx bx-x'></i>
                ) : (
                  <i className=''></i>
                )}
              </div>
              <div className='responsive-burger-menu d-lg-none d-block' onClick={toggleSideMenu}>
                <span className='top-bar'></span>
                <span className='middle-bar'></span>
                <span className='bottom-bar'></span>
              </div>
            </div>
          </div>

          <div className="miran-responsive-nav py-1" >
            <div className="container">
              <div className="miran-responsive-menu">
                <div className="logo">
                  <Link href="/">
                    <a>{!navbar && <img src="/images/logo.png" alt="logo" />}</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showMenu ? "miran-nav show" : "miran-nav"}>
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link href="/">
                <a className="navbar-brand">
                  {!navbar && <img src="/images/logo.png" alt="logo" />}
                </a>
              </Link>

              <div
                className="collapse navbar-collapse mean-menu"
                style={{ justifyContent: "end" }}
              >
                {token == null ? (
                  <div className="others-option d-flex align-items-center">
                    <div className="option-item">
                      <span
                        data-toggle="modal"
                        onClick={toggleAuth}
                        className="auth-one"
                      >
                        <i className="flaticon-user"></i> Login / Register
                      </span>
                    </div>
                    <div className="option-item">
                      <span
                        data-toggle="modal"
                        onClick={toggleAuthRegister}
                        className="active"
                      >
                        <a className="default-btn button-one">
                          <i className="flaticon-more"></i> Register/Login as
                          Photographer
                        </a>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="others-option d-flex align-items-center">
                    <div className="option-item">
                      <div className="dropdown profile-nav-item menu-profile-one d-flex justify-content-center align-items-center mr-1">
                        {userId.profilePicture !== undefined ? (
                          <img
                            src={pImg}
                            className="rounded-circle pImg"
                            alt="image"
                          />
                        ) : (
                          <img
                            src="/images/profile.png"
                            alt="imag"
                            className="rounded-circle pImg"
                          />
                        )}
                        <a
                          href="#"
                          className="dropdown-toggle d-flex align-items-center"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div className="menu-profile">
                            <span
                              className="name mr-1"
                              onClick={toggleDropdownProfile}
                              style={{ paddingLeft: "5px" }}
                            >
                              My Account
                            </span>
                          </div>
                        </a>
                        <div className="option-item w-30">
                          <Link
                            href="/dashboard/add-listing"
                            className="active"
                          >
                            <a>
                              {/* <i className="flaticon-more"></i> Add Listing */}
                            </a>
                          </Link>
                        </div>

                        <div
                          className={
                            displayDropdownProfile
                              ? "dropdown-menu show"
                              : "dropdown-menu"
                          }
                          style={{
                            position: "absolute",
                            top: "65px",
                            left: "-75px",
                          }}
                        >
                          <div className="dropdown-header d-flex flex-column align-items-center mr-1">
                            <div className="figure mb-3">
                              {userId.profilePicture !== undefined ? (
                                <img
                                  src={pImg}
                                  className="rounded-circle pImg"
                                  alt="image"
                                />
                              ) : (
                                <img
                                  src="/images/profile.png"
                                  alt="imag"
                                  className="rounded-circle pImg"
                                />
                              )}
                            </div>

                            <div className="info text-center">
                              <span className="name" style={{ color: "#000", paddingLeft: "7px" }}>
                                {userId.name}
                              </span>
                              <p className="mb-3 email">{userId.email}</p>
                            </div>
                          </div>

                          <div className="dropdown-body">
                            <ul className="profile-nav p-0 pt-3">
                              {userId.type != "customer" ? (
                                <li className="nav-item">
                                  <Link href="/dashboard/portfolio">
                                    <a className="nav-link">
                                      <i
                                        className="bx bx-user"
                                        style={{ color: "#30eded" }}
                                      ></i>{" "}
                                      <span style={{ color: "#000" }}>
                                        Portfolio
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                              ) : (
                                <> </>
                              )}
                              <li className="nav-item">
                                <Link
                                  href={
                                    userId.type != "customer"
                                      ? "/dashboard/profile"
                                      : "/dashboard/customerprofile"
                                  }
                                >
                                  <a className="nav-link pt-1">
                                    <i
                                      className="bx bx-user"
                                      style={{ color: "#30eded" }}
                                    ></i>{" "}
                                    <span style={{ color: "#000" }}>
                                      Profile
                                    </span>
                                  </a>
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="dropdown-footer">
                            <ul className="profile-nav">
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link"
                                  onClick={handleLogout}
                                >
                                  <i
                                    className="bx bx-log-out"
                                    style={{ color: "#f00" }}
                                  ></i>{" "}
                                  <span style={{ color: "#f00" }}>Logout</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className='option-item'>
                  <a
                    href='dashboard-add-listings.html'
                    className='default-btn button-one'
                  >
                    <i className='flaticon-more'></i> Add Listing
                  </a>
                </div> */}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        <div className="others-option-for-responsive">
          <div className="container">
            <div className="dot-menu" onClick={toggleMiniAuth}>
              <div className="inner">
                <div className="circle circle-one"></div>
                <div className="circle circle-two"></div>
                <div className="circle circle-three"></div>
              </div>
            </div>

            <div className={displayMiniAuth ? "container active" : "container"}>
              <div className="option-inner">
                {token == null ? (
                  <div className="others-option">
                    <div className="option-item">
                      <span data-toggle="modal" onClick={toggleAuth}>
                        <i className="flaticon-user"></i> Login / Register
                      </span>
                    </div>

                    <div className="option-item">
                      <span
                        data-toggle="modal"
                        onClick={toggleAuthRegister}
                        className="active"
                      >
                        <a className="default-btn button-one">
                          <i className="flaticon-more"></i> Register/Login as
                          Photographer
                        </a>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="others-option d-flex align-items-center">
                    <div className="option-item">
                      <div className="dropdown profile-nav-item menu-profile-one">
                        <a
                          href="#"
                          className="dropdown-toggle"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div className="menu-profile">
                            {userId.profilePicture !== undefined ? (
                              <img
                                src={pImg}
                                className="rounded-circle pImg"
                                alt="image"
                                style={{ height: "40px", width: "40px" }}
                              />
                            ) : (
                              <img
                                src="/images/profile.png"
                                alt="imag"
                                className="rounded-circle pImg"
                                style={{ height: "40px", width: "40px" }}
                              />
                            )}

                            <span
                              className="name"
                              onClick={toggleDropdownProfile}
                            >
                              My Account
                            </span>
                          </div>
                        </a>

                        <div
                          className={
                            displayDropdownProfile
                              ? "dropdown-menu show position"
                              : "dropdown-menu position"
                          }
                        >
                          <div className="dropdown-header d-flex flex-column align-items-center">
                            <div className="figure mb-3">
                              {userId.profilePicture !== undefined ? (
                                <img
                                  src={pImg}
                                  className="rounded-circle pImg"
                                  alt="image"
                                  style={{ height: "50px", width: "50px" }}
                                />
                              ) : (
                                <img
                                  src="/images/profile.png"
                                  alt="imag"
                                  className="rounded-circle pImg"
                                  style={{ height: "50px", width: "50px" }}
                                />
                              )}
                            </div>

                            <div className="info text-center">
                              <span className="name">{userId.name}</span>
                              <p className="mb-3 email">{userId.email}</p>
                            </div>
                          </div>

                          <div className="dropdown-body">
                            <ul
                              className="profile-nav p-0 pt-3"
                              style={{ listStyle: "none" }}
                            >
                              <li className="nav-item">
                                {userId.type != "customer" && (
                                  <Link href="/dashboard/portfolio">
                                    <a className="nav-link">
                                      <i className="bx bx-user"></i>{" "}
                                      <span>Portfolio</span>
                                    </a>
                                  </Link>
                                )}
                              </li>
                              <li className="nav-item">
                                <Link
                                  href={
                                    userId.type != "customer"
                                      ? "/dashboard/profile"
                                      : "/dashboard/customerprofile"
                                  }
                                >
                                  <a className="nav-link">
                                    <i className="bx bx-user"></i>{" "}
                                    <span>Profile</span>
                                  </a>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link"
                                  onClick={handleLogout}
                                >
                                  <i className="bx bx-log-out"></i>{" "}
                                  <span style={{ color: "red" }}>Logout</span>
                                </a>
                              </li>
                            </ul>
                          </div>

                          {/* <div className="dropdown-footer">
                            <ul className="profile-nav" style={{listStyle: "none"}}>
                              <li className="nav-item">
                                <a
                                  href="/"
                                  className="nav-link"
                                  onClick={handleLogout}
                                >
                                  <i className="bx bx-log-out"></i>{" "}
                                  <span>Logout</span>
                                </a>
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* <div className='option-item'>
                <a
                  href='dashboard-add-listings.html'
                  className='default-btn button-one'
                >
                  <i className='flaticon-more'></i> Add Listing
                </a>
              </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={showMenu ? 'miran-nav show' : 'miran-nav'}>
        <nav className='navbar navbar-expand-md navbar-light'>
          <div className='collapse navbar-collapse mean-menu'>
            <ul className='navbar-nav'>

            </ul>

          </div>
        </nav>
      </div>

      {/* ------------ Auth Modal ------- */}
      <div
        className={
          displayAuth
            ? "modal loginRegisterModal show scroll-popup"
            : "modal loginRegisterModal"
        }
        id="loginRegisterModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <Tabs>
              <button type="button" className="close" onClick={toggleAuth}>
                <i className="bx bx-x"></i>
              </button>
              <h2 className="vendor-register-head">Welcome Back! Customer</h2>
              <ul className="nav nav-tabs" id="myTab">
                <TabList>
                  <Tab className="nav-item">
                    <a className="nav-link" id="login-tab">
                      Login
                    </a>
                  </Tab>
                  <Tab className="nav-item">
                    <a className="nav-link" id="register-tab">
                      Register
                    </a>
                  </Tab>
                </TabList>
              </ul>

              <div className="tab-content" id="myTabContent">
                <TabPanel>
                  <CustomerLoginForm />
                </TabPanel>

                <TabPanel>
                  <CutomerRegisterForm />
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* ------------ Auth Modal Vendor Register form------- */}
      <div
        className={
          displayVendorRegister
            ? "modal loginRegisterModal show scroll-popup"
            : "modal loginRegisterModal"
        }
        id="loginRegisterModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <Tabs>
              <button
                type="button"
                className="close"
                onClick={toggleAuthRegister}
              >
                <i className="bx bx-x"></i>
              </button>

              <ul className="nav nav-tabs" id="myTab">
                <h2 className="vendor-register-head">
                  Sign up as Photographer
                </h2>
                <TabList>
                  <Tab className="nav-item">
                    <a className="nav-link" id="login-tab">
                      Login
                    </a>
                  </Tab>
                  <Tab className="nav-item">
                    <a className="nav-link" id="register-tab">
                      Register
                    </a>
                  </Tab>
                </TabList>
              </ul>

              <div className="tab-content" id="myTabContent">
                <TabPanel>
                  {/* <div className="tab-pane fade show active" id="c"> */}
                  <VendorLoginForm />
                  {/* </div> */}
                </TabPanel>
                <TabPanel>
                  {/* <div className="tab-pane" id="register"> */}
                  <VendorRegisterForm />
                  {/* </div> */}
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
