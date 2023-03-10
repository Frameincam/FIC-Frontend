import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

//components
import Navbar from "../components/_App/Navbar";
import PageBanner from "../components/Common/PageBanner";
import HowItWorks from "../components/Common/HowItWorks";
import Feedback from "../components/Common/Feedback";
// import Countdowns from "../components/Common/Countdowns";
import Footer from "../components/_App/Footer";

const options = {
  loop: true,
  margin: 0,
  nav: false,
  mouseDrag: false,
  items: 7,
  dots: false,
  autoplay: true,
  smartSpeed: 500,

  navText: [
    "<i class='flaticon-left-chevron'></i>",
    "<i class='flaticon-right-chevron'></i>",
  ],
};

const About = ({ }) => {
  const [display, setDisplay] = useState(false);
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
  }, []);

  return (
    <>
      <Navbar />
      <PageBanner pageTitle="About Us" pageName="About Us" />
      <section className="about-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <div className="about-content">
                {/* <h2>How We Were Established</h2> */}
                <h2 className="text-align-center">The Beginning</h2>
                {/* <span>
                  <strong>
                    Check video presentation to find out more about us.
                  </strong>
                </span> */}
                <p className="about-beginning">
                  Hailing from a humble background, and coming from a small town
                  in northern part of Kerala, Parappanangadi, I have always been
                  intrigued by the nuances of capturing moments and framing them
                  as memories. I have always had an urge to do something for the
                  photographer community that gave me everything of what I'm
                  today. Its my small endeavour to ensure that everyone in my
                  community get a platform to showcase their talent, and to grow
                  as an artist. FrameInCam was founded to give everyone an
                  unbiased platform for the world to recognise and hire the
                  right talent.
                </p>
                <p className="about-bold pr">Shahin C K{"   "}</p>
                <p className="about-bold">Founder, CEO</p>
                {/* <p>
                  Every month they moved their money the old way ??? which wasted
                  their time and money. So they invented a beautifully simple
                  workaround that became a billion-dollar business.
                </p> */}
              </div>
            </div>

            {/* <div className='col-lg-6 col-md-12'>
              <div className='about-image'>
                <img src='/images/about-img.jpg' alt='image' />
                <a
                  href='https://www.youtube.com/watch?v=bk7McNUjWgw'
                  className='video-btn popup-youtube'
                >
                  <i className='bx bx-play'></i>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className='funfacts-area pb-70'>
        <div className='container'>
          <div className='row'>
          <Countdowns/>
          </div>
        </div>
      </section> */}

      <section className="team-area pt-100 pb-70 bg-f9f9f9">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Awesome Team</h2>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra.
            </p> */}
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="single-team-member">
                <div className="member-image">
                  <img src="/images/team/team1.jpg" alt="image" />

                  {/* <ul className="social">
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                  </ul> */}
                </div>

                <div className="member-content">
                  <h3>
                    <a href="#">Shahin</a>
                  </h3>
                  <span>CEO</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="single-team-member">
                <div className="member-image">
                  <img src="/images/team/team2.jpg" alt="image" />

                  {/* <ul className="social">
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                  </ul> */}
                </div>

                <div className="member-content">
                  <h3>
                    <a href="#">Shemina</a>
                  </h3>
                  <span>COO</span>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-team-member">
                <div className="member-image">
                  <img src="/images/team/team3.jpg" alt="image" />

                  <ul className="social">
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="member-content">
                  <h3>
                    <a href="#">Steven Smith</a>
                  </h3>
                  <span>Web Developer</span>
                </div>
              </div>
            </div> */}

            {/* <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-team-member">
                <div className="member-image">
                  <img src="/images/team/team4.jpg" alt="image" />

                  <ul className="social">
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" rel="noreferrer">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="member-content">
                  <h3>
                    <a href="#">John Capabel</a>
                  </h3>
                  <span>Programer</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* <HowItWorks /> */}
      {/* 
      <div className='partner-area ptb-100 bg-f5f5f5'>
        <div className='container'>
          <div className='section-title'>
            <h2>Our Partners</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra.
            </p>
          </div>

          <div className='partner-slides owl-theme'>
            {display ? (
              <OwlCarousel className='owlNavOne' {...options}>
                <div className='partner-item'>
                  <a href='#'>
                    <img src='/images/partner/partner1.png' alt='image' />
                  </a>
                </div>

                <div className='partner-item'>
                  <a href='#'>
                    <img src='/images/partner/partner2.png' alt='image' />
                  </a>
                </div>

                <div className='partner-item'>
                  <a href='#'>
                    <img src='/images/partner/partner3.png' alt='image' />
                  </a>
                </div>

                <div className='partner-item'>
                  <a href='#'>
                    <img src='/images/partner/partner4.png' alt='image' />
                  </a>
                </div>

                <div className='partner-item'>
                  <a href='#'>
                    <img src='/images/partner/partner5.png' alt='image' />
                  </a>
                </div>

                <div className='partner-item'>
                  <a href='#'>
                    <img src='/images/partner/partner6.png' alt='image' />
                  </a>
                </div>
              </OwlCarousel>
            ) : (
              ''
            )}
          </div>
        </div>
      </div> */}
      <Feedback bgColor="bg-f9f9f9" />
      <Footer />
    </>
  );
};

export default About;
