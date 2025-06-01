import { createSlice } from "@reduxjs/toolkit";
//control a loading progress bar (0-100%)
const initialState={
    progress:0,// its a state,Starts at 0% (hidden/empty)
    
}
const loadingBarSlice=createSlice({
    name:"loadingBar",
    initialState:initialState,
    reducers:{
        setProgress:(state,action)=>{
            return action.payload
// It completely ignores the current state (state) It just takes whatever number you send it (action.payload)And makes that the new progress value
        }
    }

});
export const{setProgress}=loadingBarSlice.actions;
export default loadingBarSlice.reducer
// // dispatch(setProgress(30))=calls the function in dispatch sends it an object action {
//   type: "loadingBar/setProgress", 
//   payload: 30
// reducer fn will run and change the current state to { progress: 30 }
