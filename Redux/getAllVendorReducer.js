import * as actionTypes from './getAllVendorTypes'

const INITIAL_STATE = {
    vendor: []
}

const allVendorsReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case(actionTypes.GET_ALL_VENDORS):
            return{
                vendor: action.payload,
            }
        default:
            return state
    }
}

export default allVendorsReducer;