import {combineReducers} from "@reduxjs/toolkit"
// Redux Toolkit gives us a helper called combineReducers.This lets you combine many small reducers (each from a slice) into one.Why? Because configureStore takes only one reducer, not many.
import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice";
import profileReducer from "../slices/profileSlice"
import courseReducer from "../slices/courseSlice"
const rootReducer=combineReducers({
    auth:authReducer,
    //  auth is a key (namespace) in the global state.creating a rootReducer by combining all your slices.auth is the slice name → this becomes state.auth in your Redux state.authReducer is the reducer function returned from authSlice.reducer
    // auth:Key in the Redux state (state.auth)
    // authReducer:	The reducer function from the authSlice file
    // Slice:A module (file) that includes reducer +actions+ state  
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer
})

export default rootReducer