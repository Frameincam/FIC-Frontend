import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getAllVendor } from '../Redux/getAllVendorAction';


const Common = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllVendors()
    }, []);
    

    const getAllVendors = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.DOMAIN_NAME}/api/account/vendor/get-allprofiles`
          );
          console.log(data, d);
          dispatch(getAllVendor(data.vendors));
          
        } catch (error) {
          console.log("failed");
        }
      };

      return <><p>hello</p></>;
  
}

export default Common