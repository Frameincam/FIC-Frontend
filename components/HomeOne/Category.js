import { FaBaby, FaPhotoVideo } from "react-icons/fa";
import { BiPhotoAlbum } from "react-icons/bi";
import {
  BsFillCameraFill,
  BsFillCameraReelsFill,
  BsCamera2,
  BsFillPersonFill,
} from "react-icons/bs";
import { ImManWoman, ImWoman } from "react-icons/im";
import { IoMan } from "react-icons/io5";
import { RiCamera3Fill } from "react-icons/ri";
import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();

  // Link to category wise filtering page

  const categoryLink = (id) => {
    router.push({
      pathname: "/dashboard/photographer/category",
      query: { id: id },
    });
  };

  return (
    <>
      <section className="category-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>
              Browse Photographers by <span>Category</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(1)}
              >
                <div className="icon">
                  <ImManWoman />
                </div>
                <span>Wedding Photography</span>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(2)}
              >
                <div className="icon">
                  <BsFillCameraReelsFill />
                </div>
                <span>Pre Wedding Shoot</span>
                <br />
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(3)}
              >
                <div className="icon">
                  <FaBaby />
                </div>
                <span>Baby Shoot</span>
                <br />
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(4)}
              >
                <div className="icon">
                  <BsCamera2 />
                </div>
                <span>Post-Wedding Photography</span>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(5)}
              >
                <div className="icon">
                  <BsFillCameraFill />
                </div>
                <span>Concept Photography</span>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(6)}
              >
                <div className="icon">
                  <i className="flaticon-calendar"></i>
                </div>
                <span>Fashion Shoots</span>
                <br />
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(7)}
              >
                <div className="icon">
                  <IoMan />
                </div>
                <span>Candid Photography</span>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(8)}
              >
                <div className="icon">
                  <BsFillPersonFill />
                </div>
                <span>Couple Portraits</span>
                <br />
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(9)}
              >
                <div className="icon">
                  <ImWoman />
                </div>
                <span>Bridal Photography</span>
                <br />
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(10)}
              >
                <div className="icon">
                  <RiCamera3Fill />
                </div>
                <span>Traditional Photography</span>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(11)}
              >
                <div className="icon">
                  <BiPhotoAlbum />
                </div>
                <span>Photo Album</span>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-md-4">
              <div
                className="single-category-box"
                onClick={() => categoryLink(12)}
              >
                <div className="icon">
                  <FaPhotoVideo />
                </div>
                <span>Digital Album</span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
