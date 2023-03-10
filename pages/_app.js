import React, { useState, useEffect } from 'react';
import { IndiceProvider } from '../contexts';

import '../public/css/animate.min.css';
import '../public/css/bootstrap.min.css';
import '../public/css/meanmenu.min.css';
import '../public/css/boxicons.min.css';
import '../public/css/flaticon.css';
import '../public/css/nice-select.min.css';
import '../public/css/style.css';
import '../public/css/responsive.css';

import Layout from '../components/_App/Layout';
import Loader from '../components/Shared/Loader';
import GoTop from '../components/Shared/GoTop';
import store from '../Redux/store';

import { Provider } from 'react-redux';
// import Common from './common';


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      <Layout>
        <Provider store={store}>
          <IndiceProvider>
            {/* <Common > */}
            <Component {...pageProps} />
            <Loader loading={loading} />
            <GoTop scrollStepInPx='100' delayInMs='10.50' />
            {/* </Common> */}
          </IndiceProvider>
        </Provider>
      </Layout>
    </>
  );
}

export default MyApp;
