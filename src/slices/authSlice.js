import { createSlice } from "@reduxjs/toolkit";
// Imports the createSlice function from Redux Toolkit.This helps you create(sar) state + actions+ reducer  in one place.
const initialState={
    signupData:null,
     token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    // Looks into the browser's local storage.Tries to get the value stored under the key "token"
    loading:false,
};
const authSlice=createSlice({//A function from Redux Toolkit that creates a slice which in turn helps us to create state + actions+ reducer
    name:"auth",//name of the slice
    initialState:initialState,
    reducers:{
        //Name of the reducer (also becomes an action name: auth/setToken)
        setToken(state,value){
            state.token=value.payload
        },
   
    setSignupData(state,value){
        state.signupData=value.payload
    },
    setLoading(state,value){
        state.loading=value.payload;
    }
     },
});
export const {setToken,setSignupData,setLoading}=authSlice.actions;//exporting the action for the dispatch
export default authSlice.reducer;//exporting the slice for combinereducers
//dispatch(setToken("abc123")),,so dispatch is like a event trigger to create an action of type="auth/setToken",, setToken is the reducer name here,, to change the value of state
//action={
//  type: "auth/setToken",
//  payload: "abc123"
//automatically created by redux
//setToken(state, value);;here state is null(initially) and value is action variable above
//state.token = value.payload..now reducer changes the state.token = "abc123" this is the new state
//====================================================================================
// When you do configureStore({ reducer: { auth: authReducer } }), Redux takes your initialState and sets
// state.auth = { token: /* whatever initialState.token was */ }
// state parameter
// Inside your reducer function, the first argument state is a reference to that slice’s current state in the store—not the initialState variable.

// Think of the Redux store as a big object (like a box) holding all your website data.
// Instead of putting everything in one place, we split it into smaller parts called slices.
// Each slice manages one feature of the app (like userSlice, cartSlice, productSlice).

// A slice contains:
// Initial state (the data it starts with)
// Reducers (functions that update the state)
// Actions (generated automatically when we use createSlice)