import dynamic from "next/dynamic";

const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../../../components/_App/Footer";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import Navbar from "../../../components/_App/Navbar";

const LocationId = () => {
  const [loader, setLoader] = useState(true);
  const [vendorData, setVendorData] = useState([]);
  const [run, setRun] = useState(false);

  const reduxData = useSelector((state) => state.vendor.vendor);
  console.log(reduxData)

  const router = useRouter();
  const locationId = router.query.id;
  const stateId = router.query.states;
  const cityId = router.query.cities;

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
    } else {
      console.log("we are running on the server");
    }
    vendorGetSubmit();
  }, [run]);

  // Get the id through params and filter vendors by state and city
  const vendorGetSubmit = async () => {
    // If state and city are not selected then show all the vendors
    if (locationId == 0 && stateId == undefined && cityId == undefined) {
      console.log(reduxData);
      setVendorData(reduxData);
    }
    // If state is selected and city is not selected then show vendors in that city
    if (stateId !== undefined && cityId == undefined) {
      const statesArray = [];
      console.log(statesArray)
      reduxData.map((ven) => {
        if (ven.state[1] == stateId) {
          statesArray.push(ven);
          console.log(ven)
        }
      });
      setVendorData(statesArray);
    }
    // If city is selected then show the vendors in that city
    if (cityId !== undefined) {
      const citiesArray = [];
      reduxData.map((ven) => {
        if (ven.city[1] == cityId) {
          citiesArray.push(ven);
        }
      });
      console.log(citiesArray);
      setVendorData(citiesArray);
    }
    console.log(reduxData.length, "this is length");
    console.log(vendorData.length);
    if (reduxData.length < 1 || vendorData.length < 1) {
      setRun(!run);
    }
  };

  const singlePhotographer = (id) => {
    router.push({
      pathname: "/dashboard/photographer",
      query: { id: id },
    });
  };

  return (
    <div className="All-Vendors">
      <div>
        <Navbar navColor={true} />
      </div>

      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row">
          {vendorData.map((vendor) => {
            let profilePic = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${vendor.profilePicture}`;
            let coverPic = `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${vendor.coverPicture}`;

            return (
              <div
                className="col-xl-4 col-lg-6 col-md-6"
                key={vendor._id}
                onClick={() => singlePhotographer(vendor._id)}
              >
                <div className="single-listings-box">
                  <div
                    className="listings-image img-before-none"
                    id="img-before-none"
                  >
                    {vendor.coverPicture != "undefined" ? (
                      <div className="single-destinations-box">
                        <img
                          src={coverPic}
                          alt="image"
                          className="img-zoom img-height image-fit cursur-pointer "
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

export default LocationId;
