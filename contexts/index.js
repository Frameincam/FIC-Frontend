// import { createContext, useContext,useState } from 'react';

// const AppContext = createContext();

// export function AppWrapper({ children }) {
//     const [ displaySideMenu,setDisplaySideMenu ] = useState(false);

//     const toggleSideMenu = () => {
//         setDisplaySideMenu(!displaySideMenu);
//     }

//   return (
//     <AppContext.Provider value={{displaySideMenu,toggleSideMenu}}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(AppContext);
// }

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllVendor } from '../Redux/getAllVendorAction';

const IndiceContext = createContext();

const IndiceProvider = ({ children }) => {
  const [displaySideMenu, setDisplaySideMenu] = useState(false);

  const toggleSideMenu = () => {
    setDisplaySideMenu(!displaySideMenu);
  };

  const dispatch = useDispatch();

    useEffect(() => {
        getAllVendors()
    }, []);
    

    const getAllVendors = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.DOMAIN_NAME}/api/account/vendor/get-allprofiles`
          );
          console.log(data);
          dispatch(getAllVendor(data.vendors));
          
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <IndiceContext.Provider
      value={{
        displaySideMenu,
        toggleSideMenu,
      }}
    >
      {children}
    </IndiceContext.Provider>
  );
};

export { IndiceProvider, IndiceContext };
