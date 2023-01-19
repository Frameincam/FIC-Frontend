import Link from "next/link";
// import NavbarThree from "../../../../components/_App/NavbarThree";
import DashboardNavbar from "../../../components/Dashboard/DashboardNavbar";
import ReactLoading from "react-loading";

import { CgTrash } from "react-icons/cg";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Navbar from "../../../components/_App/Navbar";
import swal from "sweetalert";

const AddListing = () => {
  const [run, setRun] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [vendorPhotos, setVendorPhotos] = useState([]);
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(true);
  // const [displayVideo, setDisplayVideo] = useState(false);
  // const [isOpen, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // const videoPopup = () => {
  //   setDisplayVideo(!displayVideo);
  // };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="drop-gallery-thumb">
      <img src={file.preview} />
    </div>
  ));

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("we are running on the client");
      let user = localStorage.getItem("user");
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setToken(localStorage.getItem("token"));
      getVendorProfile(parsedUser._id);
      getVendorVideos(parsedUser._id);
    } else {
      console.log("we are running on the server");
    }
  }, [run]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const getVendorProfile = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile/${id}`
      );
      console.log(data);
      console.log(data.vendor.vendorPictures);
      let pictureUrl = [];
      let photoId = data.vendor.vendorPictures;
      for (var i = 0; i < photoId.length; i++) {
        if (photoId[i] !== null) {
          pictureUrl.push(
            `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${photoId[i]}`
          );
        }
      }
      setVendorPhotos(pictureUrl);
      console.log(vendorPhotos);
      if (pictureUrl.length > 0) {
        if (vendorPhotos.length < 1) {
          setRun(!run);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadVendorPhotos = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    console.log(files);
    console.log(user);
    for (var i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }
    console.log(files);
    if (files.length > 0) {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/account/vendor/upload-pictures/${token}`,
        formData
      );
      console.log(data);
      if (data.success) {
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          button: "OK !",
        });
        let pictureUrl = [];
        let photoId = data.vendorPictures;
        for (var i = 0; i < photoId.length; i++) {
          if (photoId[i] !== null) {
            pictureUrl.push(
              `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${photoId[i]}`
            );
          }
        }
        setLoading(false);
        setVendorPhotos(pictureUrl);
        setRun(!run);
        setFiles([]);
      } else {
        swal({
          title: "Error",
          text: data.msg,
          icon: "error",
          button: "Ok! ..",
        });
      }
    } else {
      swal({
        title: "Error",
        text: "Please Upload a Image...!",
        icon: "error",
        button: "OK!"
      })
      setLoading(false);
    }

  };

  const removeVendorPhoto = async (e, picId) => {
    e.preventDefault();
    const picArray = picId.split(
      `${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/`
    );
    const pictureId = picArray[1];
    const d = {
      pictureId,
    };
    console.log(d);
    try {
      const { data } = await axios.put(
        `${process.env.DOMAIN_NAME}/api/account/vendor/delete-picture/${token}`,
        d
      );
      console.log(data);
      if (data.success) {
        swal({
          title: "Success",
          text: data.msg,
          icon: "success",
          buton: "OK !..",
        });
        let pictureUrl = [];
        let photoId = data.vendorPictures;
        for (var i = 0; i < photoId.length; i++) {
          if (photoId[i] !== null) {
            pictureUrl.push(`${process.env.DOMAIN_NAME}/api/account/vendor/get-profile-photo/${photoId[i]}`);
          }
        }
        setVendorPhotos(pictureUrl);
      }

      console.log(vendorPhotos);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleVideoUrl = (e) => {
    let vUrl = e.target.value.split("https://www.youtube.com/watch?v=");
    console.log(vUrl);
    setVideoUrl(vUrl[1]);
    console.log(videos);
  };

  const uploadVideo = async (e) => {
    console.log("working")
    e.preventDefault();
    const d = {
      videoUrl,
    };
    if (videoUrl !== "") {
      try {
        const { data } = await axios.post(
          `${process.env.DOMAIN_NAME}/api/vendor/create-videos/${token}`,
          d
        );
        console.log(data);
        if (data.success) {
          setVideos(data.vendorVideoUrl);
          swal({
            title: "Success",
            text: data.msg,
            icon: "success",
            button: "OK",
          });
          setVideoUrl("")
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
    } else {
      swal({
        title: "Error",
        text: 'Please Enter Video Url...!',
        icon: "error",
        Button: "OK!"
      })
    }

  };

  const getVendorVideos = async (id) => {
    const { data } = await axios.get(
      `${process.env.DOMAIN_NAME}/api/vendor/video-url-get/${id}`,
    );
    console.log(data)
    if (data.vendorVideoUrl[0] != undefined) {
      console.log(data.vendorVideoUrl[0].vendorsVideoUrl);
      setVideos(data.vendorVideoUrl[0].vendorsVideoUrl);
    }
  };

  const deleteVideo = async (e, video) => {
    e.preventDefault();
    console.log(video);
    const d = {
      url: video,
    };
    const { data } = await axios.put(
      `${process.env.DOMAIN_NAME}/api/vendor/delete-videos/${token}`,
      d
    );
    console.log(data);
    if (data.success) {
      setVideos(data.vendorVideoUrl);
      swal({
        title: "Success",
        text: data.msg,
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        title: "Error",
        text: data.msg,
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <>
      {/* <div
          className={displayVideo ? "body_overlay open" : "body_overlay"}
        ></div> */}
      <DashboardNavbar />
      <div className="main-content d-flex flex-column">
        <Navbar navbar={show} />
        <div className="add-listings-box">
          <h3>Portfolio</h3>
          <div className="col-lg-12 col-md-12">
            <div className="products-details-tabs">
              <Tabs>
                <ul className="nav nav-tabs" id="myTab">
                  <TabList>
                    <Tab className="nav-item">
                      <a className="nav-link" id="description-tab">
                        Photos
                      </a>
                    </Tab>
                    <Tab className="nav-item">
                      <a className="nav-link" id="reviews-tab">
                        Videos
                      </a>
                    </Tab>
                  </TabList>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <TabPanel>
                    <div
                      className="tab-pane fade show active"
                      id="description"
                      role="tabpanel"
                      style={{ maxWidth: "unset" }}
                    >
                      <div
                        {...getRootProps()}
                        className="dropzone"
                        style={{ border: "none" }}
                      >
                        <h3 style={{ border: "none" }}>Gallery</h3>
                        {files.length > 0 ? (
                          <div className="gallery-flex">
                            {thumbs}
                            <input {...getInputProps()} />
                          </div>
                        ) : (
                          <div className="file-upload-box">
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          </div>
                        )}
                      </div>
                      <form onSubmit={uploadVendorPhotos}>
                        <div
                          className="add-listings-btn"
                          style={{ float: "right", marginTop: "50px" }}
                        >
                          <button type="submit">Upload</button>
                        </div>
                      </form>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      {loading && (
                        <div className="loader">
                          <ReactLoading type="spokes" color="#30eded" />
                        </div>
                      )}
                    </div>

                    <div
                      style={{ marginTop: "150px", marginBottom: "30px" }}
                      className="gallery"
                    >
                      {vendorPhotos.map((pic) => {
                        return (
                          <div className="listings-image">
                            <img
                              src={pic}
                              alt="missing"
                              className="gallery__img"
                            />
                            <div>
                              <form
                                onSubmit={(e) => {
                                  removeVendorPhoto(e, pic);
                                }}
                              // className="display-inline"
                              >
                                <button
                                  type="submit"
                                  className="btn-none image-trash"
                                >
                                  <CgTrash color="white" size="20" />
                                </button>
                              </form>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div
                      className="tab-pane"
                      id="reviews"
                      style={{ maxWidth: "unset" }}
                    >
                      <div className="products-reviews">
                        <h3>Videos</h3>
                      </div>
                      <form onSubmit={uploadVideo}>
                        <div className="row">
                          <div className="col-xl-6 col-lg-12 col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Youtube Video Url"
                              onChange={handleVideoUrl}
                              value={videoUrl}
                            />
                          </div>
                          <div className="col-xl-4 col-lg-12 col-md-12">
                            &nbsp;&nbsp;
                          </div>
                          <div
                            className="col-xl-2 col-lg-12 col-md-12"
                            style={{ textAlign: "center" }}
                          >
                            <button type="submit" className="video-upload mr-2">
                              Upload
                            </button>
                          </div>
                        </div>
                      </form>
                      <hr />
                      <div className="row">
                        {videos.map((video) => {
                          return (
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="video-responsive">
                                <iframe
                                  width="853"
                                  height="480"
                                  src={`https://www.youtube.com/embed/${video}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title="Embedded youtube"
                                />
                              </div>
                              <div>
                                <form onSubmit={(e) => deleteVideo(e, video)}>
                                  <button
                                    type="submit"
                                    className="btn-none video-trash"
                                  >
                                    <CgTrash color="white" size="20" />
                                  </button>
                                </form>
                              </div>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Videos upload section popup  */}
        {/* <div
          className={
            displayVideo
              ? "modal loginRegisterModal show"
              : "modal loginRegisterModal"
          }
          id="loginRegisterModal"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <Tabs>
                <button type="button" className="close" onClick={videoPopup}>
                  <i className="bx bx-x"></i>
                </button>

                <ul className="nav nav-tabs" id="myTab">
                  <h2 className="vendor-register-head">Videos</h2>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <form>
                    <div className="form-group">
                      <label>Video #1:</label>
                      <input
                        type="text"
                        placeholder="Enter a Embed Youtube or Vimeo Link"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Video #2:</label>
                      <input
                        type="text"
                        placeholder="Enter a Embed Youtube or Vimeo Link"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Video #3:</label>
                      <input
                        type="text"
                        placeholder="Enter a Embed Youtube or Vimeo Link"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <a className="default-btn close" onClick={videoPopup}>
                          Close
                        </a>
                        <button type="submit" className="default-btn">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Tabs>
            </div>
          </div>
        </div> */}
        {/* video end  */}

        <div className="flex-grow-1"></div>

        <div className="copyrights-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-6 col-md-6">
              <p>
                <i className="bx bx-copyright"></i>Copyright © 2020{" "}
                <a href="/">Frame In Cam</a>. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddListing;
