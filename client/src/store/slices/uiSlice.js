import { createSlice } from "@reduxjs/toolkit";

const dark = localStorage.getItem("theme");

const screenWidth = screen.width;

const initialState = {
    darkMode: dark && true,
    menuOpen: screenWidth > 700 && true
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        colorToggle: (state, action) => {
            state.darkMode = !state.darkMode
        },
        toggleMenu: (state, action) => {
            state.menuOpen = !state.menuOpen;
        },
        closeMenu: (state, action) => {
            state.menuOpen = false;
        }
    }
})

export const { colorToggle, toggleMenu, closeMenu } = uiSlice.actions;

export default uiSlice.reducer;