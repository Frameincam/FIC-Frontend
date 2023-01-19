import { useState, useContext, useEffect } from "react";
import Link from "../../utils/ActiveLink";
import { IndiceContext } from "../../contexts";
import { selectedIndexPropType } from "react-tabs/lib/helpers/propTypes";

const DashboardNavbar = () => {
  const { displaySideMenu, toggleSideMenu } = useContext(IndiceContext);
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState();
  const [customerType, setCustomerType] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    setUser(u);
    setCustomerType(u.type)
    console.log(u);
  }, []);

  const listingToggle = () => {
    setDisplay(!display);
  };


  return (
    <>
      <div
        className={
          displaySideMenu
            ? "sidemenu-area active-sidemenu-area"
            : "sidemenu-area"
        }
      >
        <div className="sidemenu-header">
          <Link href="/">
            <a className="navbar-brand d-flex align-items-center py-1">
              <img src="/images/black-logo.png" alt="image" />
            </a>
          </Link>

          <div
            className="responsive-burger-menu d-block d-lg-none"
            onClick={toggleSideMenu}
          >
            <i className="bx bx-x"></i>
          </div>
        </div>

        <div className="sidemenu-body">
          <ul
            className="sidemenu-nav metisMenu h-100"
            id="sidemenu-nav"
            data-simplebar
          >
            {/* <li className='nav-item-title'>Main</li> */}
            <li className="nav-item">
              <Link href="/" activeClassName="active">
                <a>
                  <span className="icon">
                    <i className="bx bx-home-circle"></i>
                  </span>
                  <span className="menu-title">Home</span>
                </a>
              </Link>
            </li>
            {/* 

            <li className='nav-item'>
              <Link href='/dashboard/messages' activeClassName='active'>
                <a>
                  <span className='icon'>
                    <i className='bx bx-envelope-open'></i>
                  </span>
                  <span className='menu-title'>Messages</span>
                  <span className='badge'>3</span>
                </a>
              </Link>
            </li>

            <li className='nav-item'>
              <Link href='/dashboard/bookings' activeClassName='active'>
                <a>
                  <span className='icon'>
                    <i className='bx bx-copy'></i>
                  </span>
                  <span className='menu-title'>Bookings</span>
                </a>
              </Link>
            </li>

            <li className='nav-item'>
              <Link href='/dashboard/wallet' activeClassName='active'>
                <a>
                  <span className='icon'>
                    <i className='bx bx-wallet'></i>
                  </span>
                  <span className='menu-title'>Wallet</span>
                </a>
              </Link>
            </li>

            <li className='nav-item-title'>Listings</li>

            <li className='nav-item'>
              <a
                href='#'
                className='collapsed-nav-link nav-link'
                onClick={listingToggle}
              >
                <span className='icon'>
                  <i className='bx bx-layer'></i>
                </span>
                <span className='menu-title'>My Listings</span>
              </a>

              <ul
                className={
                  display
                    ? 'sidemenu-nav-second-level show'
                    : 'sidemenu-nav-second-level sidemenu-nav-display'
                }
              >
                <li className='nav-item active-section'>
                  <Link
                    href='/dashboard/my-listing/active'
                    activeClassName='active'
                  >
                    <a>
                      <span className='menu-title'>Active</span>
                      <span className='badge'>5</span>
                    </a>
                  </Link>
                </li>

                <li className='nav-item active-section'>
                  <Link
                    href='/dashboard/my-listing/pending'
                    activeClassName='active'
                  >
                    <a>
                      <span className='menu-title'>Pending</span>
                      <span className='badge yellow'>1</span>
                    </a>
                  </Link>
                </li>

                <li className='nav-item active-section'>
                  <Link
                    href='/dashboard/my-listing/expired'
                    activeClassName='active'
                  >
                    <a>
                      <span className='menu-title'>Expired</span>
                      <span className='badge red'>2</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li> */}

            {customerType != "customer" && (
              <li className="nav-item">
                <Link href="/dashboard/reviews" activeClassName="active">
                  <a>
                    <span className="icon">
                      <i className="bx bx-star"></i>
                    </span>
                    <span className="menu-title">Reviews</span>
                  </a>
                </Link>
              </li>
            )}

            {customerType != "customer" && (
              <li className="nav-item">
                <Link
                  href="/dashboard/portfolio"
                  activeClassName="active"
                >
                  <a>
                    <span className="icon">
                      <i className="bx bx-plus-circle"></i>
                    </span>
                    <span className="menu-title">Portfolio</span>
                  </a>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link href="/dashboard/profile" activeClassName="active">
                <a>
                  <span className="icon">
                    <i className="bx bxs-user-circle"></i>
                  </span>
                  <span className="menu-title">Profile</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <a href="http://imageproof.ai/" target="_blank" className="subscriptionBtn">Subscription</a>
              {/* <button className="subscriptionBtn" onClick={() => window.open("http://imageproof.ai/", "_blank")}>Subscription</button> */}
            </li>

            {/* <li className='nav-item'>
              <a>
                <span className='icon'>http://imageproof.ai/
                  <i className='bx bx-log-out'></i>
                </span>
                <span className='menu-title'>Logout</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
