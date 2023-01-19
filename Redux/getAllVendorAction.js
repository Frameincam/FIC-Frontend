import { GET_ALL_VENDORS } from "./getAllVendorTypes";

export const getAllVendor = (vendors) =>{
    return{
        type: GET_ALL_VENDORS,
        payload: vendors,
    }
}