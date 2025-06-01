import {createSlice} from "@reduxjs/toolkit"
// Initially, no user is logged in  so user is null. when the user logs in then his user details will be stored in state.user
const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    loading:false
}
const profileSlice=createSlice({
    name:"Profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
            // Updates the logged-in user’s data in the Redux store (state.user).
            localStorage.setItem("user",JSON.stringify(value.payload))
        },
        setLoading(state,value){
            state.loading=value.payload
        }
    }
})
// setUser of reducer fn takes the current state and an action object.It updates the user value in the state using value.payload
export const {setUser,setLoading} =profileSlice.actions;
export default profileSlice.reducer;
// setUser is a  reducer function that takes the current state which is stored in state.user and an action object which is send by the dispatch .It updates the user value in the state  with the value send in the action payload