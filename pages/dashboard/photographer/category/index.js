import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Footer from "../../../../components/_App/Footer";
import Navbar from "../../../../components/_App/Navbar";

const GridListing = () => {
  const [allVendors, setAllVendors] = useState([]);
  const [loader, setLoader] = useState(true);
  const [run, setRun] = useState(false);

  const router = useRouter();

  const category = router.query.id;

  const reduxData = useSelector((state) => state.vendor.vendor);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
      // Fetch vendors by category
      getCategoryVendors();
    } else {
      console.log("we are running on the server");
    }
  }, [run, category]);

  const getCategoryVendors = () => {
    let serviceVendorsArray = [];
    console.log(serviceVendorsArray)
    // Filter vendor by services

    reduxData.map((ven) => {
      if (ven.services.length > 0) {
        ven.services.map((serv) => {
          if (serv.id == category) {
            serviceVendorsArray.push(ven);
          }
        });
      }
    });

    setAllVendors(serviceVendorsArray);
    if (reduxData.length < 1 || allVendors.length < 1) {
      setRun(!run);
    }
  };

  const singlePhotographer = (id) => {
    console.log(id);
    router.push({
      pathname: "/dashboard/photographer",
      query: { id: id },
    });
  };

  return (
    <div className="All-Vendors">
      <Navbar navColor={true} />
      <div
        className="container"
        style={{ paddingTop: "100px", marginTop: "50px" }}
      >
        <div className="row">
          {allVendors.map((vendor) => {
            let profilePic = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${vendor.profilePicture}`;
            let coverPic = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${vendor.coverPicture}`;
            let cover = coverPic.split(
              `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/`
            );

            return (
              <div className="col-xl-4 col-lg-6 col-md-6" key={vendor._id}>
                <div className="single-listings-box">
                  <div
                    className="listings-image img-before-none"
                    id="img-before-none"
                    onClick={(e) => singlePhotographer(vendor._id)}
                  >
                    {cover[1] != "undefined" ? (
                      <div className="single-destinations-box">
                        <img
                          src={coverPic}
                          alt="image"
                          className="img-height image-fit cursur-pointer"
                        />
                      </div>
                    ) : (
                      <img
                        src="/images/profile.png"
                        alt="image"
                        className="img-height image-fit cursur-pointer"
                      />
                    )}

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
                            style={{ fontSize: "12px", paddingLeft: "5px" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer bgColor="bg-f5f5f5" />
    </div>
  );
};

export default GridListing;
