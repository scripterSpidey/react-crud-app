import { createSlice } from "@reduxjs/toolkit";

const initialState =  {adminInfo : localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        addAdmin:(state,action)=>{
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        removeAdmin:(state,action)=>{
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {addAdmin,removeAdmin} = adminSlice.actions;
export default adminSlice.reducer;