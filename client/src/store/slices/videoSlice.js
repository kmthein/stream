import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homeVideos: [],
    searchedItems: [],
    nextPageToken: "",
    searchPageToken: ""
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        addHomeVideos: (state, action) => {
            state.homeVideos = [...state.homeVideos, ...action.payload];
        },
        addSearchItems: (state, action) => {
            state.searchedItems = [...state.searchedItems, ...action.payload];
        },
        removeSearchItems: (state, action) => {
            state.searchedItems = [];
        },
        setNextPageToken: (state, action) => {
            state.nextPageToken = action.payload;
        },
        setSearchPageToken: (state, action) => {
            state.searchPageToken = action.payload;
        },
    }
})

export const { addHomeVideos, addSearchItems, removeSearchItems, setNextPageToken, setSearchPageToken } = videoSlice.actions;

export default videoSlice.reducer;