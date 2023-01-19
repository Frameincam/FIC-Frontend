import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

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

const Feedback = ({ title, bgColor, bgImage }) => {
  const [display, setDisplay] = useState(false);
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
  }, []);

  return (
    <>
      <div className={`feedback-area ${bgImage} ${bgColor} ptb-100`}>
        <div className='container'>
          {title && (
            <div className='section-title'>
              <h2>User’s Feedback About Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra.
              </p>
            </div>
          )}

          <div className='feedback-slides owl-theme'>
            {display ? (
              <OwlCarousel {...options}>
                <div className='single-feedback-box'>
                  <div className='rating'>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                  </div>
                  <p>
                    A venture which provides you the perfect escape from everyday hassles
                    by taking you into their imaginative world of photography.
                    Despite being new in this industry, FrameInCam have done quite a
                    remarkable job in taking us photographers right to the consumer
                    who has also been looking to hire the right talent to capture their memories for a lifetime.
                  </p>
                  <div className='client-info'>
                    <div className='d-flex align-items-center'>
                      <img src='/images/user1.jpg' alt='image' />
                      <div className='title'>
                        <h3>Dileep</h3>
                        <span>Photographer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='single-feedback-box'>
                  <div className='rating'>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                  </div>
                  <p>
                    We have always been connoisseurs playing with lights, emotions, and
                    frames just like their name suggests, frameincam has given us a
                    platform to bring our talent to the world. They have a very stringent
                    on-boarding process, which also gave us the confidence that we are on
                    the right platform to showcase our talent.
                    <br />
                    <br />
                  </p>
                  <div className='client-info'>
                    <div className='d-flex align-items-center'>
                      <img src='/images/user2.jpg' alt='image' />
                      <div className='title'>
                        <h3>Sash</h3>
                        <span>Photographer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='single-feedback-box'>
                  <div className='rating'>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                  </div>
                  <p>
                    Our passion about photography and endeavour to capture your special
                    moments with utmost precision, were always covered in the noise around
                    us, and then came FrameInCam platform which gave us the right takeoff,
                    we are confident about this platform to take us to a bigger audience
                    because of their vigour and commitment to the photographers world.
                  </p>
                  <div className='client-info'>
                    <div className='d-flex align-items-center'>
                      <img src='/images/user3.jpg' alt='image' />
                      <div className='title'>
                        <h3>Sunesh</h3>
                        <span>Photographer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='single-feedback-box'>
                  <div className='rating'>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                  </div>
                  <p>
                    We believe in telling beautiful stories with the click of our cameras.
                    Composed of a passionate, enthusiastic and artful team of creative
                    photographers, we have always been looking for the right platform where
                    we could showcase our talent and chanced upon FramInCam which gave us
                    the right platform to take off.
                    <br />
                    <br />
                  </p>
                  <div className='client-info'>
                    <div className='d-flex align-items-center'>
                      <img src='/images/user4.jpg' alt='image' />
                      <div className='title'>
                        <h3>Jobi</h3>
                        <span>Photographer</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className='single-feedback-box'>
                  <div className='rating'>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star-half'></i>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor ut labore et dolore magna aliqua. Quis
                    ipsum suspendisse ultrices gravida. Risus viverra maecenas
                    accumsan.
                  </p>
                  <div className='client-info'>
                    <div className='d-flex align-items-center'>
                      <img src='/images/user2.jpg' alt='image' />
                      <div className='title'>
                        <h3>Sarah Taylor</h3>
                        <span>Hotel Owner</span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className='single-feedback-box'>
                  <div className='rating'>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bxs-star'></i>
                    <i className='bx bx-star'></i>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor ut labore et dolore magna aliqua. Quis
                    ipsum suspendisse ultrices gravida. Risus viverra maecenas
                    accumsan.
                  </p>
                  <div className='client-info'>
                    <div className='d-flex align-items-center'>
                      <img src='/images/user3.jpg' alt='image' />
                      <div className='title'>
                        <h3>Alex Hales</h3>
                        <span>Developer</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </OwlCarousel>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
