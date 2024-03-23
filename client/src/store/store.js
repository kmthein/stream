import { configureStore } from "@reduxjs/toolkit";
import uiReducers from "./slices/uiSlice";
import videoReducers from "./slices/videoSlice";
import userReducers from "./slices/userSlice";

const store = configureStore({
    reducer: {
        ui: uiReducers,
        video: videoReducers,
        user: userReducers
    }
})

export default store;