import Link from "next/link";

const Features = () => {
  return (
    <>
      <section className="features-area ptb-100">
        <div className="container">
          <div className="section-title">
            <h2>
              <span> FrameInCam - </span> Gateway to your passion
            </h2>
            <p>
              FrameInCam is india's first AI Driven, photographer discovery
              platform.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-features-box">
                <div className="icon">
                  <i className="flaticon-commerce"></i>
                </div>
                <h3>Launch Your Studio</h3>
                <p>
                  Let the world know your studio, and the services you provide,
                  by creating a profile in FrameInCam.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-features-box">
                <div className="icon">
                  <i className="flaticon-project"></i>
                </div>
                <h3>Talk To Your Customers</h3>
                <p>
                  FrameInCam enables you to converse with your customers, and
                  align their needs.
                </p>
              </div>
            </div>

            <div
              className="
              col-lg-4 col-md-6 col-sm-6
              offset-lg-0 offset-md-3 offset-sm-3
            "
            >
              <div className="single-features-box">
                <div className="icon">
                  <i className="flaticon-growth"></i>
                </div>
                <h3>Grow Your Business</h3>
                <p>
                  FrameInCam is India's first AI Driven photographer discovery
                  platform, enabling you to grow your business by helping
                  customers reach you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>
    </>
  );
};

export default Features;
