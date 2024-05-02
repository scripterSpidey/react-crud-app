import {configureStore} from '@reduxjs/toolkit';

import userReducer from '../slices/userSlice.js';
import adminReducer from '../slices/adminSlice.js'
import userDatasReducer from '../slices/userDataSlice.js'

const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        userDatas:userDatasReducer
    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default  store