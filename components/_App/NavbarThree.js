import { useState, useContext, useEffect } from 'react';
import Link from '../../utils/ActiveLink';
import { IndiceContext } from "../../contexts";

const NavbarThree = () => {
  const { toggleSideMenu } = useContext(IndiceContext);
  const [showMenu, setshowMenu] = useState(false);
  const [displayMiniAuth, setDisplayMiniAuth] = useState(false);
  const [displayDropdownProfile, setDisplayDropdownProfile] = useState(false);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState();
  const [profileImg, setProfileImg] = useState(null);

  const toggleMiniAuth = () => {
    setDisplayMiniAuth(!displayMiniAuth);
  };

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };

  const toggleDropdownProfile = () => {
    setDisplayDropdownProfile(!displayDropdownProfile);
  };

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("user"));
    let tok = localStorage.getItem("token");
    if (u !== null) {
      setToken(tok);
      setUser(u)
      let pImg = `http://localhost:3002/api/account/vendor/get-profile-photo/${user.profilePicture}`;
      setProfileImg(pImg)

    }

  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }


  return (
    <>
      <div className='navbar-area'>
        <div className='miran-responsive-nav'>
          <div className='miran-responsive-menu'>
            <div
              onClick={() => toggleMenu()}
              className='hamburger-menu hamburger-two dashboard-hamburger'
            >
              {showMenu ? (
                <i className='bx bx-x'></i>
              ) : (
                <i className='bx bx-menu'></i>
              )}
            </div>
            <div className='responsive-burger-menu d-lg-none d-block' onClick={toggleSideMenu}>
              <span className='top-bar'></span>
              <span className='middle-bar'></span>
              <span className='bottom-bar'></span>
            </div>
          </div>
        </div>

        <div className={showMenu ? 'miran-nav show' : 'miran-nav'}>
          <nav className='navbar navbar-expand-md navbar-light'>
            <div className='collapse navbar-collapse mean-menu'>
              <ul className='navbar-nav'>
                {/* <li className='nav-item'>
                  <a href='#' className='dropdown-toggle nav-link'>
                    Home
                  </a>
                  <ul className='dropdown-menu'>
                  <li className='nav-item'>
                        <Link href='/' activeClassName='active'>
                          <a className='nav-link'>Home Demo - 1</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/index-2' activeClassName='active'>
                          <a className='nav-link'>Home Demo - 2</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/index-3' activeClassName='active'>
                          <a className='nav-link'>Home Demo - 3</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/index-4' activeClassName='active'>
                          <a className='nav-link'>Home Demo - 4</a>
                        </Link>
                      </li>
                  </ul>
                </li>

                <li className='nav-item'>
                  <a href='#' className='dropdown-toggle nav-link'>
                    Listings
                  </a>
                  <ul className='dropdown-menu'>
                    <li className='nav-item'>
                      <a href='#' className='nav-link'>
                        List Layout <i className='bx bx-chevron-right'></i>
                      </a>
                      <ul className='dropdown-menu'>
                      <li className='nav-item'>
                            <Link
                              href='/vertical-listings-left-sidebar'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Left Sidebar</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/vertical-listings-right-sidebar'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Right Sidebar</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/vertical-listings-full-width'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Full Width</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/vertical-listings-with-map'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Full Width + Map</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/vertical-listings-full-map'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Full Width + Full Map</a>
                            </Link>
                          </li>
                      </ul>
                    </li>

                    <li className='nav-item'>
                      <a href='#' className='nav-link'>
                        Grid Layout <i className='bx bx-chevron-right'></i>
                      </a>
                      <ul className='dropdown-menu'>
                      <li className='nav-item'>
                            <Link
                              href='/grid-listings-with-left-sidebar'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Left Sidebar</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/grid-listings-with-right-sidebar'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Right Sidebar</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/grid-listings-full-width'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Full Width</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/grid-listings-with-map'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Full Width + Map</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/grid-listings-full-map'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Full Width + Full Map</a>
                            </Link>
                          </li>
                      </ul>
                    </li>

                    <li className='nav-item'>
                        <Link href='/single-listings' activeClassName='active'>
                          <a className='nav-link'>Listings Details</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/destinations' activeClassName='active'>
                          <a className='nav-link'>Top Place</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/categories' activeClassName='active'>
                          <a className='nav-link'>Categories</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/user-profile' activeClassName='active'>
                          <a className='nav-link'>Author Profile</a>
                        </Link>
                      </li>
                  </ul>
                </li>

                <li className='nav-item'>
                  <a href='#' className='dropdown-toggle nav-link active'>
                    User Panel
                  </a>
                  <ul className='dropdown-menu'>
                  <li className='nav-item'>
                        <Link href='/dashboard' activeClassName='active'>
                          <a className='nav-link'>Dashboard</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/messages'
                          activeClassName='active'
                        >
                          <a className='nav-link'>Messages</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/bookings'
                          activeClassName='active'
                        >
                          <a className='nav-link'>Bookings</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/dashboard/wallet' activeClassName='active'>
                          <a className='nav-link'>Wallet</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/my-listing/active'
                          activeClassName='active'
                        >
                          <a className='nav-link'>My Listings</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/reviews'
                          activeClassName='active'
                        >
                          <a className='nav-link'>Reviews</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/bookmarks'
                          activeClassName='active'
                        >
                          <a className='nav-link'>Bookmarks</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/add-listing'
                          activeClassName='active'
                        >
                          <a className='nav-link'>Add Listings</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/profile'
                          activeClassName='active'
                        >
                          <a className='nav-link'>My Profile</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link
                          href='/dashboard/invoice'
                          activeClassName='active'
                        >
                          <a className='nav-link'>Invoice</a>
                        </Link>
                      </li>
                  </ul>
                </li>

                <li className='nav-item'>
                  <a href='#' className='dropdown-toggle nav-link'>
                    Shop
                  </a>
                  <ul className='dropdown-menu'>
                  <li className='nav-item'>
                        <Link href='/shop' activeClassName='active'>
                          <a className='nav-link'>Products List</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/cart' activeClassName='active'>
                          <a className='nav-link'>Cart</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/checkout' activeClassName='active'>
                          <a className='nav-link'>Checkout</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/product-details' activeClassName='active'>
                          <a className='nav-link'>Products Details</a>
                        </Link>
                      </li>
                  </ul>
                </li>

                <li className='nav-item'>
                  <a href='#' className='dropdown-toggle nav-link'>
                    Blog
                  </a>
                  <ul className='dropdown-menu'>
                  <li className='nav-item'>
                        <Link href='/blog-1' activeClassName='active'>
                          <a className='nav-link'>Grid (2 in Row)</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/blog-2' activeClassName='active'>
                          <a className='nav-link'>Grid (3 in Row)</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/blog-3' activeClassName='active'>
                          <a className='nav-link'>Grid (Full Width)</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/blog-4' activeClassName='active'>
                          <a className='nav-link'>Right Sidebar</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/blog-5' activeClassName='active'>
                          <a className='nav-link'>Left Sidebar</a>
                        </Link>
                      </li>

                    <li className='nav-item'>
                      <a href='#' className='nav-link'>
                        Single Post <i className='bx bx-chevron-right'></i>
                      </a>
                      <ul className='dropdown-menu'>
                      <li className='nav-item'>
                            <Link
                              href='/single-blog-1'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Default</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/single-blog-2'
                              activeClassName='active'
                            >
                              <a className='nav-link'>With Video</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/single-blog-3'
                              activeClassName='active'
                            >
                              <a className='nav-link'>With Image Slider</a>
                            </Link>
                          </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li className='nav-item'>
                  <a href='#' className='dropdown-toggle nav-link'>
                    Pages
                  </a>
                  <ul className='dropdown-menu'>
                  <li className='nav-item'>
                        <Link href='/about' activeClassName='active'>
                          <a className='nav-link'>About Us</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/how-it-works' activeClassName='active'>
                          <a className='nav-link'>How It Work</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/pricing' activeClassName='active'>
                          <a className='nav-link'>Pricing</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/gallery' activeClassName='active'>
                          <a className='nav-link'>Gallery</a>
                        </Link>
                      </li>

                    <li className='nav-item'>
                      <a href='#' className='nav-link'>
                        Events <i className='bx bx-chevron-right'></i>
                      </a>
                      <ul className='dropdown-menu'>
                      <li className='nav-item'>
                            <Link href='/events' activeClassName='active'>
                              <a className='nav-link'>Events</a>
                            </Link>
                          </li>

                          <li className='nav-item'>
                            <Link
                              href='/single-events'
                              activeClassName='active'
                            >
                              <a className='nav-link'>Events Details</a>
                            </Link>
                          </li>
                      </ul>
                    </li>

                    <li className='nav-item'>
                        <Link href='/testimonial' activeClassName='active'>
                          <a className='nav-link'>Testimonials</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/faq' activeClassName='active'>
                          <a className='nav-link'>FAQ</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/404' activeClassName='active'>
                          <a className='nav-link'>404 Error</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/coming-soon' activeClassName='active'>
                          <a className='nav-link'>Coming Soon</a>
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link href='/contact' activeClassName='active'>
                          <a className='nav-link'>Contact</a>
                        </Link>
                      </li>
                  </ul>
                </li> */}
              </ul>

              <div className='others-option d-flex align-items-center'>
                <div className='option-item'>
                  <div className='dropdown profile-nav-item menu-profile-one'>
                    <a
                      href='#'
                      className='dropdown-toggle'
                      role='button'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      <div className='menu-profile'>
                        <img
                          src={profileImg}
                          className='rounded-circle'
                          alt='image'
                        />
                        <span className='name' onClick={toggleDropdownProfile}>My Account</span>
                      </div>
                    </a>

                    <div className={
                      displayDropdownProfile
                        ? 'dropdown-menu show'
                        : 'dropdown-menu'
                    }>

                      <div className='dropdown-header d-flex flex-column align-items-center'>
                        <div className='figure mb-3'>
                          <img
                            src={profileImg}
                            className='rounded-circle'
                            alt='image'
                          />
                        </div>

                        <div className='info text-center'>
                          <span className='name'>{user.name}</span>
                          <p className='mb-3 email'>{user.email}</p>
                        </div>
                      </div>

                      <div className='dropdown-body'>
                        {/* <ul className='profile-nav p-0 pt-3'>
                          <li className='nav-item'>
                            <Link href="/dashboard">
                              
                            <a className='nav-link'>
                              <i className='bx bx-user'></i> <span>Dashboard</span>
                            </a>
                            </Link>
                          </li>


                          <li className='nav-item'>
                        
                            <a href='dashboard-messages.html' className='nav-link'>
                              <i className='bx bx-envelope'></i><span>Messages</span>
                            </a>
                            
                          </li>

                          <li className='nav-item'>
                            <a href='dashboard-bookings.html' className='nav-link'>
                              <i className='bx bx-edit-alt'></i>{' '}
                              <span>Bookings</span>
                            </a>
                          </li>

                          <li className='nav-item'>
                            <a
                              href='dashboard-my-profile.html'
                              className='nav-link'
                            >
                              <i className='bx bx-cog'></i> <span>Settings</span>
                            </a>
                          </li>
                        </ul> */}
                      </div>

                      <div className='dropdown-footer'>
                        <ul className='profile-nav'>
                          <li className='nav-item'>
                            <a href='/' className='nav-link' onClick={logout}>
                              <i className='bx bx-log-out'></i> <span>Logout</span>
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
            </div>
          </nav>
        </div>

        <div className='others-option-for-responsive'>
          <div className='container'>
            <div className='dot-menu' onClick={toggleMiniAuth}>
              <div className='inner'>
                <div className='circle circle-one'></div>
                <div className='circle circle-two'></div>
                <div className='circle circle-three'></div>
              </div>
            </div>

            <div className={displayMiniAuth ? 'container active' : 'container'}>
              <div className='option-inner'>
                <div className='others-option'>
                  <div className='option-item'>
                    <div className='dropdown profile-nav-item'>
                      <a
                        href='#'
                        className='dropdown-toggle'
                        role='button'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <div className='menu-profile'>
                          <img
                            src={profileImg}
                            className='rounded-circle'
                            alt='image'
                          />
                          <span className='name' onClick={toggleDropdownProfile}>
                            My Account
                          </span>
                        </div>
                      </a>

                      <div
                        className={
                          displayDropdownProfile
                            ? 'dropdown-menu show'
                            : 'dropdown-menu'
                        }
                      >
                        <div className='dropdown-header d-flex flex-column align-items-center'>
                          <div className='figure mb-3'>
                            <img
                              src={profileImg}
                              className='rounded-circle'
                              alt='image'
                            />
                          </div>

                          <div className='info text-center'>
                            <span className='name'>{user.name}</span>
                            <p className='mb-3 email'>{user.email}</p>
                          </div>
                        </div>

                        <div className='dropdown-body'>
                          {/* <ul className='profile-nav p-0 pt-3'>
                            <li className='nav-item'>
                              <a href='dashboard.html' className='nav-link'>
                                <i className='bx bx-user'></i>{' '}
                                <span>Dashboard</span>
                              </a>
                            </li>

                            <li className='nav-item'>
                              <a
                                href='dashboard-messages.html'
                                className='nav-link'
                              >
                                <i className='bx bx-envelope'></i>{' '}
                                <span>Messages</span>
                              </a>
                            </li>

                            <li className='nav-item'>
                              <a
                                href='dashboard-bookings.html'
                                className='nav-link'
                              >
                                <i className='bx bx-edit-alt'></i>{' '}
                                <span>Bookings</span>
                              </a>
                            </li>

                            <li className='nav-item'>
                              <a
                                href='dashboard-my-profile.html'
                                className='nav-link'
                              >
                                <i className='bx bx-cog'></i> <span>Settings</span>
                              </a>
                            </li>
                          </ul> */}
                        </div>

                        <div className='dropdown-footer'>
                          <ul className='profile-nav'>
                            <li className='nav-item'>
                              <a href='/' className='nav-link' onClick={logout}>
                                <i className='bx bx-log-out'></i>{' '}
                                <span>Logout</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className='option-item'>
                    <a href='dashboard-add-listings.html' className='default-btn'>
                      <i className='flaticon-more'></i> Add Listing
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarThree;
