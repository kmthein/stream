import { createSlice } from "@reduxjs/toolkit";

const prevAccessToken = localStorage.getItem("token") || null;
const prevUser = localStorage.getItem("user"); 

const initialState = {
    accessToken: prevAccessToken,
    user: JSON.parse(prevUser) || null,
    myChannel: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setMyChannel: (state, action) => {
            state.myChannel = action.payload
        }
    } 
})

export const { setUser, setAccessToken, setMyChannel } = userSlice.actions;

export default userSlice.reducer;