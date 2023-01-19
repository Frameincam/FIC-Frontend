
import { GET_USER } from "./userTypes"

export const getUser = (user) => {
    return{
        type:GET_USER,
        payload:{
            user
        }

    }
}