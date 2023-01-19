import * as actionTypes from "./userTypes";
const INITIAL_STATE = {
    user: { user : {user: {name: ''}}},
}

const userReducer = (state = INITIAL_STATE , action) =>{
    switch (action.type) {
        case actionTypes.GET_USER:
            return{
                ...state,
                user: action.payload,
                
            };
            default:
                return state ;
    }

}



export default userReducer;