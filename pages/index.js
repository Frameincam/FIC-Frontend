import Navbar from '../components/_App/Navbar';
import Banner from '../components/HomeOne/Banner';
import Features from '../components/HomeOne/Features';
import Category from '../components/HomeOne/Category';
import Feedback from '../components/Common/Feedback';
// import HowItWorks from '../components/Common/HowItWorks';
import Blog from '../components/Common/Blog';
import Footer from '../components/_App/Footer';
import { useState } from 'react';

const Index = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Navbar navbar={show} />
      <Banner />
      {/* <ListingArea /> */}
      <Features />
      <Category />
      {/* <DestinationsTwo /> */}
      <Feedback />
      {/* <HowItWorks bgColor="bg-f9f9f9" /> */}
      <Blog />
      <hr />
      {/* <AppDownload /> */}
      <Footer />
    </>
  );
};

export default Index;
