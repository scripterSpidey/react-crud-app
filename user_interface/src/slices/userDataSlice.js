import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userDatas:localStorage.getItem('userDatas') ? JSON.parse(localStorage.getItem('userDatas')) : null
} 

const userDataSlice = createSlice({
    name:'allUsers',
    initialState,
    reducers:{
        setAllUsers:(state,action)=>{
            state.userDatas = action.payload
            localStorage.setItem('userDatas',JSON.stringify(action.payload))
        },
        removeUsers:(state,action)=>{
            state.userDatas = null;
            localStorage.removeItem('userDatas')
        },
        updateUser:(state,action)=>{
            const{userId,name,email} = action.payload;
            state.userDatas.map(user=>{
                if(user._id==userId){
                    user.name = name;
                    user.email = email;
                }
            })
            localStorage.setItem('userDatas',JSON.stringify(state.userDatas))
        }
    }
})

export const  {setAllUsers,removeUsers,updateUser} = userDataSlice.actions

export default userDataSlice.reducer;