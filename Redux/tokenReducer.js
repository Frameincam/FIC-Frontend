import * as actionTypes from "./tokenReducer";

const INITIAL_STATE = {};

const getTokenReducer = (state=INITIAL_STATE, action) =>{
    const {payload} = action;

    switch(action.type){
        case actionTypes.GET_TOKEN:
            return{
                ...state,
               token:  payload
            }
        default:
            return state
    }
}

export default getTokenReducer;